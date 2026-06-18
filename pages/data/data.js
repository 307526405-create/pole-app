Page({
  onShow() {
    const pages = ['index', 'calendar', 'data', 'profile']
    const idx = pages.indexOf('data')
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: idx })
    }
  }
})
