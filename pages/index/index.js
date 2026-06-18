Page({
  data: {
    isOffSeason: false, checkedIn: false, streak: 5, lootOpened: false, showLootToast: false,
    lootResult: { icon:'', text:'' },
    quizDone: false, quizResult: { correct: false },
    quiz: { question: '舒马赫一共拿过几个F1世界冠军？', options: ['5个','6个','7个','8个'], answer: '7个', explanation: '舒马赫生涯共获得7次F1世界冠军（1994-95, 2000-04）。' },
    trivias: [
      '舒马赫在2004赛季赢得了前13站中的12站——F1历史上最具统治力的赛季开局。',
      '维斯塔潘是F1史上最年轻的分站冠军（18岁228天，2016西班牙站）。',
      '法拉利是F1唯一参加全部赛季的车队，自1950年至今从未缺席。',
    ],
    cd: { days: '02', hours: '18', minutes: '45' },
    news: [
      { tag: '转会', title: '法拉利2027赛季确认继续使用自研引擎', time: '2小时前', summary: '法拉利车队官方宣布，2027赛季将继续使用自主研发的动力单元。', expanded: false },
      { tag: '数据', title: '诺里斯成为唯一连续24站得分的现役车手', time: '6小时前', summary: '迈凯伦车手Lando Norris在每一站都获得了积分。', expanded: false },
      { tag: '新规', title: '奥迪F1车队2026赛季正式入场', time: '昨天', summary: '奥迪将于2026赛季以厂队身份进入F1。', expanded: false },
    ]
  },
  onLoad() { this.startCountdown(); this.checkCheckin(); this.checkLoot(); this.checkQuiz() },
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 0 }) },
  onShareAppMessage() { return { title: '杆位 - F1赛车竞猜', path: '/pages/index/index' } },
  onCheckin() {
    if (this.data.checkedIn) return
    const today = new Date().toDateString(); wx.setStorageSync('checkin_date', today)
    const streak = (wx.getStorageSync('checkin_streak') || 0) + 1; wx.setStorageSync('checkin_streak', streak)
    this.setData({ checkedIn: true, streak }); wx.showToast({ title: `连续${streak}天`, icon: 'success' })
  },
  checkCheckin() {
    const today = new Date().toDateString(); const last = wx.getStorageSync('checkin_date')
    if (last === today) { const streak = wx.getStorageSync('checkin_streak') || 1; this.setData({ checkedIn: true, streak }) }
  },
  checkQuiz() {
    const today = new Date().toDateString(); const last = wx.getStorageSync('quiz_date')
    if (last === today) this.setData({ quizDone: true, quizResult: { correct: wx.getStorageSync('quiz_correct')==='true' } })
  },
  pickQuiz(e) {
    if (this.data.quizDone) return
    const idx = e.currentTarget.dataset.idx
    const correct = this.data.quiz.options[idx] === this.data.quiz.answer
    wx.setStorageSync('quiz_date', new Date().toDateString()); wx.setStorageSync('quiz_correct', String(correct))
    this.setData({ quizDone: true, quizResult: { correct } })
    if (correct) wx.showToast({ title: '答对！+1分', icon: 'success' })
  },
  openLoot() {
    if (this.data.lootOpened) return
    const rewards = [{ icon:'🎉', text:'+3 积分！' },{ icon:'⭐', text:'+2 积分！' },{ icon:'💪', text:'+1 积分' },{ icon:'🏎️', text:'维斯塔潘最年轻分站冠军' },{ icon:'😊', text:'明天再来！' }]
    const r = rewards[Math.floor(Math.random()*rewards.length)]
    wx.setStorageSync('loot_date', new Date().toDateString())
    this.setData({ lootOpened: true, lootResult: r, showLootToast: true })
    setTimeout(() => this.setData({ showLootToast: false }), 2000)
  },
  checkLoot() { const today = new Date().toDateString(); if (wx.getStorageSync('loot_date') === today) this.setData({ lootOpened: true }) },
  startCountdown() {
    const target = new Date('2026-06-20T23:00:00+08:00')
    const tick = () => {
      const now = new Date(); const diff = target - now
      if (diff <= 0) { this.setData({ cd: { days:'00', hours:'00', minutes:'00' } }); return }
      const d = Math.floor(diff/86400000); const h = Math.floor((diff%86400000)/3600000); const m = Math.floor((diff%3600000)/60000)
      this.setData({ cd: { days: String(d).padStart(2,'0'), hours: String(h).padStart(2,'0'), minutes: String(m).padStart(2,'0') } })
    }
    tick(); this._timer = setInterval(tick, 30000)
  },
  onUnload() { if (this._timer) clearInterval(this._timer) },
  toggleNews(e) { const idx = e.currentTarget.dataset.idx; const news = this.data.news; news[idx].expanded = !news[idx].expanded; this.setData({ news }) },
  onPredict() { wx.navigateTo({ url: '/pages/predict/predict' }) }
})
