Page({
  data: {
    history: [
      {race:'西班牙站',score:11,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台2/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},
      {race:'摩纳哥站',score:3,items:[{txt:'杆位❌',cls:'miss'},{txt:'领奖台1/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},
      {race:'迈阿密站',score:16,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台3/3',cls:'hit'},{txt:'最快圈✅',cls:'hit'}]},
    ],
    favTeamName: '法拉利 Ferrari',
    favDriverName: '勒克莱尔 Leclerc',
    favTeamLogo: 'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png',
    favDriverImg: 'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp'
  },
  onShow() {
    if (typeof this.getTabBar === 'function') this.getTabBar().setData({ selected: 2 })
    this.loadFav()
  },
  loadFav() {
    var ft = wx.getStorageSync('favTeam') || 'Ferrari'
    var fd = wx.getStorageSync('favDriver') || 'Leclerc'
    var TN = {'Ferrari':'法拉利 Ferrari','McLaren':'迈凯伦 McLaren','Mercedes':'梅赛德斯 Mercedes','Red Bull':'红牛 Red Bull','Alpine':'阿尔派 Alpine','Aston Martin':'阿斯顿马丁 Aston Martin','Williams':'威廉姆斯 Williams','RB':'小红牛 RB','Haas':'哈斯 Haas','Audi':'奥迪 Audi','Cadillac':'凯迪拉克 Cadillac'}
    var DN = {'Verstappen':'维斯塔潘 Verstappen','Norris':'诺里斯 Norris','Leclerc':'勒克莱尔 Leclerc','Hamilton':'汉密尔顿 Hamilton','Piastri':'皮亚斯特里 Piastri','Russell':'拉塞尔 Russell','Antonelli':'安东内利 Antonelli'}
    var TL = {'Ferrari':'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png','McLaren':'https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col-retina/image.png','Mercedes':'https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col-retina/image.png','Red Bull':'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png','Alpine':'https://media.formula1.com/content/dam/fom-website/teams/2025/alpine-logo.png.transform/2col-retina/image.png','Aston Martin':'https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin-logo.png.transform/2col-retina/image.png','Williams':'https://media.formula1.com/content/dam/fom-website/teams/2025/williams-logo.png.transform/2col-retina/image.png','RB':'https://media.formula1.com/content/dam/fom-website/teams/2025/racing-bulls-logo.png.transform/2col-retina/image.png','Haas':'https://media.formula1.com/content/dam/fom-website/teams/2025/haas-logo.png.transform/2col-retina/image.png','Audi':'/static/logos/audi.svg','Cadillac':'/static/logos/cadillac.svg'}
    var DI = {'Verstappen':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp','Norris':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp','Leclerc':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp','Hamilton':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp','Piastri':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp','Russell':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp','Antonelli':'https://media.formula1.com/image/upload/c_fill,w_100,h_100,g_face/q_auto/v1740000001/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp'}
    this.setData({
      favTeamName: TN[ft] || ft,
      favDriverName: DN[fd] || fd,
      favTeamLogo: TL[ft] || '',
      favDriverImg: DI[fd] || ''
    })
  },
  pickTeam() {
    var that = this
    var TK = ['Ferrari','McLaren','Mercedes','Red Bull','Alpine','Aston Martin']
    var TKN = ['法拉利 Ferrari','迈凯伦 McLaren','梅赛德斯 Mercedes','红牛 Red Bull','阿尔派 Alpine','阿斯顿马丁 Aston Martin']
    wx.showActionSheet({
      itemList: TKN,
      success: function(res) {
        wx.setStorageSync('favTeam', TK[res.tapIndex])
        that.loadFav()
      }
    })
  },
  pickDriver() {
    var that = this
    var DK = ['Verstappen','Norris','Leclerc','Hamilton','Piastri','Russell']
    var DKN = ['维斯塔潘 Verstappen','诺里斯 Norris','勒克莱尔 Leclerc','汉密尔顿 Hamilton','皮亚斯特里 Piastri','拉塞尔 Russell']
    wx.showActionSheet({
      itemList: DKN,
      success: function(res) {
        wx.setStorageSync('favDriver', DK[res.tapIndex])
        that.loadFav()
      }
    })
  },
  goPrivacy() { wx.navigateTo({ url: '/pages/privacy/privacy' }) }
})
