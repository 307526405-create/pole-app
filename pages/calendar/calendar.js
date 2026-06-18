const API = 'http://localhost:8080/api'
const { DRIVER_IMG, TEAM_LOGO } = require('../../utils/images')

Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 }) },
  data: { subtab: 0, races: [], standings: [[],[]] },
  onLoad() {
    wx.request({ url: API + '/races', success: (res) => { 
      const now = new Date()
      this.setData({ races: (res.data.data||[]).map(r => ({
        flag: '🏁', gp: r.name, date: r.date.substring(5), circuit: r.circuit, length: '',
        status: new Date(r.date) < now ? 'done' : (new Date(r.date)-now < 7*86400000 ? 'now' : 'next'),
        tag: new Date(r.date) < now ? '已结束' : (new Date(r.date)-now < 7*86400000 ? '进行中' : '即将')
      })) })
    }})
    wx.request({ url: API + '/standings/drivers', success: (res) => { 
      const ds = this.data.standings
      ds[0] = (res.data.data||[]).map(d => ({
        pos: d.position, name: d.driver_name, team: d.constructor, pts: d.points,
        img: DRIVER_IMG[d.driver_name] || ''
      }))
      this.setData({ standings: ds })
    }})
    wx.request({ url: API + '/standings/constructors', success: (res) => { 
      const ds = this.data.standings
      ds[1] = (res.data.data||[]).map(d => ({
        pos: d.position, name: d.name, team: '', pts: d.points,
        img: TEAM_LOGO[d.name] || ''
      }))
      this.setData({ standings: ds })
    }})
  },
  onImgErr(e) {
    // 加载失败用颜色块兜底
    const { idx, tab } = e.currentTarget.dataset
    const ds = this.data.standings
    if (ds[tab-1] && ds[tab-1][idx]) ds[tab-1][idx].img = ''
    this.setData({ standings: ds })
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
