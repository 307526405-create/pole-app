Page({
  data: {
    history: [
      {race:'西班牙站',score:11,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台2/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},
      {race:'摩纳哥站',score:3,items:[{txt:'杆位❌',cls:'miss'},{txt:'领奖台1/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},
      {race:'迈阿密站',score:16,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台3/3',cls:'hit'},{txt:'最快圈✅',cls:'hit'}]},
    ],
    favTeam: 'Ferrari',
    favDriver: 'Leclerc'
  },
  onShow() {
    if (typeof this.getTabBar === 'function') this.getTabBar().setData({ selected: 2 })
    this.setData({
      favTeam: wx.getStorageSync('favTeam') || 'Ferrari',
      favDriver: wx.getStorageSync('favDriver') || 'Leclerc'
    })
  },
  pickTeam() {
    var that = this
    wx.showActionSheet({
      itemList: ['法拉利','迈凯伦','梅赛德斯','红牛','阿尔派','阿斯顿马丁','威廉姆斯','小红牛','哈斯','奥迪','凯迪拉克'],
      success: function(res) {
        var teams = ['Ferrari','McLaren','Mercedes','Red Bull','Alpine','Aston Martin','Williams','RB','Haas','Audi','Cadillac']
        wx.setStorageSync('favTeam', teams[res.tapIndex])
        that.setData({ favTeam: teams[res.tapIndex] })
      }
    })
  },
  pickDriver() {
    var that = this
    wx.showActionSheet({
      itemList: ['维斯塔潘','诺里斯','勒克莱尔','汉密尔顿','皮亚斯特里','拉塞尔','安东内利'],
      success: function(res) {
        var drivers = ['Verstappen','Norris','Leclerc','Hamilton','Piastri','Russell','Antonelli']
        wx.setStorageSync('favDriver', drivers[res.tapIndex])
        that.setData({ favDriver: drivers[res.tapIndex] })
      }
    })
  },
  goPrivacy() { wx.navigateTo({ url: '/pages/privacy/privacy' }) }
})
