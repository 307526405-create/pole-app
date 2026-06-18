Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 }) },
  data: {
    subtab: 0,
    races: [
      {flag:'🇦🇺',gp:'澳大利亚大奖赛',date:'3月8日',circuit:'阿尔伯特公园',length:'5.28km',status:'done',tag:'已结束'},
      {flag:'🇨🇳',gp:'中国大奖赛',date:'3月15日',circuit:'上海国际赛车场',length:'5.45km',status:'done',tag:'已结束'},
      {flag:'🇯🇵',gp:'日本大奖赛',date:'3月29日',circuit:'铃鹿赛道',length:'5.81km',status:'done',tag:'已结束'},
      {flag:'🇺🇸',gp:'迈阿密大奖赛',date:'5月3日',circuit:'迈阿密国际赛道',length:'5.41km',status:'done',tag:'已结束'},
      {flag:'🇨🇦',gp:'加拿大大奖赛',date:'5月24日',circuit:'维伦纽夫赛道',length:'4.36km',status:'now',tag:'进行中'},
      {flag:'🇲🇨',gp:'摩纳哥大奖赛',date:'6月7日',circuit:'蒙特卡洛赛道',length:'3.34km',status:'next',tag:'即将'},
      {flag:'🇪🇸',gp:'西班牙大奖赛',date:'6月14日',circuit:'巴塞罗那赛道',length:'4.66km',status:'next',tag:'即将'},
      {flag:'🇦🇹',gp:'奥地利大奖赛',date:'6月28日',circuit:'红牛环赛道',length:'4.32km',status:'next',tag:'即将'},
      {flag:'🇬🇧',gp:'英国大奖赛',date:'7月5日',circuit:'银石赛道',length:'5.89km',status:'next',tag:'即将'},
      {flag:'🇧🇪',gp:'比利时大奖赛',date:'7月26日',circuit:'斯帕赛道',length:'7.0km',status:'next',tag:'即将'},
      {flag:'🇭🇺',gp:'匈牙利大奖赛',date:'8月2日',circuit:'亨格罗林赛道',length:'4.38km',status:'next',tag:'即将'},
      {flag:'🇳🇱',gp:'荷兰大奖赛',date:'8月23日',circuit:'赞德沃特赛道',length:'4.26km',status:'next',tag:'即将'},
      {flag:'🇮🇹',gp:'意大利大奖赛',date:'8月30日',circuit:'蒙扎赛道',length:'5.79km',status:'next',tag:'即将'},
      {flag:'🇦🇿',gp:'阿塞拜疆大奖赛',date:'9月13日',circuit:'巴库城市赛道',length:'6.0km',status:'next',tag:'即将'},
      {flag:'🇸🇬',gp:'新加坡大奖赛',date:'9月27日',circuit:'滨海湾赛道',length:'4.94km',status:'next',tag:'即将'},
      {flag:'🇺🇸',gp:'美国大奖赛',date:'10月11日',circuit:'美洲赛道',length:'5.51km',status:'next',tag:'即将'},
      {flag:'🇲🇽',gp:'墨西哥大奖赛',date:'10月18日',circuit:'罗德里格斯赛道',length:'4.3km',status:'next',tag:'即将'},
      {flag:'🇧🇷',gp:'巴西大奖赛',date:'10月25日',circuit:'英特拉格斯赛道',length:'4.31km',status:'next',tag:'即将'},
      {flag:'🇺🇸',gp:'拉斯维加斯大奖赛',date:'11月8日',circuit:'拉斯维加斯街道',length:'6.12km',status:'next',tag:'即将'},
      {flag:'🇶🇦',gp:'卡塔尔大奖赛',date:'11月22日',circuit:'罗塞尔赛道',length:'5.38km',status:'next',tag:'即将'},
      {flag:'🇦🇪',gp:'阿布扎比大奖赛',date:'12月6日',circuit:'亚斯码头赛道',length:'5.28km',status:'next',tag:'即将'},
    ],
    standings: [
      [{pos:1,name:'Lando Norris',team:'McLaren',pts:423},{pos:2,name:'Max Verstappen',team:'Red Bull',pts:421},{pos:3,name:'Oscar Piastri',team:'McLaren',pts:410},{pos:4,name:'George Russell',team:'Mercedes',pts:319},{pos:5,name:'Charles Leclerc',team:'Ferrari',pts:242},{pos:6,name:'Lewis Hamilton',team:'Ferrari',pts:223},{pos:7,name:'Kimi Antonelli',team:'Mercedes',pts:148},{pos:8,name:'周冠宇',team:'Alpine',pts:96},{pos:9,name:'Fernando Alonso',team:'Aston Martin',pts:72},{pos:10,name:'Pierre Gasly',team:'Alpine',pts:65},{pos:11,name:'Sergio Pérez',team:'Red Bull',pts:58},{pos:12,name:'Alex Albon',team:'Williams',pts:46},{pos:13,name:'Carlos Sainz',team:'Williams',pts:42},{pos:14,name:'Yuki Tsunoda',team:'Racing Bulls',pts:38},{pos:15,name:'Esteban Ocon',team:'Haas',pts:31},{pos:16,name:'Lance Stroll',team:'Aston Martin',pts:22},{pos:17,name:'Nico Hülkenberg',team:'Sauber',pts:18},{pos:18,name:'Oliver Bearman',team:'Haas',pts:14},{pos:19,name:'Isack Hadjar',team:'Racing Bulls',pts:8},{pos:20,name:'Gabriel Bortoleto',team:'Sauber',pts:4}],
      [{pos:1,name:'McLaren',pts:833},{pos:2,name:'Mercedes',pts:467},{pos:3,name:'Ferrari',pts:465},{pos:4,name:'Red Bull Racing',pts:456},{pos:5,name:'Alpine',pts:161},{pos:6,name:'Aston Martin',pts:94},{pos:7,name:'Williams',pts:88},{pos:8,name:'Racing Bulls',pts:46},{pos:9,name:'Haas',pts:31},{pos:10,name:'Sauber',pts:18}]
    ]
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
