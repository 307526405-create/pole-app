const API = 'http://localhost:8080/api'

Page({
  data: {
    step: 0, showCelebrate: false, canSubmit: false, raceRound: 8,
    stepTitles: ['1/6 杆位', '2/6 排位赛前三（选3人）', '3/6 正赛领奖台（选3人）', '4/6 最快圈', '5/6 安全车次数', '6/6 退赛车数'],
    drivers: [], options: [],
    picks: { pole: '', podium: [], fastest: '', safety_car: '', retirements: '' }
  },
  onLoad() {
    wx.request({
      url: API + '/standings/drivers',
      success: (res) => {
        const drivers = (res.data.standings || []).map(d => ({ num: d.pos || d.number || '?', name: d.name || d.driver || 'Unknown', team: d.team || d.constructor || '', selected: false }))
        this.setData({ drivers })
      }
    })
    wx.request({ url: API + '/races', success: (res) => { const next = (res.data.races||[]).find(r => new Date(r.date) > new Date()); if (next) this.setData({ raceRound: next.round || 8 }) }})
  },
  selectDriver(e) {
    const idx = e.currentTarget.dataset.idx; const { step, drivers } = this.data
    if (step === 0 || step === 3) { drivers.forEach((d,i) => d.selected = (i === idx)); this.setData({ drivers }); setTimeout(() => this.nextStep(), 300); return }
    const sel = drivers.filter(d => d.selected).length
    if (drivers[idx].selected) { drivers[idx].selected = false } else if (sel < 3) { drivers[idx].selected = true }
    this.setData({ drivers }); if (drivers.filter(d => d.selected).length === 3) setTimeout(() => this.nextStep(), 300)
  },
  nextStep() {
    const step = this.data.step + 1
    if (step === 5) { this.setData({ step, drivers: this.data.drivers.map(d=>({...d,selected:false})), options: [{text:'0次',selected:false},{text:'1次',selected:false},{text:'2次及以上',selected:false}] }) }
    else if (step === 6) { this.setData({ step, options: [{text:'0-2辆',selected:false},{text:'3-5辆',selected:false},{text:'6辆以上',selected:false}] }) }
    else { this.setData({ step, drivers: this.data.drivers.map(d=>({...d,selected:false})) }) }
  },
  selectOption(e) {
    const idx = e.currentTarget.dataset.idx; const options = this.data.options.map((o,i) => ({...o, selected: i === idx}))
    this.setData({ options })
    setTimeout(() => { if (this.data.step === 5) { this.setData({ step: 6, options: [{text:'0-2辆',selected:false},{text:'3-5辆',selected:false},{text:'6辆以上',selected:false}] }) } else { this.setData({ canSubmit: true }) } }, 300)
  },
  submit() {
    const selDrivers = this.data.drivers.filter(d => d.selected)
    const data = {
      race_round: this.data.raceRound,
      pole: this.data.step >= 1 ? selDrivers[0]?.name || '' : '',
      podium: this.data.step >= 2 ? selDrivers.slice(0,3).map(d => d.name) : [],
      fastest_lap: this.data.step >= 4 ? selDrivers[0]?.name || '' : '',
      safety_car: this.data.options.find(o=>o.selected)?.text || '',
      retirements: this.data.options.find(o=>o.selected)?.text || ''
    }
    wx.request({
      url: API + '/predict', method: 'POST', data: { ...data, wx_openid: 'test_user' },
      success: () => {
        this.setData({ showCelebrate: true })
        setTimeout(() => { this.setData({ showCelebrate: false, step: 0, canSubmit: false, drivers: this.data.drivers.map(d=>({...d,selected:false})), options: [] }); wx.switchTab({ url: '/pages/index/index' }) }, 2000)
      }
    })
  }
})
