"""
杆位 Pole — F1 赛车竞猜小程序后端
FastAPI 主入口，提供 5 个 API 端点
运行: python main.py (端口 8080)
"""

import json
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from db import init_db, save_prediction, get_prediction, get_result, save_result, update_points
from data import get_races, get_driver_standings, get_constructor_standings
from wiki import get_teams_wiki
from predict import calculate_score


# ========== Pydantic 请求/响应模型 ==========

class PredictionRequest(BaseModel):
    """竞猜提交请求体"""
    wx_openid: str = Field(..., description="微信 OpenID")
    race_round: int = Field(..., description="比赛轮次（round）")
    pole: str = Field(default="", description="预测的杆位车手代码，如 VER")
    podium: list[str] = Field(default=[], description="预测的领奖台三人，如 ['VER','NOR','LEC']")
    fastest_lap: str = Field(default="", description="预测的最快圈速车手代码")
    safety_car: int = Field(default=0, description="预测的安全车次数")
    retirements: int = Field(default=0, description="预测的退赛车辆数")
    season: int = Field(default=2025, description="赛季年份")


class PredictionResultQuery(BaseModel):
    """竞猜结算查询参数"""
    race_round: int = Field(..., description="比赛轮次")
    wx_openid: str = Field(..., description="微信 OpenID")
    season: int = Field(default=2025, description="赛季年份")


# ========== 应用生命周期 ==========

@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用启动/关闭时执行"""
    # 启动时初始化数据库
    init_db()
    print("[Server] 杆位 Pole 后端已启动 — http://0.0.0.0:8080")
    yield
    print("[Server] 后端关闭")


# ========== 创建 FastAPI 应用 ==========

app = FastAPI(
    title="杆位 Pole API",
    description="F1 赛车竞猜小程序后端",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS 中间件 — 允许微信小程序前端跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ========== API 端点 ==========

@app.get("/api/races")
async def api_get_races(season: str = "current"):
    """
    获取赛季赛程列表
    GET /api/races?season=current
    返回: [{round, name, circuit, country, date, time, season}]
    """
    try:
        races = await get_races(season)
        return {"code": 0, "data": races, "count": len(races)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取赛程失败: {str(e)}")


@app.get("/api/standings/drivers")
async def api_get_driver_standings(season: str = "current"):
    """
    获取车手积分榜
    GET /api/standings/drivers?season=current
    返回: [{position, points, wins, driver_name, driver_code, nationality, constructor}]
    """
    try:
        standings = await get_driver_standings(season)
        return {"code": 0, "data": standings, "count": len(standings)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取车手积分榜失败: {str(e)}")


@app.get("/api/standings/constructors")
async def api_get_constructor_standings(season: str = "current"):
    """
    获取车队积分榜
    GET /api/standings/constructors?season=current
    返回: [{position, points, wins, name, nationality}]
    """
    try:
        standings = await get_constructor_standings(season)
        return {"code": 0, "data": standings, "count": len(standings)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取车队积分榜失败: {str(e)}")


@app.post("/api/predict")
async def api_submit_prediction(req: PredictionRequest):
    """
    提交竞猜
    POST /api/predict
    请求体: {wx_openid, race_round, pole, podium[], fastest_lap, safety_car, retirements}
    返回: {code: 0, message: "竞猜已提交"}
    """
    try:
        save_prediction(
            wx_openid=req.wx_openid,
            race_round=req.race_round,
            pole=req.pole,
            podium=req.podium,
            fastest_lap=req.fastest_lap,
            safety_car=req.safety_car,
            retirements=req.retirements,
            season=req.season,
        )
        return {"code": 0, "message": "竞猜已提交"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"提交竞猜失败: {str(e)}")


@app.get("/api/predict/result")
async def api_get_prediction_result(
    wx_openid: str = Query(..., description="微信 OpenID"),
    race_round: int = Query(..., description="比赛轮次"),
    season: int = Query(2025, description="赛季年份"),
):
    """
    查询竞猜结算结果
    GET /api/predict/result?wx_openid=xxx&race_round=1&season=2025
    返回: {code: 0, data: {prediction, result, score, details}}
    """
    try:
        # 获取用户竞猜
        pred = get_prediction(wx_openid, race_round, season)
        if not pred:
            return {
                "code": 0,
                "data": None,
                "message": "未找到该场比赛的竞猜记录"
            }

        # 获取实际比赛结果
        res = get_result(race_round, season)
        if not res:
            return {
                "code": 0,
                "data": {
                    "prediction": {
                        "race_round": pred["race_round"],
                        "pole": pred["pole"],
                        "podium": json.loads(pred["podium_json"] or "[]"),
                        "fastest_lap": pred["fastest_lap"],
                        "safety_car": pred["safety_car"],
                        "retirements": pred["retirements"],
                        "submitted_at": pred["submitted_at"],
                    },
                    "result": None,
                    "score": None,
                },
                "message": "比赛结果尚未录入"
            }

        # 计算得分
        score_result = calculate_score(dict(pred), dict(res))

        # 更新积分（如果之前没算过，且比赛已有结果）
        # TODO: 可以加一个字段标记是否已结算，避免重复加分
        # 这里简化处理，每次查询都重新计算并覆盖积分
        update_points(wx_openid, season, score_result["total_score"])

        return {
            "code": 0,
            "data": {
                "prediction": {
                    "race_round": pred["race_round"],
                    "pole": pred["pole"],
                    "podium": json.loads(pred["podium_json"] or "[]"),
                    "fastest_lap": pred["fastest_lap"],
                    "safety_car": pred["safety_car"],
                    "retirements": pred["retirements"],
                    "submitted_at": pred["submitted_at"],
                },
                "result": {
                    "race_round": res["race_round"],
                    "pole_winner": res["pole_winner"],
                    "podium": json.loads(res["podium_json"] or "[]"),
                    "fastest_lap_winner": res["fastest_lap_winner"],
                    "safety_car_count": res["safety_car_count"],
                    "retirement_count": res["retirement_count"],
                },
                "score": score_result,
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"查询竞猜结果失败: {str(e)}")


# ========== 启动入口 ==========

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)

@app.get("/api/wiki/teams")
async def api_wiki_teams():
    """车队百科"""
    teams = await get_teams_wiki()
    return {"code": 0, "data": teams, "count": len(teams)}

@app.get("/api/wiki/drivers")
async def api_wiki_drivers():
    """车手百科（含生涯数据）"""
    standings = await get_driver_standings("current")
    return {"code": 0, "data": standings, "count": len(standings)}

@app.get("/api/wiki/circuits")
async def api_wiki_circuits():
    """赛道百科"""
    races = await get_races("current")
    return {"code": 0, "data": races, "count": len(races)}

