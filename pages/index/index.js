const API = 'http://localhost:8080/api'

Page({
  data: {
    isOffSeason: false, checkedIn: false, streak: 5, lootOpened: false, showLootToast: false,
    lootResult: { icon:'', text:'' },
    quizDone: false, quizResult: { correct: false },
    quiz: { question: '舒马赫一共拿过几个F1世界冠军？', options: ['5个','6个','7个','8个'], answer: '7个', explanation: '舒马赫生涯共获得7次F1世界冠军。' },
    trivias: ['舒马赫在2004赛季赢得了前13站中的12站。','维斯塔潘是F1最年轻的分站冠军(18岁228天)。','法拉利是唯一参加全部赛季的车队。'],
    nextRace: null, cd: { days:'00', hours:'00', minutes:'00' }, cdUrgent: false,
    lastResult: null, news: []
  },
  onLoad() {
    this.fetchRaceData()
    this.checkCheckin(); this.checkLoot(); this.checkQuiz()
  },
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 0 }) },
  onShareAppMessage() { return { title: '杆位 - F1赛车竞猜', path: '/pages/index/index' } },

  fetchRaceData() {
    wx.request({
      url: API + '/races',
      success: (res) => {
        const races = res.data.races || []
        const now = new Date()
        // 找下一站（最近的未来比赛）
        const next = races.find(r => new Date(r.date) > now) || races[races.length-1]
        const last = races.filter(r => new Date(r.date) <= now).pop()
        
        this.setData({
          nextRace: next,
          lastRace: last,
          news: [
            { tag: '赛事', title: (last ? last.gp + '已完赛' : '赛季即将开始'), time: last ? last.date : '', summary: '', expanded: false },
            { tag: '前瞻', title: (next ? '下一站：' + next.gp + ' · ' + next.circuit : ''), time: next ? next.date : '', summary: '', expanded: false },
          ]
        })
        if (next) this.startCountdown(new Date(next.qualifying || next.date))
      }
    })
  },

  startCountdown(target) {
    const tick = () => {
      const now = new Date(); const diff = target - now
      if (diff <= 0) { this.setData({ cd: { days:'00', hours:'00', minutes:'00' }, cdUrgent: false }); return }
      const d = Math.floor(diff/86400000); const h = Math.floor((diff%86400000)/3600000); const m = Math.floor((diff%3600000)/60000)
      this.setData({ cd: { days: String(d).padStart(2,'0'), hours: String(h).padStart(2,'0'), minutes: String(m).padStart(2,'0') }, cdUrgent: diff < 3*3600000 })
    }
    tick(); this._timer = setInterval(tick, 30000)
  },
  onUnload() { if (this._timer) clearInterval(this._timer) },

  onCheckin() {
    if (this.data.checkedIn) return
    const today = new Date().toDateString(); wx.setStorageSync('checkin_date', today)
    const streak = (wx.getStorageSync('checkin_streak') || 0) + 1; wx.setStorageSync('checkin_streak', streak)
    this.setData({ checkedIn: true, streak })
    const msgs = {1:'🏎️ 引擎启动！',3:'🔥 轮胎预热！',7:'⚡ DRS开启！',14:'🏆 领跑全场！',30:'👑 杆位之王！'}
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
    const rewards = [{ icon:'🎉', text:'+3 积分！' },{ icon:'⭐', text:'+2 积分！' },{ icon:'💪', text:'+1 积分' }]
    const r = rewards[Math.floor(Math.random()*rewards.length)]; wx.setStorageSync('loot_date', new Date().toDateString())
    this.setData({ lootOpened: true, lootResult: r, showLootToast: true }); setTimeout(() => this.setData({ showLootToast: false }), 2000)
  },
  checkLoot() { if (wx.getStorageSync('loot_date') === new Date().toDateString()) this.setData({ lootOpened: true }) },
  toggleNews(e) { const idx = e.currentTarget.dataset.idx; const news = this.data.news; news[idx].expanded = !news[idx].expanded; this.setData({ news }) },
  onPredict() { wx.navigateTo({ url: '/pages/predict/predict' }) }
})
