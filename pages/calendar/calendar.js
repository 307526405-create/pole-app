const API = "http://localhost:8080/api"
const RACE_CN = {"Australian Grand Prix": "澳大利亚大奖赛", "Chinese Grand Prix": "中国大奖赛", "Japanese Grand Prix": "日本大奖赛", "Miami Grand Prix": "迈阿密大奖赛", "Canadian Grand Prix": "加拿大大奖赛", "Monaco Grand Prix": "摩纳哥大奖赛", "Barcelona Grand Prix": "巴塞罗那大奖赛", "Austrian Grand Prix": "奥地利大奖赛", "British Grand Prix": "英国大奖赛", "Belgian Grand Prix": "比利时大奖赛", "Hungarian Grand Prix": "匈牙利大奖赛", "Dutch Grand Prix": "荷兰大奖赛", "Italian Grand Prix": "意大利大奖赛", "Spanish Grand Prix": "西班牙大奖赛", "Azerbaijan Grand Prix": "阿塞拜疆大奖赛", "Singapore Grand Prix": "新加坡大奖赛", "United States Grand Prix": "美国大奖赛", "Mexico City Grand Prix": "墨西哥大奖赛", "Brazilian Grand Prix": "巴西大奖赛", "Las Vegas Grand Prix": "拉斯维加斯大奖赛", "Qatar Grand Prix": "卡塔尔大奖赛", "Abu Dhabi Grand Prix": "阿布扎比大奖赛"}
const FLAGS = {"Australia": "🇦🇺", "China": "🇨🇳", "Japan": "🇯🇵", "USA": "🇺🇸", "Canada": "🇨🇦", "Monaco": "🇲🇨", "Spain": "🇪🇸", "Austria": "🇦🇹", "UK": "🇬🇧", "Belgium": "🇧🇪", "Hungary": "🇭🇺", "Netherlands": "🇳🇱", "Italy": "🇮🇹", "Azerbaijan": "🇦🇿", "Singapore": "🇸🇬", "Mexico": "🇲🇽", "Brazil": "🇧🇷", "UAE": "🇦🇪", "Qatar": "🇶🇦"}
const D_CN = {
  'Andrea Kimi Antonelli':['安德烈亚·基米·安托内利','Antonelli','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ANDKIM01_Andrea_Kimi_Antonelli/andkim01.png.transform/2col-retina/image.png'],
  'Lewis Hamilton':['刘易斯·汉密尔顿','Hamilton','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png'],
  'George Russell':['乔治·拉塞尔','Russell','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png'],
  'Charles Leclerc':['夏尔·勒克莱尔','Leclerc','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png'],
  'Lando Norris':['兰多·诺里斯','Norris','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png'],
  'Oscar Piastri':['奥斯卡·皮亚斯特里','Piastri','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col-retina/image.png'],
  'Max Verstappen':['马克斯·维斯塔潘','Verstappen','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png'],
  'Pierre Gasly':['皮埃尔·加斯利','Gasly','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col-retina/image.png'],
  'Isack Hadjar':['伊萨克·哈贾尔','Hadjar','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png.transform/2col-retina/image.png'],
  'Liam Lawson':['利亚姆·劳森','Lawson','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/2col-retina/image.png'],
  'Oliver Bearman':['奥利弗·贝尔曼','Bearman','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/2col-retina/image.png'],
  'Franco Colapinto':['弗朗哥·科拉平托','Colapinto','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png.transform/2col-retina/image.png'],
  'Carlos Sainz':['卡洛斯·赛恩斯','Sainz','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col-retina/image.png'],
  'Alexander Albon':['亚历山大·阿尔本','Albon','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col-retina/image.png'],
  'Esteban Ocon':['埃斯特班·奥康','Ocon','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col-retina/image.png'],
  'Gabriel Bortoleto':['加布里埃尔·博托莱托','Bortoleto','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png.transform/2col-retina/image.png'],
  'Fernando Alonso':['费尔南多·阿隆索','Alonso','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col-retina/image.png'],
  'Nico Hülkenberg':['尼科·霍肯伯格','Hülkenberg','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col-retina/image.png'],
  'Sergio Pérez':['塞尔吉奥·佩雷兹','Pérez','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col-retina/image.png'],
  'Lance Stroll':['兰斯·斯特罗尔','Stroll','https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col-retina/image.png'],
  'Arvid Lindblad':['阿尔维德·林德布拉德','Lindblad',''],
  'Valtteri Bottas':['瓦尔特利·博塔斯','Bottas',''],
}
const T_CN = {
  'Mercedes':['梅赛德斯','Mercedes','https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col-retina/image.png'],
  'Ferrari':['法拉利','Ferrari','https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png'],
  'McLaren':['迈凯伦','McLaren','https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col-retina/image.png'],
  'Red Bull':['红牛','Red Bull','https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png'],
  'Alpine F1 Team':['阿尔派','Alpine','https://media.formula1.com/content/dam/fom-website/teams/2025/alpine-logo.png.transform/2col-retina/image.png'],
  'RB F1 Team':['小红牛','RB','https://media.formula1.com/content/dam/fom-website/teams/2025/rb-logo.png.transform/2col-retina/image.png'],
  'Haas F1 Team':['哈斯','Haas','https://media.formula1.com/content/dam/fom-website/teams/2025/haas-logo.png.transform/2col-retina/image.png'],
  'Williams':['威廉姆斯','Williams','https://media.formula1.com/content/dam/fom-website/teams/2025/williams-logo.png.transform/2col-retina/image.png'],
  'Aston Martin':['阿斯顿·马丁','Aston Martin','https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin-logo.png.transform/2col-retina/image.png'],
  'Audi':['奥迪','Audi','https://media.formula1.com/content/dam/fom-website/teams/2025/audi-logo.png.transform/2col-retina/image.png'],
  'Cadillac F1 Team':['凯迪拉克','Cadillac','https://media.formula1.com/content/dam/fom-website/teams/2025/cadillac-logo.png.transform/2col-retina/image.png'],
}
Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 }) },
  data: { subtab: 0, races: [], standings: [[], []] },
  onLoad() {
    var that = this
    wx.request({ url: API + '/races', success(res) {
      var now = new Date()
      that.setData({ races: (res.data.data || []).map(function(r) {
        return { round: r.round, flag: FLAGS[r.country] || '🏁', gp: RACE_CN[r.name] || r.name, date: r.date.substring(5), circuit: r.circuit, status: new Date(r.date) < now ? 'done' : '即将', tag: new Date(r.date) < now ? '已结束' : '即将' }
      })})
    }})
    wx.request({ url: API + '/standings/drivers', success(res) {
      var ds = that.data.standings
      ds[0] = (res.data.data || []).map(function(d) {
        var t = D_CN[d.driver_name] || [d.driver_name, d.driver_code || '', '']
        return { pos: d.position, name: t[0], en: t[1], team: (T_CN[d.constructor] || [d.constructor])[0], pts: d.points, img: t[2] }
      })
      that.setData({ standings: ds })
    }})
    wx.request({ url: API + '/standings/constructors', success(res) {
      var ds = that.data.standings
      ds[1] = (res.data.data || []).map(function(d) {
        var t = T_CN[d.name] || [d.name, '', '']
        return { pos: d.position, name: t[0], en: t[1], pts: d.points, img: t[2] }
      })
      that.setData({ standings: ds })
    }})
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
