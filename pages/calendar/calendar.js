const API = 'http://localhost:8080/api'

const D_CN = {
  'Andrea Kimi Antonelli':'安托内利','Lewis Hamilton':'汉密尔顿','George Russell':'拉塞尔','Max Verstappen':'维斯塔潘','Lando Norris':'诺里斯','Oscar Piastri':'皮亚斯特里','Charles Leclerc':'勒克莱尔','Fernando Alonso':'阿隆索','Lance Stroll':'斯特罗尔','Alexander Albon':'阿尔本','Carlos Sainz':'赛恩斯','Yuki Tsunoda':'角田裕毅','Isack Hadjar':'哈贾尔','Pierre Gasly':'加斯利','Jack Doohan':'杜汉','Franco Colapinto':'科拉平托','Esteban Ocon':'奥康','Oliver Bearman':'贝尔曼','Nico Hülkenberg':'霍肯伯格','Gabriel Bortoleto':'博托莱托','Sergio Pérez':'佩雷兹','Liam Lawson':'劳森','周冠宇':'周冠宇','Guanyu Zhou':'周冠宇',
}
const T_CN = {
  'Mercedes':'梅赛德斯','Ferrari':'法拉利','McLaren':'迈凯伦','Red Bull':'红牛','Red Bull Racing':'红牛','Alpine':'阿尔派','Alpine F1 Team':'阿尔派','Aston Martin':'阿斯顿马丁','Williams':'威廉姆斯','RB F1 Team':'小红牛','Racing Bulls':'小红牛','Haas':'哈斯','Haas F1 Team':'哈斯','Sauber':'索伯','Audi':'奥迪','Cadillac F1 Team':'凯迪拉克','Cadillac':'凯迪拉克',
}

Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 }) },
  data: { subtab: 0, races: [], standings: [[],[]] },
  onLoad() {
    wx.request({ url: API + '/races', success: (res) => { 
      const now = new Date()
      this.setData({ races: (res.data.data||[]).map(r => ({
        flag: '🏁', gp: r.cn || r.name, date: r.date.substring(5), circuit: r.circuit,
        status: new Date(r.date) < now ? 'done' : (new Date(r.date)-now < 7*86400000 ? 'now' : 'next'),
        tag: new Date(r.date) < now ? '已结束' : (new Date(r.date)-now < 7*86400000 ? '进行中' : '即将')
      })) })
    }})
    wx.request({ url: API + '/standings/drivers', success: (res) => { 
      const ds = this.data.standings
      ds[0] = (res.data.data||[]).map(d => ({ pos: d.position, name: D_CN[d.driver_name] || d.driver_name, team: T_CN[d.constructor] || d.constructor, pts: d.points, img: '' }))
      this.setData({ standings: ds })
    }})
    wx.request({ url: API + '/standings/constructors', success: (res) => { 
      const ds = this.data.standings
      ds[1] = (res.data.data||[]).map(d => ({ pos: d.position, name: T_CN[d.name] || d.name, pts: d.points, img: '' }))
      this.setData({ standings: ds })
    }})
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
