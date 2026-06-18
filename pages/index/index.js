Page({
  data: {
    isOffSeason: false, checkedIn: false, streak: 5, lootOpened: false, showLootToast: false,
    lootResult: { icon:'', text:'' },
    quizDone: false, quizResult: { correct: false },
    quiz: { question: '舒马赫一共拿过几个F1世界冠军？', options: ['5个','6个','7个','8个'], answer: '7个', explanation: '舒马赫生涯共获得7次F1世界冠军（1994-95, 2000-04）。' },
    trivias: ['舒马赫在2004赛季赢得了前13站中的12站。','维斯塔潘是F1最年轻的分站冠军(18岁228天)。','法拉利是唯一参加全部赛季的车队，自1950年至今。'],
    cd: { days: '09', hours: '18', minutes: '30' }, cdUrgent: false,
    news: [
      { tag: '战报', title: '西班牙站：诺里斯夺冠，维斯塔潘P2，勒克莱尔P3', time: '4天前', summary: '2026 F1西班牙大奖赛在巴塞罗那赛道落幕。Lando Norris凭借出色的轮胎管理夺得本赛季第5个分站冠军。', expanded: false },
      { tag: '转会', title: '法拉利确认2027赛季继续使用自研引擎', time: '2天前', summary: '法拉利车队官方宣布2027赛季将继续使用自主研发的动力单元。', expanded: false },
      { tag: '前瞻', title: '奥地利站前瞻：红牛环主场，维斯塔潘能否反弹？', time: '1天前', summary: '红牛环赛道是红牛车队的主场。维斯塔潘此前在此5次夺冠。', expanded: false },
    ]
  },
  onLoad() { this.startCountdown(); this.checkCheckin(); this.checkLoot(); this.checkQuiz() },
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 0 }) },
  onShareAppMessage() { return { title: '杆位 - F1赛车竞猜', path: '/pages/index/index' } },
  onCheckin() {
    if (this.data.checkedIn) return
    const today = new Date().toDateString(); wx.setStorageSync('checkin_date', today)
    const streak = (wx.getStorageSync('checkin_streak') || 0) + 1; wx.setStorageSync('checkin_streak', streak)
    this.setData({ checkedIn: true, streak })
    const msgs = { 1:'🏎️ 引擎启动！',3:'🔥 轮胎预热！',7:'⚡ DRS开启！',14:'🏆 领跑全场！',30:'👑 杆位之王！' }
    let msg = `连续${streak}天`; Object.keys(msgs).reverse().forEach(k => { if (streak >= k && !msg.includes('!')) msg = msgs[k] + ` 连续${streak}天` })
    wx.showToast({ title: msg, icon: 'success' })
  },
  checkCheckin() {
    const today = new Date().toDateString(); const last = wx.getStorageSync('checkin_date')
    if (last === today) { const streak = wx.getStorageSync('checkin_streak') || 1; this.setData({ checkedIn: true, streak }) }
  },
  checkQuiz() { const today = new Date().toDateString(); if (wx.getStorageSync('quiz_date') === today) this.setData({ quizDone: true, quizResult: { correct: wx.getStorageSync('quiz_correct')==='true' } }) },
  pickQuiz(e) {
    if (this.data.quizDone) return
    const idx = e.currentTarget.dataset.idx; const correct = this.data.quiz.options[idx] === this.data.quiz.answer
    wx.setStorageSync('quiz_date', new Date().toDateString()); wx.setStorageSync('quiz_correct', String(correct))
    this.setData({ quizDone: true, quizResult: { correct } })
    if (correct) wx.showToast({ title: '🎉 答对！+1分', icon: 'success' })
  },
  openLoot() {
    if (this.data.lootOpened) return
    const rewards = [{ icon:'🎉', text:'+3 积分！' },{ icon:'⭐', text:'+2 积分！' },{ icon:'💪', text:'+1 积分' },{ icon:'🏎️', text:'维斯塔潘最年轻分站冠军' },{ icon:'😊', text:'明天再来！' }]
    const r = rewards[Math.floor(Math.random()*rewards.length)]; wx.setStorageSync('loot_date', new Date().toDateString())
    this.setData({ lootOpened: true, lootResult: r, showLootToast: true }); setTimeout(() => this.setData({ showLootToast: false }), 2000)
  },
  checkLoot() { if (wx.getStorageSync('loot_date') === new Date().toDateString()) this.setData({ lootOpened: true }) },
  startCountdown() {
    const target = new Date('2026-06-28T15:00:00+02:00') // 奥地利站排位赛
    const tick = () => {
      const now = new Date(); const diff = target - now
      if (diff <= 0) { this.setData({ cd: { days:'00', hours:'00', minutes:'00' }, cdUrgent: false }); return }
      const d = Math.floor(diff/86400000); const h = Math.floor((diff%86400000)/3600000); const m = Math.floor((diff%3600000)/60000)
      this.setData({ cd: { days: String(d).padStart(2,'0'), hours: String(h).padStart(2,'0'), minutes: String(m).padStart(2,'0') }, cdUrgent: diff < 3*3600000 })
    }
    tick(); this._timer = setInterval(tick, 30000)
  },
  onUnload() { if (this._timer) clearInterval(this._timer) },
  toggleNews(e) { const idx = e.currentTarget.dataset.idx; const news = this.data.news; news[idx].expanded = !news[idx].expanded; this.setData({ news }) },
  onPredict() { wx.navigateTo({ url: '/pages/predict/predict' }) }
})
