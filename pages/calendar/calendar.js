const API = 'http://localhost:8080/api'
const D_CN = {
  'Andrea Kimi Antonelli':['安德烈亚·基米·安托内利','Kimi Antonelli'],
  'Lewis Hamilton':['刘易斯·汉密尔顿','Hamilton'],
  'George Russell':['乔治·拉塞尔','Russell'],
  'Max Verstappen':['马克斯·维斯塔潘','Verstappen'],
  'Lando Norris':['兰多·诺里斯','Norris'],
  'Oscar Piastri':['奥斯卡·皮亚斯特里','Piastri'],
  'Charles Leclerc':['夏尔·勒克莱尔','Leclerc'],
  'Fernando Alonso':['费尔南多·阿隆索','Alonso'],
  'Lance Stroll':['兰斯·斯特罗尔','Stroll'],
  'Alexander Albon':['亚历山大·阿尔本','Albon'],
  'Carlos Sainz':['卡洛斯·赛恩斯','Sainz'],
  'Yuki Tsunoda':['角田裕毅','Tsunoda'],
  'Isack Hadjar':['伊萨克·哈贾尔','Hadjar'],
  'Pierre Gasly':['皮埃尔·加斯利','Gasly'],
  'Jack Doohan':['杰克·杜汉','Doohan'],
  'Franco Colapinto':['弗朗哥·科拉平托','Colapinto'],
  'Esteban Ocon':['埃斯特班·奥康','Ocon'],
  'Oliver Bearman':['奥利弗·贝尔曼','Bearman'],
  'Nico Hülkenberg':['尼科·霍肯伯格','Hülkenberg'],
  'Gabriel Bortoleto':['加布里埃尔·博托莱托','Bortoleto'],
  'Sergio Pérez':['塞尔吉奥·佩雷兹','Pérez'],
  'Liam Lawson':['利亚姆·劳森','Lawson'],
}
const T_CN = {
  'Mercedes':['梅赛德斯 AMG','Mercedes'],'Ferrari':['法拉利','Ferrari'],'McLaren':['迈凯伦','McLaren'],
  'Red Bull':['红牛','Red Bull'],'Red Bull Racing':['红牛','Red Bull'],
  'Alpine':['阿尔派','Alpine'],'Alpine F1 Team':['阿尔派','Alpine'],
  'Aston Martin':['阿斯顿·马丁','Aston Martin'],'Williams':['威廉姆斯','Williams'],
  'RB F1 Team':['小红牛','RB'],'Racing Bulls':['小红牛','RB'],
  'Haas':['哈斯','Haas'],'Haas F1 Team':['哈斯','Haas'],
  'Sauber':['索伯','Sauber'],'Audi':['奥迪','Audi'],
  'Cadillac F1 Team':['凯迪拉克','Cadillac'],'Cadillac':['凯迪拉克','Cadillac'],
}

Page({
  onShow(){if(typeof this.getTabBar==='function'&&this.getTabBar())this.getTabBar().setData({selected:1})},
  data:{subtab:0,races:[],standings:[[],[]]},
  onLoad(){
    wx.request({url:API+'/races',success:(res)=>{ 
      const now=new Date()
      this.setData({races:(res.data.data||[]).map(r=>({
        flag:'🏁',gp:r.cn||r.name,date:r.date.substring(5),circuit:r.circuit,
        status:new Date(r.date)<now?'done':(new Date(r.date)-now<7*86400000?'now':'next'),
        tag:new Date(r.date)<now?'已结束':(new Date(r.date)-now<7*86400000?'进行中':'即将')
      }))})
    }})
    wx.request({url:API+'/standings/drivers',success:(res)=>{ 
      const ds=this.data.standings
      ds[0]=(res.data.data||[]).map(d=>{const t=D_CN[d.driver_name]||[d.driver_name,''];return{pos:d.position,name:t[0],en:t[1],team:(T_CN[d.constructor]||[d.constructor])[0],pts:d.points,img:''}})
      this.setData({standings:ds})
    }})
    wx.request({url:API+'/standings/constructors',success:(res)=>{ 
      const ds=this.data.standings
      ds[1]=(res.data.data||[]).map(d=>{const t=T_CN[d.name]||[d.name,''];return{pos:d.position,name:t[0],en:t[1],pts:d.points,img:''}})
      this.setData({standings:ds})
    }})
  },
  switchSub(e){this.setData({subtab:parseInt(e.currentTarget.dataset.idx)})}
})
