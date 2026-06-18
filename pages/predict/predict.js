Page({
  data: {
    step: 0,
    stepTitles: ['1/6 杆位', '2/6 排位赛前三（选3人）', '3/6 正赛领奖台（选3人）', '4/6 最快圈', '5/6 安全车次数', '6/6 退赛车数'],
    canSubmit: false,
    drivers: [
      {num:1,name:'Max Verstappen',team:'Red Bull',selected:false},
      {num:4,name:'Lando Norris',team:'McLaren',selected:false},
      {num:81,name:'Oscar Piastri',team:'McLaren',selected:false},
      {num:16,name:'Charles Leclerc',team:'Ferrari',selected:false},
      {num:44,name:'Lewis Hamilton',team:'Ferrari',selected:false},
      {num:63,name:'George Russell',team:'Mercedes',selected:false},
      {num:24,name:'周冠宇',team:'Alpine',selected:false},
      {num:11,name:'Sergio Pérez',team:'Red Bull',selected:false},
      {num:14,name:'Fernando Alonso',team:'Aston Martin',selected:false},
      {num:10,name:'Pierre Gasly',team:'Alpine',selected:false},
    ],
    options: [],
  },
  selectDriver(e) {
    const idx = e.currentTarget.dataset.idx
    const { step, drivers } = this.data
    
    // 步骤1(杆位)和步骤3(最快圈)：单选，自动下一步
    if (step === 0 || step === 3) {
      drivers.forEach((d,i) => d.selected = (i === idx))
      this.setData({ drivers })
      setTimeout(() => this.nextStep(), 300)
      return
    }
    
    // 步骤2(排位前三)和步骤4(领奖台)：多选3人
    const sel = drivers.filter(d => d.selected).length
    if (drivers[idx].selected) { drivers[idx].selected = false }
    else if (sel < 3) { drivers[idx].selected = true }
    this.setData({ drivers })
    if (drivers.filter(d => d.selected).length === 3) {
      setTimeout(() => this.nextStep(), 300)
    }
  },
  
  nextStep() {
    const step = this.data.step + 1
    
    if (step === 5) {
      // 安全车次数
      this.setData({ step, drivers: this.data.drivers.map(d=>({...d,selected:false})),
        options: [{text:'0次',selected:false},{text:'1次',selected:false},{text:'2次及以上',selected:false}] })
    } else if (step === 6) {
      // 退赛车数
      this.setData({ step,
        options: [{text:'0-2辆',selected:false},{text:'3-5辆',selected:false},{text:'6辆以上',selected:false}] })
    } else if (step >= 3 && step < 5) {
      // 最快圈/领奖台，重置选择
      this.setData({ step, drivers: this.data.drivers.map(d=>({...d,selected:false})) })
    } else {
      this.setData({ step, drivers: this.data.drivers.map(d=>({...d,selected:false})) })
    }
  },
  
  selectOption(e) {
    const idx = e.currentTarget.dataset.idx
    const options = this.data.options.map((o,i) => ({...o, selected: i === idx}))
    this.setData({ options })
    setTimeout(() => {
      if (this.data.step === 5) {
        // 安全车完→退赛
        this.setData({ step: 6, options: [{text:'0-2辆',selected:false},{text:'3-5辆',selected:false},{text:'6辆以上',selected:false}] })
      } else {
        this.setData({ canSubmit: true })
      }
    }, 300)
  },
  
  submit() {
    wx.showToast({ title: '竞猜已提交！', icon: 'success' })
    setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 1500)
  }
})
