Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 }) },
  data: {
    races: [
      {flag:'🇦🇺',gp:'澳大利亚大奖赛',date:'3月8日',circuit:'阿尔伯特公园',length:'5.3km',status:'done',tag:'已结束'},
      {flag:'🇨🇳',gp:'中国大奖赛',date:'3月15日',circuit:'上海国际赛车场',length:'5.5km',status:'done',tag:'已结束'},
      {flag:'🇯🇵',gp:'日本大奖赛',date:'3月29日',circuit:'铃鹿赛道',length:'5.8km',status:'done',tag:'已结束'},
      {flag:'🇺🇸',gp:'迈阿密大奖赛',date:'5月3日',circuit:'迈阿密国际赛道',length:'5.4km',status:'done',tag:'已结束'},
      {flag:'🇨🇦',gp:'加拿大大奖赛',date:'5月24日',circuit:'维伦纽夫赛道',length:'4.4km',status:'now',tag:'进行中'},
      {flag:'🇲🇨',gp:'摩纳哥大奖赛',date:'6月7日',circuit:'蒙特卡洛赛道',length:'3.3km',status:'next',tag:'即将'},
      {flag:'🇪🇸',gp:'西班牙大奖赛',date:'6月14日',circuit:'巴塞罗那赛道',length:'4.7km',status:'next',tag:'即将'},
      {flag:'🇦🇹',gp:'奥地利大奖赛',date:'6月28日',circuit:'红牛环赛道',length:'4.3km',status:'next',tag:'即将'},
      {flag:'🇬🇧',gp:'英国大奖赛',date:'7月5日',circuit:'银石赛道',length:'5.9km',status:'next',tag:'即将'},
      {flag:'🇧🇪',gp:'比利时大奖赛',date:'7月26日',circuit:'斯帕赛道',length:'7.0km',status:'next',tag:'即将'},
    ]
  }
})
