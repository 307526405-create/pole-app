const API="http://localhost:8080/api"
const RACE_CN={"Australian Grand Prix": "澳大利亚大奖赛", "Chinese Grand Prix": "中国大奖赛", "Japanese Grand Prix": "日本大奖赛", "Miami Grand Prix": "迈阿密大奖赛", "Canadian Grand Prix": "加拿大大奖赛", "Monaco Grand Prix": "摩纳哥大奖赛", "Barcelona Grand Prix": "巴塞罗那大奖赛", "Austrian Grand Prix": "奥地利大奖赛", "British Grand Prix": "英国大奖赛", "Belgian Grand Prix": "比利时大奖赛", "Hungarian Grand Prix": "匈牙利大奖赛", "Dutch Grand Prix": "荷兰大奖赛", "Italian Grand Prix": "意大利大奖赛", "Spanish Grand Prix": "西班牙大奖赛", "Azerbaijan Grand Prix": "阿塞拜疆大奖赛", "Singapore Grand Prix": "新加坡大奖赛", "United States Grand Prix": "美国大奖赛", "Mexico City Grand Prix": "墨西哥大奖赛", "Brazilian Grand Prix": "巴西大奖赛", "Las Vegas Grand Prix": "拉斯维加斯大奖赛", "Qatar Grand Prix": "卡塔尔大奖赛", "Abu Dhabi Grand Prix": "阿布扎比大奖赛"}
const FLAGS={"Australia": "🇦🇺", "China": "🇨🇳", "Japan": "🇯🇵", "USA": "🇺🇸", "Canada": "🇨🇦", "Monaco": "🇲🇨", "Spain": "🇪🇸", "Austria": "🇦🇹", "UK": "🇬🇧", "Belgium": "🇧🇪", "Hungary": "🇭🇺", "Netherlands": "🇳🇱", "Italy": "🇮🇹", "Azerbaijan": "🇦🇿", "Singapore": "🇸🇬", "Mexico": "🇲🇽", "Brazil": "🇧🇷", "UAE": "🇦🇪", "Qatar": "🇶🇦"}
const D_CN={
'Andrea Kimi Antonelli':['安德烈亚·基米·安托内利','ANT','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp'],
'Lewis Hamilton':['刘易斯·汉密尔顿','HAM','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp'],
'George Russell':['乔治·拉塞尔','RUS','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp'],
'Charles Leclerc':['夏尔·勒克莱尔','LEC','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp'],
'Lando Norris':['兰多·诺里斯','NOR','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp'],
'Oscar Piastri':['奥斯卡·皮亚斯特里','PIA','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp'],
'Max Verstappen':['马克斯·维斯塔潘','VER','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp'],
'Pierre Gasly':['皮埃尔·加斯利','GAS','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/alpine/piegas01/2026alpinepiegas01right.webp'],
'Isack Hadjar':['伊萨克·哈贾尔','HAD','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01right.webp'],
'Liam Lawson':['利亚姆·劳森','LAW','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/racingbulls/lialaw01/2026racingbullslialaw01right.webp'],
'Oliver Bearman':['奥利弗·贝尔曼','BEA','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/haasf1team/olibea01/2026haasf1teamolibea01right.webp'],
'Franco Colapinto':['弗朗哥·科拉平托','COL','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/alpine/fracol01/2026alpinefracol01right.webp'],
'Carlos Sainz':['卡洛斯·赛恩斯','SAI','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/williams/carsai01/2026williamscarsai01right.webp'],
'Alexander Albon':['亚历山大·阿尔本','ALB','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/williams/alealb01/2026williamsalealb01right.webp'],
'Esteban Ocon':['埃斯特班·奥康','OCO','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/haasf1team/estoco01/2026haasf1teamestoco01right.webp'],
'Gabriel Bortoleto':['加布里埃尔·博托莱托','BOR','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/audi/gabbor01/2026audigabbor01right.webp'],
'Fernando Alonso':['费尔南多·阿隆索','ALO','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/astonmartin/feralo01/2026astonmartinferalo01right.webp'],
'Nico Hülkenberg':['尼科·霍肯伯格','HUL','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/audi/nichul01/2026audinichul01right.webp'],
'Sergio Pérez':['塞尔吉奥·佩雷兹','PER','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/cadillac/serper01/2026cadillacserper01right.webp'],
'Lance Stroll':['兰斯·斯特罗尔','STR','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/astonmartin/lanstr01/2026astonmartinlanstr01right.webp'],
'Arvid Lindblad':['阿尔维德·林德布拉德','LIN','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/racingbulls/arvlin01/2026racingbullsarvlin01right.webp'],
'Valtteri Bottas':['瓦尔特利·博塔斯','BOT','https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/cadillac/valbot01/2026cadillacvalbot01right.webp'],
}
const T_CN={
'Mercedes':['梅赛德斯','MERC','https://media.formula1.com/image/upload/c_fit,h_80/q_auto/v1740000001/common/f1/2026/mercedes/2026mercedeslogowhite.webp'],
'Ferrari':['法拉利','FER','https://media.formula1.com/image/upload/c_fit,h_80/q_auto/v1740000001/common/f1/2026/ferrari/2026ferrarilogowhite.webp'],
'McLaren':['迈凯伦','MCL','https://media.formula1.com/image/upload/c_fit,h_80/q_auto/v1740000001/common/f1/2026/mclaren/2026mclarenlogowhite.webp'],
'Red Bull':['红牛','RBR','https://media.formula1.com/image/upload/c_fit,h_80/q_auto/v1740000001/common/f1/2026/redbullracing/2026redbullracinglogowhite.webp'],
'Alpine F1 Team':['阿尔派','ALP','https://media.formula1.com/image/upload/c_fit,h_80/q_auto/v1740000001/common/f1/2026/alpine/2026alpinelogowhite.webp'],
'RB F1 Team':['小红牛','RB','https://media.formula1.com/image/upload/c_fit,h_80/q_auto/v1740000001/common/f1/2026/racingbulls/2026racingbullslogowhite.webp'],
'Haas F1 Team':['哈斯','HAA','https://media.formula1.com/image/upload/c_fit,h_80/q_auto/v1740000001/common/f1/2026/haasf1team/2026haasf1teamlogowhite.webp'],
'Williams':['威廉姆斯','WIL','https://media.formula1.com/image/upload/c_fit,h_80/q_auto/v1740000001/common/f1/2026/williams/2026williamslogowhite.webp'],
'Aston Martin':['阿斯顿·马丁','AST','https://media.formula1.com/image/upload/c_fit,h_80/q_auto/v1740000001/common/f1/2026/astonmartin/2026astonmartinlogowhite.webp'],
'Audi':['奥迪','AUD','/static/logos/audi.svg'],
'Cadillac F1 Team':['凯迪拉克','CAD','/static/logos/cadillac.svg'],
}
Page({onShow(){if(typeof this.getTabBar==="function"&&this.getTabBar())this.getTabBar().setData({selected:1})},data:{subtab:0,races:[],standings:[[],[]]},onLoad(){var t=this;wx.request({url:API+"/races",success(r){var n=new Date;t.setData({races:(r.data.data||[]).map(function(r){return{round:r.round,flag:FLAGS[r.country]||"🏁",gp:RACE_CN[r.name]||r.name,date:r.date.substring(5),circuit:r.circuit,status:new Date(r.date)<n?"done":"next",tag:new Date(r.date)<n?"已结束":"即将"}})})}}),wx.request({url:API+"/standings/drivers",success(r){var d=t.data.standings;d[0]=(r.data.data||[]).map(function(r){var m=D_CN[r.driver_name]||[r.driver_name,r.driver_code||"",""];return{pos:r.position,name:m[0],en:m[1],team:(T_CN[r.constructor]||[r.constructor])[0],pts:r.points,img:m[2]}});t.setData({standings:d})}}),wx.request({url:API+"/standings/constructors",success(r){var d=t.data.standings;d[1]=(r.data.data||[]).map(function(r){var m=T_CN[r.name]||[r.name,"",""];return{pos:r.position,name:m[0],en:m[1],pts:r.points,img:m[2]}});t.setData({standings:d})}})},switchSub(e){this.setData({subtab:parseInt(e.currentTarget.dataset.idx)})}})