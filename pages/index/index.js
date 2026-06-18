Page({
  data: {
    cd: { days: '02', hours: '18', minutes: '45' },
    news: [
      { tag: '转会', title: '法拉利2027赛季确认继续使用自研引擎', time: '2小时前', summary: '法拉利车队官方宣布，2027赛季将继续使用自主研发的动力单元，不会寻求外部供应商合作。这一决定意味着法拉利将继续保持其作为F1唯一全自主研发车队的地位。', expanded: false },
      { tag: '数据', title: '诺里斯成为唯一连续24站得分的现役车手', time: '6小时前', summary: '2025赛季至今，迈凯伦车手Lando Norris在每一站大奖赛中都获得了积分，成为围场唯一连续24站得分的现役车手，追平了Hamilton的历史纪录。', expanded: false },
      { tag: '新规', title: '奥迪F1车队2026赛季正式入场', time: '昨天', summary: '奥迪将于2026赛季正式以厂队身份进入F1，收购索伯车队的全部股份。车队总部设在瑞士辛维尔，德国诺伊堡作为动力单元研发中心。中国车手周冠宇的去向成为关注焦点。', expanded: false },
    ]
  },
  onLoad() { this.startCountdown() },
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 0 }) },
  
  // 动态倒计时
  startCountdown() {
    const target = new Date('2026-06-20T23:00:00+08:00') // 排位赛时间
    const tick = () => {
      const now = new Date()
      const diff = target - now
      if (diff <= 0) { this.setData({ cd: { days:'00', hours:'00', minutes:'00' } }); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      this.setData({ cd: { days: String(d).padStart(2,'0'), hours: String(h).padStart(2,'0'), minutes: String(m).padStart(2,'0') } })
    }
    tick()
    this._timer = setInterval(tick, 30000)
  },
  onUnload() { if (this._timer) clearInterval(this._timer) },

  toggleNews(e) {
    const idx = e.currentTarget.dataset.idx
    const news = this.data.news
    news[idx].expanded = !news[idx].expanded
    this.setData({ news })
  },
  onPredict() { wx.navigateTo({ url: '/pages/predict/predict' }) },
  onShare() { wx.showToast({ title: '已生成分享卡片', icon: 'success' }) }
})
