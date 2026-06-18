const API = 'http://localhost:8080/api'
const D_CN = {
  'Andrea Kimi Antonelli':['安托内利','ANT','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ANDKIM01_Andrea_Kimi_Antonelli/andkim01.png.transform/2col-retina/image.png'],
  'Lewis Hamilton':['汉密尔顿','HAM','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png'],
  'George Russell':['拉塞尔','RUS','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png'],
  'Charles Leclerc':['勒克莱尔','LEC','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png'],
  'Lando Norris':['诺里斯','NOR','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png'],
  'Oscar Piastri':['皮亚斯特里','PIA','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col-retina/image.png'],
  'Max Verstappen':['维斯塔潘','VER','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png'],
  'Pierre Gasly':['加斯利','GAS','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col-retina/image.png'],
  'Isack Hadjar':['哈贾尔','HAD','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png.transform/2col-retina/image.png'],
  'Liam Lawson':['劳森','LAW','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/2col-retina/image.png'],
  'Oliver Bearman':['贝尔曼','BEA','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/2col-retina/image.png'],
  'Franco Colapinto':['科拉平托','COL','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png.transform/2col-retina/image.png'],
  'Carlos Sainz':['赛恩斯','SAI','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col-retina/image.png'],
  'Alexander Albon':['阿尔本','ALB','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col-retina/image.png'],
  'Esteban Ocon':['奥康','OCO','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col-retina/image.png'],
  'Gabriel Bortoleto':['博托莱托','BOR','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png.transform/2col-retina/image.png'],
  'Fernando Alonso':['阿隆索','ALO','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col-retina/image.png'],
  'Nico Hülkenberg':['霍肯伯格','HUL','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col-retina/image.png'],
  'Sergio Pérez':['佩雷兹','PER','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col-retina/image.png'],
  'Lance Stroll':['斯特罗尔','STR','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col-retina/image.png'],
}
const T_CN = {
  'Mercedes':['梅赛德斯','MERC','https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col-retina/image.png'],
  'Ferrari':['法拉利','FER','https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png'],
  'McLaren':['迈凯伦','MCL','https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col-retina/image.png'],
  'Red Bull':['红牛','RBR','https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png'],
  'Red Bull Racing':['红牛','RBR','https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png'],
  'Alpine':['阿尔派','ALP',''],'Alpine F1 Team':['阿尔派','ALP',''],
  'Aston Martin':['阿斯顿马丁','AST',''],'Williams':['威廉姆斯','WIL',''],
  'RB F1 Team':['小红牛','RB',''],'Racing Bulls':['小红牛','RB',''],
  'Haas':['哈斯','HAA',''],'Haas F1 Team':['哈斯','HAA',''],
  'Sauber':['索伯','SAU',''],'Audi':['奥迪','AUD',''],
  'Cadillac F1 Team':['凯迪拉克','CAD',''],'Cadillac':['凯迪拉克','CAD',''],
}

Page({onShow(){if(typeof this.getTabBar==='function'&&this.getTabBar())this.getTabBar().setData({selected:1})},data:{subtab:0,races:[],standings:[[],[]]},
onLoad(){
  wx.request({url:API+'/races',success:(res)=>{const now=new Date();this.setData({races:(res.data.data||[]).map(r=>({flag:'🏁',gp:r.cn||r.name,date:r.date.substring(5),circuit:r.circuit,status:new Date(r.date)<now?'done':(new Date(r.date)-now<7*86400000?'now':'next'),tag:new Date(r.date)<now?'已结束':(new Date(r.date)-now<7*86400000?'进行中':'即将')}))})}})
  wx.request({url:API+'/standings/drivers',success:(res)=>{const ds=this.data.standings
    ds[0]=(res.data.data||[]).map(d=>{const t=D_CN[d.driver_name]||[d.driver_name,d.driver_code||'',''];return{pos:d.position,name:t[0],en:t[1],team:(T_CN[d.constructor]||[d.constructor])[0],pts:d.points,img:t[2]}})
    this.setData({standings:ds})}})
  wx.request({url:API+'/standings/constructors',success:(res)=>{const ds=this.data.standings
    ds[1]=(res.data.data||[]).map(d=>{const t=T_CN[d.name]||[d.name,'',''];return{pos:d.position,name:t[0],en:t[1],pts:d.points,img:t[2]}})
    this.setData({standings:ds})}})
},switchSub(e){this.setData({subtab:parseInt(e.currentTarget.dataset.idx)})}})
