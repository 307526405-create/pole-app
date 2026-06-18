Page({
  data: {},
  onPredict() { wx.navigateTo({ url: '/pages/predict/predict' }) },
  onCalendar() { wx.switchTab({ url: '/pages/calendar/calendar' }) },
  onShare() { wx.showToast({ title: '已生成分享卡片', icon: 'success' }) }
})
