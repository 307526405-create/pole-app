Page({
  data: {
    history: [
      {race:'西班牙站',score:11,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台2/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},
      {race:'摩纳哥站',score:3,items:[{txt:'杆位❌',cls:'miss'},{txt:'领奖台1/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},
      {race:'迈阿密站',score:16,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台3/3',cls:'hit'},{txt:'最快圈✅',cls:'hit'}]},
    ],
    teams: ['Ferrari','McLaren','Mercedes','Red Bull','Alpine','Aston Martin','Williams','RB','Haas','Audi','Cadillac'],
    drivers: ['Verstappen','Norris','Leclerc','Hamilton','Piastri','Russell','Antonelli','Sainz','Alonso','Gasly','Albon','Tsunoda','Ocon','Bearman','Hulkenberg','Perez','Stroll','Lawson','Hadjar','Bortoleto','Colapinto','Doohan'],
    favTeam: '',
    favDriver: '',
    showPick: false,
    pickType: ''
  },
  onShow() {
    if (typeof this.getTabBar === 'function') this.getTabBar().setData({ selected: 2 })
    this.setData({ favTeam: wx.getStorageSync('favTeam') || 'Ferrari', favDriver: wx.getStorageSync('favDriver') || 'Leclerc' })
  },
  onPick(e) {
    this.setData({ showPick: true, pickType: e.currentTarget.dataset.type })
  },
  doPick(e) {
    var v = e.currentTarget.dataset.val
    if (!v) { this.setData({ showPick: false }); return }
    var key = this.data.pickType === 'team' ? 'favTeam' : 'favDriver'
    wx.setStorageSync(key, v)
    var d = {}
    d[key] = v
    d.showPick = false
    this.setData(d)
  },
  goPrivacy() { wx.navigateTo({ url: '/pages/privacy/privacy' }) }
})
