const API = 'http://localhost:8080/api'
const D_CN = {
  'Andrea Kimi Antonelli':['安德烈亚·基米·安托内利','Antonelli','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ANDKIM01_Andrea_Kimi_Antonelli/andkim01.png.transform/2col-retina/image.png'],
  'Lewis Hamilton':['刘易斯·汉密尔顿','Hamilton','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png'],
  'George Russell':['乔治·拉塞尔','Russell','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png'],
  'Max Verstappen':['马克斯·维斯塔潘','Verstappen','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png'],
  'Lando Norris':['兰多·诺里斯','Norris','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png'],
  'Oscar Piastri':['奥斯卡·皮亚斯特里','Piastri','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col-retina/image.png'],
  'Charles Leclerc':['夏尔·勒克莱尔','Leclerc','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png'],
}
const T_CN = {
  'Mercedes':['梅赛德斯 AMG','Mercedes','https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col-retina/image.png'],
  'Ferrari':['法拉利','Ferrari','https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png'],
  'McLaren':['迈凯伦','McLaren','https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col-retina/image.png'],
}

Page({
  onShow(){if(typeof this.getTabBar==='function'&&this.getTabBar())this.getTabBar().setData({selected:1})},
  data:{subtab:0,races:[],standings:[[],[]]},
  onLoad(){
    wx.request({url:API+'/races',success:(res)=>{const now=new Date();this.setData({races:(res.data.data||[]).map(r=>({flag:'🏁',gp:r.cn||r.name,date:r.date.substring(5),circuit:r.circuit,status:new Date(r.date)<now?'done':(new Date(r.date)-now<7*86400000?'now':'next'),tag:new Date(r.date)<now?'已结束':(new Date(r.date)-now<7*86400000?'进行中':'即将')}))})}})
    wx.request({url:API+'/standings/drivers',success:(res)=>{const ds=this.data.standings
      ds[0]=(res.data.data||[]).map(d=>{const t=D_CN[d.driver_name]||[d.driver_name,'',''];return{pos:d.position,name:t[0],en:t[1],team:(T_CN[d.constructor]||[d.constructor,'',''])[0],pts:d.points,img:t[2]}})
      this.setData({standings:ds})}})
    wx.request({url:API+'/standings/constructors',success:(res)=>{const ds=this.data.standings
      ds[1]=(res.data.data||[]).map(d=>{const t=T_CN[d.name]||[d.name,'',''];return{pos:d.position,name:t[0],en:t[1],pts:d.points,img:t[2]}})
      this.setData({standings:ds})}})
  },
  switchSub(e){this.setData({subtab:parseInt(e.currentTarget.dataset.idx)})}
})
