const API = 'http://localhost:8080/api'
const D_CN = {
  'Andrea Kimi Antonelli':['安托内利','ANT','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ANDKIM01_Andrea_Kimi_Antonelli/andkim01.png.transform/2col-retina/image.png'],
  'Lewis Hamilton':['汉密尔顿','HAM','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png'],
  'George Russell':['拉塞尔','RUS','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png'],
  'Max Verstappen':['维斯塔潘','VER','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png'],
  'Lando Norris':['诺里斯','NOR','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png'],
  'Oscar Piastri':['皮亚斯特里','PIA','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col-retina/image.png'],
  'Charles Leclerc':['勒克莱尔','LEC','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png'],
}
const T_LOGO = {
  'Mercedes':'https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col-retina/image.png',
  'Ferrari':'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png',
  'McLaren':'https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col-retina/image.png',
  'Red Bull':'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png',
}

Page({
  onShow(){if(typeof this.getTabBar==='function'&&this.getTabBar())this.getTabBar().setData({selected:1})},
  data:{subtab:0,races:[],standings:[[],[]]},
  onLoad(){
    wx.request({url:API+'/races',success:(res)=>{const now=new Date();this.setData({races:(res.data.data||[]).map(r=>({flag:'🏁',gp:r.cn||r.name,date:r.date.substring(5),circuit:r.circuit,status:new Date(r.date)<now?'done':(new Date(r.date)-now<7*86400000?'now':'next'),tag:new Date(r.date)<now?'已结束':(new Date(r.date)-now<7*86400000?'进行中':'即将')}))})}})
    wx.request({url:API+'/standings/drivers',success:(res)=>{const ds=this.data.standings
      ds[0]=(res.data.data||[]).map(d=>{const t=D_CN[d.driver_name]||[d.driver_name,d.driver_code||'',''];return{pos:d.position,name:t[0],en:t[1],team:d.constructor||'',pts:d.points,img:t[2]||''}})
      this.setData({standings:ds})}})
    wx.request({url:API+'/standings/constructors',success:(res)=>{const ds=this.data.standings
      ds[1]=(res.data.data||[]).map(d=>({pos:d.position,name:d.name||'',pts:d.points,img:T_LOGO[d.name]||''}))
      this.setData({standings:ds})}})
  },
  onImgErr(e){const{idx,tab}=e.currentTarget.dataset;const ds=this.data.standings;if(ds[tab-1]&&ds[tab-1][idx])ds[tab-1][idx].img='';this.setData({standings:ds})},
  switchSub(e){this.setData({subtab:parseInt(e.currentTarget.dataset.idx)})}
})
