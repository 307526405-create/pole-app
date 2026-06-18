Component({
  data: { selected: 0, list: [
    { pagePath: '/pages/index/index', text: '首页' },
    { pagePath: '/pages/calendar/calendar', text: '赛程' },
    { pagePath: '/pages/data/data', text: '数据' },
    { pagePath: '/pages/profile/profile', text: '我的' }
  ]},
  methods: {
    switchTab(e) {
      const { path, index } = e.currentTarget.dataset
      wx.switchTab({ url: path })
      this.setData({ selected: index })
    }
  }
})
