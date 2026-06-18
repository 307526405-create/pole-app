const API = 'http://localhost:8080/api'

Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 }) },
  data: { subtab: 0, races: [], standings: [[],[]] },
  onLoad() {
    wx.request({ url: API + '/races', success: (res) => { this.setData({ races: (res.data.races||[]).map(r => ({...r, flag: r.flag||'🏁', gp: r.gp||r.raceName, date: r.date||'', circuit: r.circuit||'', length: r.length||'', status: new Date(r.date) < new Date() ? 'done' : (new Date(r.date).getTime() - new Date().getTime() < 7*86400000 ? 'now' : 'next'), tag: new Date(r.date) < new Date() ? '已结束' : (new Date(r.date).getTime() - new Date().getTime() < 7*86400000 ? '进行中' : '即将') })) }) }})
    wx.request({ url: API + '/standings/drivers', success: (res) => { const ds = this.data.standings; ds[0] = res.data.standings || []; this.setData({ standings: ds }) }})
    wx.request({ url: API + '/standings/constructors', success: (res) => { const ds = this.data.standings; ds[1] = res.data.standings || []; this.setData({ standings: ds }) }})
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
