const API="http://localhost:8080/api"
const RACE_CN={"Australian Grand Prix": "澳大利亚大奖赛", "Chinese Grand Prix": "中国大奖赛", "Japanese Grand Prix": "日本大奖赛", "Miami Grand Prix": "迈阿密大奖赛", "Canadian Grand Prix": "加拿大大奖赛", "Monaco Grand Prix": "摩纳哥大奖赛", "Barcelona Grand Prix": "巴塞罗那大奖赛", "Austrian Grand Prix": "奥地利大奖赛", "British Grand Prix": "英国大奖赛", "Belgian Grand Prix": "比利时大奖赛", "Hungarian Grand Prix": "匈牙利大奖赛", "Dutch Grand Prix": "荷兰大奖赛", "Italian Grand Prix": "意大利大奖赛", "Spanish Grand Prix": "西班牙大奖赛", "Azerbaijan Grand Prix": "阿塞拜疆大奖赛", "Singapore Grand Prix": "新加坡大奖赛", "United States Grand Prix": "美国大奖赛", "Mexico City Grand Prix": "墨西哥大奖赛", "Brazilian Grand Prix": "巴西大奖赛", "Las Vegas Grand Prix": "拉斯维加斯大奖赛", "Qatar Grand Prix": "卡塔尔大奖赛", "Abu Dhabi Grand Prix": "阿布扎比大奖赛"}
const FLAGS={"Australia": "🇦🇺", "China": "🇨🇳", "Japan": "🇯🇵", "USA": "🇺🇸", "Canada": "🇨🇦", "Monaco": "🇲🇨", "Spain": "🇪🇸", "Austria": "🇦🇹", "UK": "🇬🇧", "Belgium": "🇧🇪", "Hungary": "🇭🇺", "Netherlands": "🇳🇱", "Italy": "🇮🇹", "Azerbaijan": "🇦🇿", "Singapore": "🇸🇬", "Mexico": "🇲🇽", "Brazil": "🇧🇷", "UAE": "🇦🇪", "Qatar": "🇶🇦"}
const D_CN={
'Andrea Kimi Antonelli':['安德烈亚·基米·安托内利','ANT',''],
'Lewis Hamilton':['刘易斯·汉密尔顿','HAM','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWIS_HA01_Lewis_Hamilton/ham01.png.transform/2col-retina/image.png'],
'George Russell':['乔治·拉塞尔','RUS','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORGE_R01_George_Russell/rus01.png.transform/2col-retina/image.png'],
'Charles Leclerc':['夏尔·勒克莱尔','LEC','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHARLES_01_Charles_Leclerc/lec01.png.transform/2col-retina/image.png'],
'Lando Norris':['兰多·诺里斯','NOR','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANDO_NO01_Lando_Norris/nor01.png.transform/2col-retina/image.png'],
'Oscar Piastri':['奥斯卡·皮亚斯特里','PIA','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCAR_PI01_Oscar_Piastri/pia01.png.transform/2col-retina/image.png'],
'Max Verstappen':['马克斯·维斯塔潘','VER','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAX_VERS01_Max_Verstappen/ver01.png.transform/2col-retina/image.png'],
'Pierre Gasly':['皮埃尔·加斯利','GAS','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIERRE_G01_Pierre_Gasly/gas01.png.transform/2col-retina/image.png'],
'Isack Hadjar':['伊萨克·哈贾尔','HAD','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISACK_HA01_Isack_Hadjar/had01.png.transform/2col-retina/image.png'],
'Liam Lawson':['利亚姆·劳森','LAW','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIAM_LAW01_Liam_Lawson/law01.png.transform/2col-retina/image.png'],
'Oliver Bearman':['奥利弗·贝尔曼','BEA','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIVER_B01_Oliver_Bearman/bea01.png.transform/2col-retina/image.png'],
'Franco Colapinto':['弗朗哥·科拉平托','COL','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRANCO_C01_Franco_Colapinto/col01.png.transform/2col-retina/image.png'],
'Carlos Sainz':['卡洛斯·赛恩斯','SAI','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARLOS_S01_Carlos_Sainz/sai01.png.transform/2col-retina/image.png'],
'Alexander Albon':['亚历山大·阿尔本','ALB','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEXANDE01_Alexander_Albon/alb01.png.transform/2col-retina/image.png'],
'Esteban Ocon':['埃斯特班·奥康','OCO','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTEBAN_01_Esteban_Ocon/oco01.png.transform/2col-retina/image.png'],
'Gabriel Bortoleto':['加布里埃尔·博托莱托','BOR','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABRIEL_01_Gabriel_Bortoleto/bor01.png.transform/2col-retina/image.png'],
'Fernando Alonso':['费尔南多·阿隆索','ALO','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERNANDO01_Fernando_Alonso/alo01.png.transform/2col-retina/image.png'],
'Nico Hülkenberg':['尼科·霍肯伯格','HUL','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICO_HÜL01_Nico_Hülkenberg/hul01.png.transform/2col-retina/image.png'],
'Sergio Pérez':['塞尔吉奥·佩雷兹','PER','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERGIO_P01_Sergio_Pérez/per01.png.transform/2col-retina/image.png'],
'Lance Stroll':['兰斯·斯特罗尔','STR','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANCE_ST01_Lance_Stroll/str01.png.transform/2col-retina/image.png'],
'Arvid Lindblad':['阿尔维德·林德布拉德','LIN',''],
'Valtteri Bottas':['瓦尔特利·博塔斯','BOT',''],
}
const T_CN={
'Mercedes':['梅赛德斯','MERC','https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col-retina/image.png'],
'Ferrari':['法拉利','FER','https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png'],
'McLaren':['迈凯伦','MCL','https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col-retina/image.png'],
'Red Bull':['红牛','RBR','https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png'],
'Alpine F1 Team':['阿尔派','ALP','https://media.formula1.com/content/dam/fom-website/teams/2025/alpine-logo.png.transform/2col-retina/image.png'],
'RB F1 Team':['小红牛','RB',''],
'Haas F1 Team':['哈斯','HAA','https://media.formula1.com/content/dam/fom-website/teams/2025/haas-logo.png.transform/2col-retina/image.png'],
'Williams':['威廉姆斯','WIL','https://media.formula1.com/content/dam/fom-website/teams/2025/williams-logo.png.transform/2col-retina/image.png'],
'Aston Martin':['阿斯顿·马丁','AST','https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin-logo.png.transform/2col-retina/image.png'],
'Audi':['奥迪','AUD',''],
'Cadillac F1 Team':['凯迪拉克','CAD',''],
}
Page({onShow(){if(typeof this.getTabBar==="function"&&this.getTabBar())this.getTabBar().setData({selected:1})},data:{subtab:0,races:[],standings:[[],[]]},onLoad(){var t=this;wx.request({url:API+"/races",success(r){var n=new Date;t.setData({races:(r.data.data||[]).map(function(r){return{round:r.round,flag:FLAGS[r.country]||"🏁",gp:RACE_CN[r.name]||r.name,date:r.date.substring(5),circuit:r.circuit,status:new Date(r.date)<n?"done":"next",tag:new Date(r.date)<n?"已结束":"即将"}})})}}),wx.request({url:API+"/standings/drivers",success(r){var d=t.data.standings;d[0]=(r.data.data||[]).map(function(r){var m=D_CN[r.driver_name]||[r.driver_name,r.driver_code||"",""];return{pos:r.position,name:m[0],en:m[1],team:(T_CN[r.constructor]||[r.constructor])[0],pts:r.points,img:m[2]}});t.setData({standings:d})}}),wx.request({url:API+"/standings/constructors",success(r){var d=t.data.standings;d[1]=(r.data.data||[]).map(function(r){var m=T_CN[r.name]||[r.name,"",""];return{pos:r.position,name:m[0],en:m[1],pts:r.points,img:m[2]}});t.setData({standings:d})}})},switchSub(e){this.setData({subtab:parseInt(e.currentTarget.dataset.idx)})}})