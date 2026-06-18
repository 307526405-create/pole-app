Page({
  data: {
    step: 0,
    stepTitles: ['杆位预测', '领奖台预测（选3人）', '最快圈预测'],
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
    ],
  },
  selectDriver(e) {
    const idx = e.currentTarget.dataset.idx
    const { step, drivers } = this.data
    
    if (step === 1) {
      // 选领奖台，可多选3人
      const sel = drivers.filter(d => d.selected).length
      if (drivers[idx].selected) { drivers[idx].selected = false }
      else if (sel < 3) { drivers[idx].selected = true }
      this.setData({ drivers, canSubmit: drivers.filter(d => d.selected).length === 3 })
      return
    }
    
    // 杆位/最快圈：单选，自动下一步
    drivers.forEach((d,i) => d.selected = (i === idx))
    this.setData({ drivers })
    setTimeout(() => { 
      if (step < 2) {
        this.setData({ step: step + 1, drivers: drivers.map(d => ({...d, selected: false})), canSubmit: false })
      } else {
        this.setData({ canSubmit: true })
      }
    }, 300)
  },
  submit() {
    wx.showToast({ title: '竞猜已提交', icon: 'success' })
    setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 1500)
  }
})
