Page({
  data: {
    history: [
      {race:'西班牙站',score:11,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台2/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},
      {race:'摩纳哥站',score:3,items:[{txt:'杆位❌',cls:'miss'},{txt:'领奖台1/3',cls:'hit'},{txt:'最快圈❌',cls:'miss'}]},
      {race:'迈阿密站',score:16,items:[{txt:'杆位✅',cls:'hit'},{txt:'领奖台3/3',cls:'hit'},{txt:'最快圈✅',cls:'hit'}]},
    ],
    favTeam: wx.getStorageSync('favTeam') || 'Ferrari',
    favDriver: wx.getStorageSync('favDriver') || 'Leclerc',
    showPicker: false, pickerType: '', teams: ['Ferrari','McLaren','Mercedes','Red Bull','Alpine','Aston Martin','Williams','RB','Haas','Audi','Cadillac'], drivers: ['Verstappen','Norris','Leclerc','Hamilton','Piastri','Russell','Antonelli','Sainz','Alonso','Gasly','Albon','Tsunoda','Ocon','Bearman','Hulkenberg','Perez','Stroll','Lawson','Hadjar','Bortoleto','Colapinto','Doohan']
  },
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 }) },
  onPick(e) {
    var t = e.currentTarget.dataset.type
    this.setData({ showPicker: true, pickerType: t })
  },
  selectFav(e) {
    var v = e.currentTarget.dataset.val
    if (this.data.pickerType === 'team') {
      wx.setStorageSync('favTeam', v)
      this.setData({ favTeam: v, showPicker: false })
    } else {
      wx.setStorageSync('favDriver', v)
      this.setData({ favDriver: v, showPicker: false })
    }
  },
  goPrivacy() { wx.navigateTo({ url: '/pages/privacy/privacy' }) }
})
