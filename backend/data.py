"""
数据抓取模块 — 从 jolpica (jolpi.ca) 的 Ergast F1 API 获取数据
jolpica 是 Ergast API 的镜像，数据格式与原有 Ergast 一致
文档参考: https://api.jolpi.ca/ergast/f1/
"""

import httpx
import json
import os
from typing import Any, Union, Optional
from datetime import datetime, timedelta
from db import get_connection

# jolpica API 基础地址
JOLPICA_BASE = "https://api.jolpi.ca/ergast/f1"

# 缓存过期时间：赛程数据 1 小时，比赛结果 12 小时
CACHE_TTL_RACES = 3600       # 1 小时
CACHE_TTL_RESULTS = 43200    # 12 小时


def _get_cache(cache_key: str) -> Any:
    """从 SQLite 缓存中读取数据，返回解析后的 JSON（可以是 dict 或 list）"""
    conn = get_connection()
    row = conn.execute(
        "SELECT data_json, fetched_at, expires_at FROM cache WHERE cache_key=?",
        (cache_key,)
    ).fetchone()
    conn.close()
    if row is None:
        return None
    # 检查是否过期
    if row["expires_at"]:
        expires = datetime.fromisoformat(row["expires_at"])
        if datetime.now() > expires:
            return None
    try:
        return json.loads(row["data_json"])
    except json.JSONDecodeError:
        return None


def _set_cache(cache_key: str, data: Any, ttl_seconds: int = 3600):
    """将数据（dict 或 list）写入 SQLite 缓存"""
    conn = get_connection()
    expires_at = (datetime.now() + timedelta(seconds=ttl_seconds)).isoformat()
    conn.execute(
        "INSERT OR REPLACE INTO cache (cache_key, data_json, fetched_at, expires_at) VALUES (?, ?, datetime('now','localtime'), ?)",
        (cache_key, json.dumps(data, ensure_ascii=False), expires_at)
    )
    conn.commit()
    conn.close()


async def _fetch_jolpica(endpoint: str, params: dict = None) -> dict:
    """从 jolpica API 获取数据（异步）"""
    url = f"{JOLPICA_BASE}{endpoint}"
    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.get(url, params=params)
        resp.raise_for_status()
        data = resp.json()
        return data.get("MRData", data)


def _parse_race_list(mr_data: dict) -> list[dict]:
    """解析 MRData 中的 RaceTable，返回简化的赛程列表"""
    races = []
    race_table = mr_data.get("RaceTable", {})
    for race in race_table.get("Races", []):
        races.append({
            "round": int(race.get("round", 0)),
            "name": race.get("raceName", ""),
            "circuit": race.get("Circuit", {}).get("circuitName", ""),
            "country": race.get("Circuit", {}).get("Location", {}).get("country", ""),
            "date": race.get("date", ""),
            "time": race.get("time", ""),
            "season": int(race.get("season", 0)),
        })
    return races


def _parse_driver_standings(mr_data: dict) -> list[dict]:
    """解析车手积分榜"""
    standings = []
    standings_table = mr_data.get("StandingsTable", {})
    for entry in standings_table.get("StandingsLists", []):
        for driver_stand in entry.get("DriverStandings", []):
            driver = driver_stand.get("Driver", {})
            constructors = driver_stand.get("Constructors", [])
            constructor_name = constructors[0]["name"] if constructors else ""
            standings.append({
                "position": int(driver_stand.get("position", 0)),
                "points": float(driver_stand.get("points", 0)),
                "wins": int(driver_stand.get("wins", 0)),
                "driver_name": f"{driver.get('givenName', '')} {driver.get('familyName', '')}",
                "driver_code": driver.get("code", ""),
                "nationality": driver.get("nationality", ""),
                "constructor": constructor_name,
            })
    return standings


def _parse_constructor_standings(mr_data: dict) -> list[dict]:
    """解析车队积分榜"""
    standings = []
    standings_table = mr_data.get("StandingsTable", {})
    for entry in standings_table.get("StandingsLists", []):
        for const_stand in entry.get("ConstructorStandings", []):
            constructor = const_stand.get("Constructor", {})
            standings.append({
                "position": int(const_stand.get("position", 0)),
                "points": float(const_stand.get("points", 0)),
                "wins": int(const_stand.get("wins", 0)),
                "name": constructor.get("name", ""),
                "nationality": constructor.get("nationality", ""),
            })
    return standings


async def get_races(season: Union[int, str] = "current") -> list[dict]:
    """获取当前赛季赛程列表（带缓存）"""
    cache_key = f"races_{season}"
    cached = _get_cache(cache_key)
    if cached:
        return cached

    endpoint = f"/{season}.json" if season != "current" else "/current.json"
    mr_data = await _fetch_jolpica(endpoint)
    races = _parse_race_list(mr_data)

    _set_cache(cache_key, races, CACHE_TTL_RACES)
    return races


async def get_driver_standings(season: Union[int, str] = "current") -> list[dict]:
    """获取车手积分榜（带缓存）"""
    cache_key = f"driver_standings_{season}"
    cached = _get_cache(cache_key)
    if cached:
        return cached

    endpoint = f"/{season}/driverStandings.json" if season != "current" else "/current/driverStandings.json"
    mr_data = await _fetch_jolpica(endpoint)
    standings = _parse_driver_standings(mr_data)

    _set_cache(cache_key, standings, CACHE_TTL_RACES)
    return standings


async def get_constructor_standings(season: Union[int, str] = "current") -> list[dict]:
    """获取车队积分榜（带缓存）"""
    cache_key = f"constructor_standings_{season}"
    cached = _get_cache(cache_key)
    if cached:
        return cached

    endpoint = f"/{season}/constructorStandings.json" if season != "current" else "/current/constructorStandings.json"
    mr_data = await _fetch_jolpica(endpoint)
    standings = _parse_constructor_standings(mr_data)

    _set_cache(cache_key, standings, CACHE_TTL_RACES)
    return standings


async def get_race_results(race_round: int, season: Union[int, str] = "current") -> list[dict]:
    """获取单场比赛的正赛结果"""
    cache_key = f"race_result_{season}_{race_round}"
    cached = _get_cache(cache_key)
    if cached:
        return cached

    endpoint = f"/{season}/{race_round}/results.json" if season != "current" else f"/current/{race_round}/results.json"
    mr_data = await _fetch_jolpica(endpoint)

    results = []
    race_table = mr_data.get("RaceTable", {})
    for race in race_table.get("Races", []):
        for result in race.get("Results", []):
            driver = result.get("Driver", {})
            constructor = result.get("Constructor", {})
            results.append({
                "position": int(result.get("position", 0)),
                "driver_name": f"{driver.get('givenName', '')} {driver.get('familyName', '')}",
                "driver_code": driver.get("code", ""),
                "constructor": constructor.get("name", ""),
                "grid": int(result.get("grid", 0)),
                "laps": int(result.get("laps", 0)),
                "status": result.get("status", ""),
                "points": float(result.get("points", 0)),
            })

    _set_cache(cache_key, results, CACHE_TTL_RESULTS)
    return results
