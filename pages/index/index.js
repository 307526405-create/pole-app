Page({
  data: {
    news: [
      { tag: '转会', title: '法拉利2027赛季确认继续使用自研引擎', time: '2小时前' },
      { tag: '数据', title: '诺里斯成为唯一连续24站得分的现役车手', time: '6小时前' },
      { tag: '新规', title: '奥迪F1车队2026赛季正式入场，中国车手待定', time: '昨天' },
    ]
  },
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 0 }) },
  onPredict() { wx.navigateTo({ url: '/pages/predict/predict' }) },
  onShare() { wx.showToast({ title: '已生成分享卡片', icon: 'success' }) }
})
