Page({
  data: { driver: null },
  onLoad() {
    const app = getApp()
    const d = app.globalData.driver
    console.log('driver page loaded:', d)
    if (d && d.name) {
      this.setData({ driver: d })
    } else {
      // fallback测试数据
      this.setData({ driver: {
        num: 1, name: '马克斯·维斯塔潘', team: '红牛', nationality: '🇳🇱',
        championships: '4次', wins: '63+', podiums: '112+',
        desc: '4届世界冠军。2026赛季红牛低迷，暂列第7。',
        img: 'https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000001/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp'
      }})
    }
  },
  onBack() { wx.navigateBack() }
})
