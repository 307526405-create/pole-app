Page({
  data: { d1name: '', d2name: '', d1: {}, d2: {} },
  onBack() { wx.navigateBack() },
  pickD1() { this.pick('d1') },
  pickD2() { this.pick('d2') },
  pick(k) {
    var that = this
    wx.showActionSheet({
      itemList: ['Verstappen','Norris','Leclerc','Hamilton','Piastri','Russell','Antonelli'],
      success(r) {
        var names = ['Verstappen','Norris','Leclerc','Hamilton','Piastri','Russell','Antonelli']
        that.setData({ [k+'name']: names[r.tapIndex] })
        if (that.data.d1name && that.data.d2name) that.load()
      }
    })
  },
  load() {
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/compare/drivers?driver1=' + this.data.d1name + '&driver2=' + this.data.d2name,
      success(r) {
        if (r.data.code === 0) {
          var d = r.data.data
          that.setData({
            d1: { pos: d.driver1.position, pts: d.driver1.points, wins: d.driver1.wins },
            d2: { pos: d.driver2.position, pts: d.driver2.points, wins: d.driver2.wins }
          })
        }
      }
    })
  }
})
