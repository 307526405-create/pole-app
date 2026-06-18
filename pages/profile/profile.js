Page({
  data: {
    history: [
      {race:'西班牙站',detail:'杆位✅ 领奖台2/3 ✅ 最快圈❌',score:'+11'},
      {race:'摩纳哥站',detail:'杆位❌ 领奖台1/3 最快圈❌',score:'+3'},
      {race:'迈阿密站',detail:'杆位✅ 领奖台3/3 ✅ 最快圈✅',score:'+16'},
    ]
  },
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 }) },
  onPro() { wx.showToast({ title: 'Pro功能即将上线', icon: 'none' }) }
})
