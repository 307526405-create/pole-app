Page({
  data: { driver: {} },
  onLoad(options) {
    const app = getApp()
    const driver = app.globalData.driver || {}
    if (options.name) {
      try { driver.name = decodeURIComponent(options.name) } catch(e) {}
      try { driver.team = decodeURIComponent(options.team) } catch(e) {}
      try { driver.num = parseInt(options.num) || '' } catch(e) {}
      try { driver.img = decodeURIComponent(options.img) } catch(e) {}
      try { driver.desc = decodeURIComponent(options.desc) } catch(e) {}
      try { driver.championships = decodeURIComponent(options.championships) } catch(e) {}
      try { driver.wins = decodeURIComponent(options.wins) } catch(e) {}
      try { driver.podiums = decodeURIComponent(options.podiums) } catch(e) {}
      try { driver.nationality = decodeURIComponent(options.nationality) } catch(e) {}
    }
    this.setData({ driver })
  },
  onBack() { wx.navigateBack() }
})
