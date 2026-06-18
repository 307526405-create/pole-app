"""
竞猜结算模块 — 根据用户竞猜和实际比赛结果计算得分

计分规则：
  1. 杆位猜中（pole）：+3 分
  2. 排位前三（qualifying top 3）：每人猜中 +3 分，三人全中额外 +3 分
  3. 领奖台（podium top 3）：每人猜中 +3 分，三人全中额外 +5 分
  4. 最快圈速（fastest_lap）：猜中 +3 分
  5. 安全车（safety_car）：猜中 +3 分
  6. 退赛数（retirements）：猜中 +3 分
"""

import json


def calculate_score(prediction: dict, result: dict) -> dict:
    """
    计算竞猜得分

    参数:
        prediction: dict，包含 pole, podium_json, fastest_lap, safety_car, retirements
        result: dict，包含 pole_winner, podium_json, fastest_lap_winner, safety_car_count, retirement_count

    返回:
        dict: {
            "total_score": int,          # 总分
            "details": [                 # 各项得分明细
                {"item": "杆位", "score": int, "predicted": str, "actual": str, "hit": bool},
                {"item": "排位前三", "score": int, "predicted": str, "actual": str, "hits": int},
                {"item": "领奖台", "score": int, "predicted": str, "actual": str, "hits": int},
                {"item": "最快圈", "score": int, "predicted": str, "actual": str, "hit": bool},
                {"item": "安全车", "score": int, "predicted": int, "actual": int, "hit": bool},
                {"item": "退赛数", "score": int, "predicted": int, "actual": int, "hit": bool},
            ]
        }
    """
    # 解析 JSON 字段
    pred = {
        "pole": prediction.get("pole", "").strip().upper(),
        "podium": _parse_json_field(prediction.get("podium_json", "[]")),
        "fastest_lap": prediction.get("fastest_lap", "").strip().upper(),
        "safety_car": int(prediction.get("safety_car", 0)),
        "retirements": int(prediction.get("retirements", 0)),
    }

    actual = {
        "pole": result.get("pole_winner", "").strip().upper(),
        "podium": _parse_json_field(result.get("podium_json", "[]")),
        "fastest_lap": result.get("fastest_lap_winner", "").strip().upper(),
        "safety_car": int(result.get("safety_car_count", 0)),
        "retirements": int(result.get("retirement_count", 0)),
    }

    details = []
    total = 0

    # 1. 杆位
    pole_hit = pred["pole"] == actual["pole"] and pred["pole"] != ""
    pole_score = 3 if pole_hit else 0
    total += pole_score
    details.append({
        "item": "杆位",
        "score": pole_score,
        "predicted": pred["pole"],
        "actual": actual["pole"],
        "hit": pole_hit,
    })

    # 2. 排位前三（用 podium 数据当作排位前三，即用户猜的前三名）
    # 格式：["VER", "NOR", "LEC"]
    qual_hits = _count_name_matches(pred["podium"], actual["podium"])
    qual_score = qual_hits * 3
    if qual_hits == 3:
        qual_score += 3  # 全中额外 +3
    total += qual_score
    details.append({
        "item": "排位前三",
        "score": qual_score,
        "predicted": ", ".join(pred["podium"]),
        "actual": ", ".join(actual["podium"]),
        "hits": qual_hits,
    })

    # 3. 领奖台 — 用户猜的三个 podium 人选（复用 podium 字段）
    podium_hits = _count_name_matches(pred["podium"], actual["podium"])
    podium_score = podium_hits * 3
    if podium_hits == 3:
        podium_score += 5  # 全中额外 +5
    total += podium_score
    details.append({
        "item": "领奖台",
        "score": podium_score,
        "predicted": ", ".join(pred["podium"]),
        "actual": ", ".join(actual["podium"]),
        "hits": podium_hits,
    })

    # 4. 最快圈速
    fl_hit = pred["fastest_lap"] == actual["fastest_lap"] and pred["fastest_lap"] != ""
    fl_score = 3 if fl_hit else 0
    total += fl_score
    details.append({
        "item": "最快圈",
        "score": fl_score,
        "predicted": pred["fastest_lap"],
        "actual": actual["fastest_lap"],
        "hit": fl_hit,
    })

    # 5. 安全车
    sc_hit = pred["safety_car"] == actual["safety_car"]
    sc_score = 3 if sc_hit else 0
    total += sc_score
    details.append({
        "item": "安全车",
        "score": sc_score,
        "predicted": pred["safety_car"],
        "actual": actual["safety_car"],
        "hit": sc_hit,
    })

    # 6. 退赛数
    ret_hit = pred["retirements"] == actual["retirements"]
    ret_score = 3 if ret_hit else 0
    total += ret_score
    details.append({
        "item": "退赛数",
        "score": ret_score,
        "predicted": pred["retirements"],
        "actual": actual["retirements"],
        "hit": ret_hit,
    })

    return {
        "total_score": total,
        "details": details,
    }


def _parse_json_field(value):
    """安全解析 JSON 字符串或已经是 list 的值"""
    if isinstance(value, list):
        return [str(v).strip().upper() for v in value]
    if isinstance(value, str):
        try:
            parsed = json.loads(value)
            return [str(v).strip().upper() for v in parsed]
        except (json.JSONDecodeError, TypeError):
            return []
    return []


def _count_name_matches(predicted: list, actual: list) -> int:
    """计算预测名单和实际名单中有多少人匹配（不考虑顺序）"""
    matches = 0
    actual_set = set(actual)
    for name in predicted:
        if name and name in actual_set:
            matches += 1
    return min(matches, 3)  # 最多 3 人
