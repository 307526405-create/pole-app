Page({
  data: { driver: { num:'?', name:'加载中', team:'', nationality:'', championships:'0', wins:'0', podiums:'0', desc:'' } },
  onLoad() {
    var app = getApp()
    var d = app.globalData.driver
    if (d && d.name) {
      this.setData({ driver: d })
    }
  },
  onBack() { wx.navigateBack() }
})
