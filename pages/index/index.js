Page({
  onShow() {
    const pages = ['index', 'calendar', 'data', 'profile']
    const idx = pages.indexOf('index')
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: idx })
    }
  }
})
