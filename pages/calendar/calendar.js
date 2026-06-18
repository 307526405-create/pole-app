const API = 'http://localhost:8080/api'
const { DRIVER_CN, TEAM_CN } = require('../../utils/translate')

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
      ds[0] = (res.data.data||[]).map(d => ({ pos: d.position, name: DRIVER_CN[d.driver_name] || d.driver_name, team: TEAM_CN[d.constructor] || d.constructor, pts: d.points }))
      this.setData({ standings: ds })
    }})
    wx.request({ url: API + '/standings/constructors', success: (res) => { 
      const ds = this.data.standings
      ds[1] = (res.data.data||[]).map(d => ({ pos: d.position, name: TEAM_CN[d.name] || d.name, team: '', pts: d.points }))
      this.setData({ standings: ds })
    }})
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
