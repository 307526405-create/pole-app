const API = 'http://localhost:8080/api'
Page({
  data: { step: 0, showCelebrate: false, canSubmit: false, raceRound: 8,
    stepTitles: ['1/6 杆位', '2/6 排位赛前三（选3人）', '3/6 正赛领奖台（选3人）', '4/6 最快圈', '5/6 安全车次数', '6/6 退赛车数'],
    drivers: [], options: [],
  },
  onLoad() {
    wx.request({ url: API + '/standings/drivers', success: (res) => {
      this.setData({ drivers: (res.data.data||[]).map(d => ({ num: d.position, name: d.driver_name, team: d.constructor, selected: false })) })
    }})
    wx.request({ url: API + '/races', success: (res) => { const next = (res.data.data||[]).find(r => new Date(r.date) > new Date()); if (next) this.setData({ raceRound: next.round }) }})
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
  selectOption(e) { const idx = e.currentTarget.dataset.idx; const options = this.data.options.map((o,i) => ({...o, selected: i === idx})); this.setData({ options }); setTimeout(() => { if (this.data.step === 5) { this.setData({ step: 6, options: [{text:'0-2辆',selected:false},{text:'3-5辆',selected:false},{text:'6辆以上',selected:false}] }) } else { this.setData({ canSubmit: true }) } }, 300) },
  submit() {
    wx.request({ url: API + '/predict', method: 'POST', data: { race_round: this.data.raceRound, pole: '', podium: [], fastest_lap: '', safety_car: '', retirements: '', wx_openid: 'test' },
      success: () => { this.setData({ showCelebrate: true }); setTimeout(() => { this.setData({ showCelebrate: false, step: 0, canSubmit: false, drivers: this.data.drivers.map(d=>({...d,selected:false})), options: [] }); wx.switchTab({ url: '/pages/index/index' }) 
      // 画分享卡片
      var ctx = wx.createCanvasContext('shareCanvas', that)
      ctx.setFillStyle('#0a0a0a')
      ctx.fillRect(0, 0, 600, 400)
      // 格子旗纹理
      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 5; j++) {
          if ((i + j) % 2 === 0) {
            ctx.setFillStyle('rgba(255,255,255,0.06)')
            ctx.fillRect(i * 75, j * 80, 75, 80)
          }
        }
      }
      ctx.setFillStyle('#E10600')
      ctx.setFontSize(32)
      ctx.setTextAlign('center')
      ctx.fillText('杆位 POLE', 300, 80)
      ctx.setFillStyle('#fff')
      ctx.setFontSize(26)
      ctx.fillText('竞猜已提交', 300, 140)
      ctx.setFillStyle('#52C41A')
      ctx.setFontSize(56)
      ctx.fillText('最高可得 38 分', 300, 230)
      ctx.setFillStyle('rgba(255,255,255,0.4)')
      ctx.setFontSize(20)
      ctx.fillText('打开小程序「杆位」一起猜F1', 300, 300)
      ctx.setFillStyle('rgba(255,255,255,0.2)')
      ctx.setFontSize(16)
      ctx.fillText('微信搜索「杆位」', 300, 340)
      ctx.draw(false, function(){
        setTimeout(function(){
          wx.canvasToTempFilePath({canvasId:'shareCanvas',success:function(res){
            that.setData({shareImg:res.tempFilePath})
          },fail:function(){}}, that)
        }, 800)
      })
}, 2000);wx.showShareMenu({withShareTicket:true}) }
    })
  }
})
