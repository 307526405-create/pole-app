"""
数据库模块 — SQLite 数据库初始化与操作
表结构：
  - users: 用户信息
  - predictions: 竞猜记录
  - results: 比赛结果（管理员录入或自动抓取）
  - points: 积分汇总
  - cache: API 数据缓存
"""

import sqlite3
import os
from datetime import datetime

# 数据库文件路径
DB_PATH = os.path.join(os.path.dirname(__file__), "pole.db")


def get_connection() -> sqlite3.Connection:
    """获取数据库连接，启用 WAL 模式和行工厂"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def init_db():
    """初始化数据库，创建所有表"""
    conn = get_connection()
    cursor = conn.cursor()

    # 用户表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            wx_openid TEXT PRIMARY KEY,
            nickname TEXT DEFAULT '',
            created_at TEXT DEFAULT (datetime('now', 'localtime'))
        )
    """)

    # 竞猜表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wx_openid TEXT NOT NULL,
            race_round INTEGER NOT NULL,
            season INTEGER NOT NULL DEFAULT 2025,
            pole TEXT DEFAULT '',
            podium_json TEXT DEFAULT '[]',
            fastest_lap TEXT DEFAULT '',
            safety_car INTEGER DEFAULT 0,
            retirements INTEGER DEFAULT 0,
            submitted_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (wx_openid) REFERENCES users(wx_openid)
        )
    """)

    # 比赛结果表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS results (
            race_round INTEGER NOT NULL,
            season INTEGER NOT NULL DEFAULT 2025,
            pole_winner TEXT DEFAULT '',
            podium_json TEXT DEFAULT '[]',
            fastest_lap_winner TEXT DEFAULT '',
            safety_car_count INTEGER DEFAULT 0,
            retirement_count INTEGER DEFAULT 0,
            updated_at TEXT DEFAULT (datetime('now', 'localtime')),
            PRIMARY KEY (season, race_round)
        )
    """)

    # 积分表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS points (
            wx_openid TEXT NOT NULL,
            season INTEGER NOT NULL DEFAULT 2025,
            total_points INTEGER DEFAULT 0,
            accuracy REAL DEFAULT 0.0,
            updated_at TEXT DEFAULT (datetime('now', 'localtime')),
            PRIMARY KEY (wx_openid, season),
            FOREIGN KEY (wx_openid) REFERENCES users(wx_openid)
        )
    """)

    # API 缓存表 — 用于缓存 jolpica 数据，避免重复请求
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cache (
            cache_key TEXT PRIMARY KEY,
            data_json TEXT NOT NULL,
            fetched_at TEXT DEFAULT (datetime('now', 'localtime')),
            expires_at TEXT
        )
    """)

    conn.commit()
    conn.close()
    print(f"[DB] 数据库初始化完成: {DB_PATH}")


def ensure_user(wx_openid: str, nickname: str = ""):
    """确保用户存在，不存在则创建"""
    conn = get_connection()
    conn.execute(
        "INSERT OR IGNORE INTO users (wx_openid, nickname) VALUES (?, ?)",
        (wx_openid, nickname)
    )
    conn.commit()
    conn.close()


def save_prediction(wx_openid: str, race_round: int, pole: str,
                    podium: list, fastest_lap: str,
                    safety_car: int, retirements: int, season: int = 2025):
    """保存竞猜记录"""
    import json
    ensure_user(wx_openid)
    conn = get_connection()
    conn.execute(
        """INSERT INTO predictions 
           (wx_openid, race_round, season, pole, podium_json, fastest_lap, safety_car, retirements)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        (wx_openid, race_round, season, pole,
         json.dumps(podium, ensure_ascii=False),
         fastest_lap, safety_car, retirements)
    )
    conn.commit()
    conn.close()


def get_prediction(wx_openid: str, race_round: int, season: int = 2025):
    """获取某用户对某场比赛的竞猜"""
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM predictions WHERE wx_openid=? AND race_round=? AND season=? ORDER BY id DESC LIMIT 1",
        (wx_openid, race_round, season)
    ).fetchone()
    conn.close()
    return row


def save_result(race_round: int, pole_winner: str, podium: list,
                fastest_lap_winner: str, safety_car_count: int,
                retirement_count: int, season: int = 2025):
    """保存/更新比赛结果"""
    import json
    conn = get_connection()
    conn.execute(
        """INSERT OR REPLACE INTO results 
           (race_round, season, pole_winner, podium_json, fastest_lap_winner, safety_car_count, retirement_count)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (race_round, season, pole_winner,
         json.dumps(podium, ensure_ascii=False),
         fastest_lap_winner, safety_car_count, retirement_count)
    )
    conn.commit()
    conn.close()


def get_result(race_round: int, season: int = 2025):
    """获取比赛结果"""
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM results WHERE race_round=? AND season=?",
        (race_round, season)
    ).fetchone()
    conn.close()
    return row


def update_points(wx_openid: str, season: int, points_earned: int):
    """更新用户积分"""
    ensure_user(wx_openid)
    conn = get_connection()
    existing = conn.execute(
        "SELECT total_points FROM points WHERE wx_openid=? AND season=?",
        (wx_openid, season)
    ).fetchone()
    if existing:
        conn.execute(
            "UPDATE points SET total_points=total_points+?, updated_at=datetime('now','localtime') WHERE wx_openid=? AND season=?",
            (points_earned, wx_openid, season)
        )
    else:
        conn.execute(
            "INSERT INTO points (wx_openid, season, total_points) VALUES (?, ?, ?)",
            (wx_openid, season, points_earned)
        )
    conn.commit()
    conn.close()


if __name__ == "__main__":
    init_db()
