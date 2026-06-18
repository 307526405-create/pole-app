const API = 'http://localhost:8080/api'

const TEAM_COLORS = {
  'Mercedes':'#00D2BE','Ferrari':'#DC0000','McLaren':'#FF8700','Red Bull':'#3671C6','Red Bull Racing':'#3671C6',
  'Alpine':'#0090FF','Alpine F1 Team':'#0090FF','Aston Martin':'#006F62','Williams':'#005AFF',
  'RB F1 Team':'#6692FF','Racing Bulls':'#6692FF','Haas':'#FFFFFF','Haas F1 Team':'#FFFFFF',
  'Sauber':'#52E252','Audi':'#000000','Cadillac F1 Team':'#C0A060','Cadillac':'#C0A060'
}

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
      ds[0] = (res.data.data||[]).map(d => {
        const cn = d.driver_name || ''
        const team = d.constructor || ''
        const initials = cn.split(' ').map(w => w[0]).join('').substring(0,2)
        return { pos: d.position, name: cn, team: team, pts: d.points, initials: initials, color: TEAM_COLORS[team] || '#999' }
      })
      this.setData({ standings: ds })
    }})
    wx.request({ url: API + '/standings/constructors', success: (res) => { 
      const ds = this.data.standings
      ds[1] = (res.data.data||[]).map(d => {
        const cn = d.name || ''
        const initials = cn.substring(0,2).toUpperCase()
        return { pos: d.position, name: cn, team: '', pts: d.points, initials: initials, color: TEAM_COLORS[cn] || '#999' }
      })
      this.setData({ standings: ds })
    }})
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
