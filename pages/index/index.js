const API = 'http://localhost:8080/api'

const RACE_CN = {
  'Australian Grand Prix':'澳大利亚大奖赛', 'Chinese Grand Prix':'中国大奖赛',
  'Japanese Grand Prix':'日本大奖赛', 'Miami Grand Prix':'迈阿密大奖赛',
  'Canadian Grand Prix':'加拿大大奖赛', 'Monaco Grand Prix':'摩纳哥大奖赛',
  'Barcelona Grand Prix':'巴塞罗那大奖赛', 'Austrian Grand Prix':'奥地利大奖赛',
  'British Grand Prix':'英国大奖赛', 'Belgian Grand Prix':'比利时大奖赛',
  'Hungarian Grand Prix':'匈牙利大奖赛', 'Dutch Grand Prix':'荷兰大奖赛',
  'Italian Grand Prix':'意大利大奖赛', 'Spanish Grand Prix':'西班牙大奖赛',
  'Azerbaijan Grand Prix':'阿塞拜疆大奖赛', 'Singapore Grand Prix':'新加坡大奖赛',
  'United States Grand Prix':'美国大奖赛', 'Mexico City Grand Prix':'墨西哥城大奖赛',
  'Brazilian Grand Prix':'巴西大奖赛', 'Las Vegas Grand Prix':'拉斯维加斯大奖赛',
  'Qatar Grand Prix':'卡塔尔大奖赛', 'Abu Dhabi Grand Prix':'阿布扎比大奖赛',
}

Page({
  data: {
    nextRace: null, lastRace: null,
    checkedIn: false, streak: 5, lootOpened: false, showLootToast: false, lootResult: {},
    quizDone: false, quizResult: {},
    quiz: { question: '舒马赫一共拿过几个F1世界冠军？', options: ['5个','6个','7个','8个'], answer: '7个', explanation: '舒马赫生涯共获得7次F1世界冠军。' },
    trivias: ['舒马赫在2004赛季赢得了前13站中的12站。','维斯塔潘是F1最年轻的分站冠军(18岁228天)。','法拉利是唯一参加全部赛季的车队。'],
    cd: { days:'00', hours:'00', minutes:'00' }, cdUrgent: false, news: []
  },
  onLoad() { this.fetchData(); this.checkCheckin(); this.checkLoot(); this.checkQuiz() },
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 0 }) },
  onShareAppMessage() { return { title: '杆位 - F1赛车竞猜', path: '/pages/index/index' } },

  fetchData() {
    wx.request({ url: API + '/races', success: (res) => {
      const races = (res.data.data||[]).map(r => ({ ...r, cn: RACE_CN[r.name] || r.name }))
      const now = new Date()
      const next = races.find(r => new Date(r.date) > now) || races[races.length-1]
      const last = races.filter(r => new Date(r.date) <= now).pop()
      this.setData({ nextRace: next || null, lastRace: last || null })
      if (next) this.startCountdown(new Date(next.date + 'T' + (next.time || '00:00:00')))
      this.setData({ news: [
        { tag: '赛事', title: (last ? last.cn + '已完赛' : '赛季即将开始'), summary: '', expanded: false },
        { tag: '前瞻', title: (next ? '下一站：' + next.cn : ''), summary: '', expanded: false },
      ]})
    }})
  },
  startCountdown(target) {
    const tick = () => {
      const now = new Date(); const diff = target - now
      if (diff <= 0) { this.setData({ cd: { days:'00', hours:'00', minutes:'00' }, cdUrgent: false }); return }
      const d = Math.floor(diff/86400000); const h = Math.floor((diff%86400000)/3600000); const m = Math.floor((diff%3600000)/60000)
      this.setData({ cd: { days: String(d).padStart(2,'0'), hours: String(h).padStart(2,'0'), minutes: String(m).padStart(2,'0') }, cdUrgent: diff < 3*3600000 })
    }
    tick(); if (this._timer) clearInterval(this._timer); this._timer = setInterval(tick, 30000)
  },
  onUnload() { if (this._timer) clearInterval(this._timer) },
  onCheckin() {
    if (this.data.checkedIn) return
    const today = new Date().toDateString(); wx.setStorageSync('checkin_date', today)
    const streak = (wx.getStorageSync('checkin_streak') || 0) + 1; wx.setStorageSync('checkin_streak', streak)
    this.setData({ checkedIn: true, streak })
    const msgs = {1:'🏎️ 引擎启动！',3:'🔥 轮胎预热！',7:'⚡ DRS开启！',14:'🏆 领跑全场！',30:'👑 杆位之王！'}
    let msg = `连续${streak}天`; Object.keys(msgs).reverse().forEach(k => { if (streak >= k) msg = msgs[k] + ` 连续${streak}天` })
    wx.showToast({ title: msg, icon: 'success' })
  },
  checkCheckin() { const today = new Date().toDateString(); if (wx.getStorageSync('checkin_date') === today) { this.setData({ checkedIn: true, streak: wx.getStorageSync('checkin_streak')||1 }) } },
  checkQuiz() { const today = new Date().toDateString(); if (wx.getStorageSync('quiz_date') === today) this.setData({ quizDone: true, quizResult: { correct: wx.getStorageSync('quiz_correct')==='true' } }) },
  pickQuiz(e) {
    if (this.data.quizDone) return; const idx = e.currentTarget.dataset.idx
    const correct = this.data.quiz.options[idx] === this.data.quiz.answer
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
  toggleNews(e) { const idx = e.currentTarget.dataset.idx; this.data.news[idx].expanded = !this.data.news[idx].expanded; this.setData({ news: this.data.news }) },
  onPredict() { wx.navigateTo({ url: '/pages/predict/predict' }) }
})
