Page({
  data: { driver: {} },
  onLoad() {
    const app = getApp()
    this.setData({ driver: app.globalData.driver || {} })
  },
  onBack() { wx.navigateBack() }
})
