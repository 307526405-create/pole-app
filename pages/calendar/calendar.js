Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 }) },
  data: {
    subtab: 0,
    races: [
      {flag:'🇦🇺',gp:'澳大利亚大奖赛',date:'3月8日',circuit:'阿尔伯特公园',length:'5.3km',status:'done',tag:'已结束'},
      {flag:'🇨🇳',gp:'中国大奖赛',date:'3月15日',circuit:'上海国际赛车场',length:'5.5km',status:'done',tag:'已结束'},
      {flag:'🇯🇵',gp:'日本大奖赛',date:'3月29日',circuit:'铃鹿赛道',length:'5.8km',status:'done',tag:'已结束'},
      {flag:'🇺🇸',gp:'迈阿密大奖赛',date:'5月3日',circuit:'迈阿密国际赛道',length:'5.4km',status:'done',tag:'已结束'},
      {flag:'🇨🇦',gp:'加拿大大奖赛',date:'5月24日',circuit:'维伦纽夫赛道',length:'4.4km',status:'now',tag:'进行中'},
      {flag:'🇲🇨',gp:'摩纳哥大奖赛',date:'6月7日',circuit:'蒙特卡洛赛道',length:'3.3km',status:'next',tag:'即将'},
      {flag:'🇪🇸',gp:'西班牙大奖赛',date:'6月14日',circuit:'巴塞罗那赛道',length:'4.7km',status:'next',tag:'即将'},
    ],
    standings: [
      [{pos:1,name:'Lando Norris',team:'McLaren',pts:423},{pos:2,name:'Max Verstappen',team:'Red Bull',pts:421},{pos:3,name:'Oscar Piastri',team:'McLaren',pts:410},{pos:4,name:'George Russell',team:'Mercedes',pts:319},{pos:5,name:'Charles Leclerc',team:'Ferrari',pts:242},{pos:6,name:'Lewis Hamilton',team:'Ferrari',pts:223},{pos:7,name:'Kimi Antonelli',team:'Mercedes',pts:148},{pos:8,name:'周冠宇',team:'Alpine',pts:96}],
      [{pos:1,name:'McLaren',pts:833},{pos:2,name:'Mercedes',pts:467},{pos:3,name:'Ferrari',pts:465},{pos:4,name:'Red Bull Racing',pts:456},{pos:5,name:'Alpine',pts:161}]
    ]
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
