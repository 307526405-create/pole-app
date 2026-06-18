Page({
  data: {},
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },
  onPredict() { wx.navigateTo({ url: '/pages/predict/predict' }) },
  onCalendar() { wx.switchTab({ url: '/pages/calendar/calendar' }) },
  onShare() { wx.showToast({ title: '已生成分享卡片', icon: 'success' }) }
})
