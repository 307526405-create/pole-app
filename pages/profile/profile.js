var TN = {'Ferrari':'法拉利 Ferrari','McLaren':'迈凯伦 McLaren','Mercedes':'梅赛德斯 Mercedes','Red Bull':'红牛 Red Bull','Alpine':'阿尔派 Alpine','Aston Martin':'阿斯顿马丁 Aston Martin','Williams':'威廉姆斯 Williams','RB':'小红牛 RB','Haas':'哈斯 Haas','Audi':'奥迪 Audi','Cadillac':'凯迪拉克 Cadillac'}
var DN = {'Verstappen':'维斯塔潘 Verstappen','Norris':'诺里斯 Norris','Leclerc':'勒克莱尔 Leclerc','Hamilton':'汉密尔顿 Hamilton','Piastri':'皮亚斯特里 Piastri','Russell':'拉塞尔 Russell','Antonelli':'安东内利 Antonelli','Sainz':'赛恩斯 Sainz','Alonso':'阿隆索 Alonso','Gasly':'加斯利 Gasly','Albon':'阿尔本 Albon','Tsunoda':'角田裕毅 Tsunoda','Ocon':'奥康 Ocon','Bearman':'贝尔曼 Bearman','Hulkenberg':'霍肯伯格 Hulkenberg','Perez':'佩雷兹 Perez','Stroll':'斯特罗尔 Stroll','Lawson':'劳森 Lawson','Hadjar':'哈贾尔 Hadjar','Bortoleto':'博托莱托 Bortoleto','Colapinto':'科拉平托 Colapinto','Doohan':'杜汉 Doohan'}
var TL = {'Ferrari':'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png','McLaren':'https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col-retina/image.png','Mercedes':'https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col-retina/image.png','Red Bull':'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png','Alpine':'https://media.formula1.com/content/dam/fom-website/teams/2025/alpine-logo.png.transform/2col-retina/image.png','Aston Martin':'https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin-logo.png.transform/2col-retina/image.png','Williams':'https://media.formula1.com/content/dam/fom-website/teams/2025/williams-logo.png.transform/2col-retina/image.png','RB':'https://media.formula1.com/content/dam/fom-website/teams/2025/racing-bulls-logo.png.transform/2col-retina/image.png','Haas':'https://media.formula1.com/content/dam/fom-website/teams/2025/haas-logo.png.transform/2col-retina/image.png','Audi':'/static/logos/audi.svg','Cadillac':'/static/logos/cadillac.svg'}
var TK = ['Ferrari','McLaren','Mercedes','Red Bull','Alpine','Aston Martin','Williams','RB','Haas','Audi','Cadillac']
var DK = ['Verstappen','Norris','Leclerc','Hamilton','Piastri','Russell','Antonelli','Sainz','Alonso','Gasly','Albon','Tsunoda','Ocon','Bearman','Hulkenberg','Perez','Stroll','Lawson','Hadjar','Bortoleto','Colapinto','Doohan']
'Verstappen':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp','Norris':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp','Leclerc':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp','Hamilton':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp','Piastri':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp','Russell':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp','Antonelli':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp','Sainz':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/williams/carsai01/2026williamscarsai01right.webp','Alonso':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/astonmartin/feralo01/2026astonmartinferalo01right.webp','Gasly':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/alpine/piegas01/2026alpinepiegas01right.webp','Albon':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/williams/alealb01/2026williamsalealb01right.webp','Tsunoda':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/racingbulls/yuktsu01/2026racingbullsyuktsu01right.webp','Ocon':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/haasf1team/estoco01/2026haasf1teamestoco01right.webp','Bearman':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/haasf1team/olibea01/2026haasf1teamolibea01right.webp','Hulkenberg':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/audi/nichul01/2026audinichul01right.webp','Perez':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/cadillac/serper01/2026cadillacserper01right.webp','Stroll':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/astonmartin/lanstr01/2026astonmartinlanstr01right.webp','Lawson':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/racingbulls/lialaw01/2026racingbullslialaw01right.webp','Hadjar':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01right.webp','Bortoleto':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/audi/gabbor01/2026audigabbor01right.webp','Colapinto':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/alpine/fracol01/2026alpinefracol01right.webp','Doohan':''}'}:'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp','Norris':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp','Leclerc':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp','Hamilton':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp','Piastri':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp','Russell':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp','Antonelli':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp'}
var historyData = [{race:'西班牙站',score:11,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台2/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},{race:'摩纳哥站',score:3,items:[{txt:'杆位❌',cls:'miss'},{txt:'领奖台1/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},{race:'迈阿密站',score:16,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台3/3',cls:'hit'},{txt:'最快圈✅',cls:'hit'}]}]

Page({
  data: {
    history: historyData,
    favTeamName: '',
    favDriverName: '',
    favTeamLogo: '',
    favDriverImg: '',
    showPick: false,
    pickTitle: '',
    pickItems: [],
    pickKeys: []
  },
  onShow() {
    if (typeof this.getTabBar === 'function') this.getTabBar().setData({ selected: 2 })
    this.loadFav()
  },
  loadFav() {
    var ft = wx.getStorageSync('favTeam') || 'Ferrari'
    var fd = wx.getStorageSync('favDriver') || 'Leclerc'
    this.setData({
      favTeamName: TN[ft] || ft,
      favDriverName: DN[fd] || fd,
      favTeamLogo: TL[ft] || '',
      favDriverImg: DI[fd] || ''
    })
  },
  pickTeam() {
    var items = [], keys = []
    for (var i = 0; i < TK.length; i++) {
      keys.push(TK[i])
      items.push(TN[TK[i]] || TK[i])
    }
    this.setData({ showPick: true, pickTitle: '选择车队', pickItems: items, pickKeys: keys })
  },
  pickDriver() {
    var items = [], keys = []
    for (var i = 0; i < DK.length; i++) {
      keys.push(DK[i])
      items.push(DN[DK[i]] || DK[i])
    }
    this.setData({ showPick: true, pickTitle: '选择车手', pickItems: items, pickKeys: keys })
  },
  doPick(e) {
    var idx = e.currentTarget.dataset.idx
    if (idx === undefined) { this.setData({ showPick: false }); return }
    var key = this.data.pickKeys[idx]
    var k = this.data.pickTitle.indexOf('车队') >= 0 ? 'favTeam' : 'favDriver'
    wx.setStorageSync(k, key)
    this.setData({ showPick: false })
    this.loadFav()
  },
  goPrivacy() { wx.navigateTo({ url: '/pages/privacy/privacy' }) }
})
