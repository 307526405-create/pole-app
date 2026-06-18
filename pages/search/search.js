const API = 'http://localhost:8080/api'
Page({
  data: { keyword: '', results: [] },
  onInput(e) {
    const kw = e.detail.value
    this.setData({ keyword: kw })
    if (!kw) { this.setData({ results: [] }); return }
    // 从后端搜车手
    wx.request({
      url: API + '/standings/drivers',
      success: (res) => {
        const data = res.data.data || []
        const results = data.filter(d => 
          (d.driver_name||'').toLowerCase().includes(kw.toLowerCase()) ||
          (d.constructor||'').toLowerCase().includes(kw.toLowerCase())
        ).map(d => ({ name: d.driver_name, sub: d.constructor }))
        this.setData({ results })},fail:function(){wx.showToast({title:"搜索失败",icon:"none"})}
      }
    })
  },
  onBack() { wx.navigateBack() }
})
