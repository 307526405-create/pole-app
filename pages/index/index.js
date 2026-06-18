Page({
  data: {
    isOffSeason: false,
    checkedIn: false,
    dailyTrivia: '舒马赫在2004赛季赢得了前13站中的12站——这是F1历史上最具统治力的赛季开局。',
    cd: { days: '02', hours: '18', minutes: '45' },
    news: [
      { tag: '转会', title: '法拉利2027赛季确认继续使用自研引擎', time: '2小时前', summary: '法拉利车队官方宣布，2027赛季将继续使用自主研发的动力单元。', expanded: false },
      { tag: '数据', title: '诺里斯成为唯一连续24站得分的现役车手', time: '6小时前', summary: '迈凯伦车手Lando Norris在每一站都获得了积分。', expanded: false },
      { tag: '新规', title: '奥迪F1车队2026赛季正式入场', time: '昨天', summary: '奥迪将于2026赛季以厂队身份进入F1。', expanded: false },
    ]
  },
  onLoad() { this.startCountdown(); this.checkCheckin() },
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 0 }) },
  onShareAppMessage() { return { title: '杆位 - F1赛车竞猜', path: '/pages/index/index' } },
  
  onCheckin() {
    if (this.data.checkedIn) return
    this.setData({ checkedIn: true })
    wx.showToast({ title: '签到成功 +1分', icon: 'success' })
    // TODO: 后端记录签到积分
  },
  checkCheckin() {
    const today = new Date().toDateString()
    const last = wx.getStorageSync('checkin_date')
    if (last === today) this.setData({ checkedIn: true })
  },
  
  startCountdown() {
    const target = new Date('2026-06-20T23:00:00+08:00')
    const tick = () => {
      const now = new Date(); const diff = target - now
      if (diff <= 0) { this.setData({ cd: { days:'00', hours:'00', minutes:'00' } }); return }
      const d = Math.floor(diff / 86400000); const h = Math.floor((diff % 86400000) / 3600000); const m = Math.floor((diff % 3600000) / 60000)
      this.setData({ cd: { days: String(d).padStart(2,'0'), hours: String(h).padStart(2,'0'), minutes: String(m).padStart(2,'0') } })
    }
    tick(); this._timer = setInterval(tick, 30000)
  },
  onUnload() { if (this._timer) clearInterval(this._timer) },
  toggleNews(e) { const idx = e.currentTarget.dataset.idx; const news = this.data.news; news[idx].expanded = !news[idx].expanded; this.setData({ news }) },
  onPredict() { wx.navigateTo({ url: '/pages/predict/predict' }) }
})
