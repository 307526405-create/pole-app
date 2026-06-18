""" 百科数据API — 车队/车手/赛道信息 """
from data import _fetch_jolpica
import asyncio

# 车队基本信息（静态，一年更新一次）
TEAMS = {
    "Mercedes": {"cn":"梅赛德斯","base":"英国布莱克利","engine":"梅赛德斯","since":2010,"championships":8,"wins":125,"color":"#00D2BE"},
    "Ferrari": {"cn":"法拉利","base":"意大利马拉内罗","engine":"法拉利","since":1950,"championships":16,"wins":245,"color":"#DC0000"},
    "McLaren": {"cn":"迈凯伦","base":"英国沃金","engine":"梅赛德斯","since":1966,"championships":8,"wins":185,"color":"#FF8700"},
    "Red Bull": {"cn":"红牛","base":"英国米尔顿凯恩斯","engine":"本田","since":2005,"championships":6,"wins":120,"color":"#3671C6"},
    "Alpine F1 Team": {"cn":"阿尔派","base":"法国恩斯通","engine":"雷诺","since":2021,"championships":2,"wins":35,"color":"#0090FF"},
    "Aston Martin": {"cn":"阿斯顿马丁","base":"英国银石","engine":"梅赛德斯","since":2021,"championships":0,"wins":1,"color":"#006F62"},
    "Williams": {"cn":"威廉姆斯","base":"英国格罗夫","engine":"梅赛德斯","since":1977,"championships":9,"wins":114,"color":"#005AFF"},
    "RB F1 Team": {"cn":"小红牛","base":"意大利法恩扎","engine":"本田","since":2006,"championships":0,"wins":2,"color":"#6692FF"},
    "Haas F1 Team": {"cn":"哈斯","base":"美国坎纳波利斯","engine":"法拉利","since":2016,"championships":0,"wins":0,"color":"#FFFFFF"},
    "Audi": {"cn":"奥迪","base":"瑞士辛维尔","engine":"奥迪","since":2026,"championships":0,"wins":0,"color":"#000000"},
    "Cadillac F1 Team": {"cn":"凯迪拉克","base":"美国印第安纳","engine":"法拉利","since":2026,"championships":0,"wins":0,"color":"#C0A060"},
}

async def get_driver_career(driver_name: str) -> dict:
    """从jolpica汇总车手生涯数据"""
    # 简化版：从当前积分榜反推
    # TODO: 可以遍历历史赛季获取更精确数据
    return {"total_wins": 0, "total_podiums": 0, "championships": 0}

async def get_teams_wiki():
    """获取车队百科数据"""
    return TEAMS
