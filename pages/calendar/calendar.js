Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 }) },
  data: {
    subtab: 0,
    races: [
      {flag:'🇦🇺',gp:'澳大利亚大奖赛',date:'3月8日',circuit:'阿尔伯特公园',length:'5.28km',status:'done',tag:'已结束'},
      {flag:'🇨🇳',gp:'中国大奖赛',date:'3月15日',circuit:'上海国际赛车场',length:'5.45km',status:'done',tag:'已结束'},
      {flag:'🇯🇵',gp:'日本大奖赛',date:'3月29日',circuit:'铃鹿赛道',length:'5.81km',status:'done',tag:'已结束'},
      {flag:'🇺🇸',gp:'迈阿密大奖赛',date:'5月3日',circuit:'迈阿密国际赛道',length:'5.41km',status:'done',tag:'已结束'},
      {flag:'🇨🇦',gp:'加拿大大奖赛',date:'5月24日',circuit:'维伦纽夫赛道',length:'4.36km',status:'done',tag:'已结束'},
      {flag:'🇲🇨',gp:'摩纳哥大奖赛',date:'6月7日',circuit:'蒙特卡洛赛道',length:'3.34km',status:'done',tag:'已结束'},
      {flag:'🇪🇸',gp:'西班牙大奖赛',date:'6月14日',circuit:'巴塞罗那赛道',length:'4.66km',status:'done',tag:'已结束'},
      {flag:'🇦🇹',gp:'奥地利大奖赛',date:'6月28日',circuit:'红牛环赛道',length:'4.32km',status:'now',tag:'进行中'},
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
      [
        {pos:1,name:'兰多·诺里斯',team:'迈凯伦',pts:423},{pos:2,name:'马克斯·维斯塔潘',team:'红牛',pts:421},
        {pos:3,name:'奥斯卡·皮亚斯特里',team:'迈凯伦',pts:410},{pos:4,name:'乔治·拉塞尔',team:'梅赛德斯',pts:319},
        {pos:5,name:'夏尔·勒克莱尔',team:'法拉利',pts:242},{pos:6,name:'刘易斯·汉密尔顿',team:'法拉利',pts:156},
        {pos:7,name:'安德烈亚·基米·安东内利',team:'梅赛德斯',pts:150},{pos:8,name:'亚历山大·阿尔本',team:'威廉姆斯',pts:73},
        {pos:9,name:'卡洛斯·赛恩斯',team:'威廉姆斯',pts:64},{pos:10,name:'费尔南多·阿隆索',team:'阿斯顿马丁',pts:56},
        {pos:11,name:'尼科·霍肯伯格',team:'索伯',pts:51},{pos:12,name:'伊萨克·哈贾尔',team:'小红牛',pts:51},
        {pos:13,name:'奥利弗·贝尔曼',team:'哈斯',pts:41},{pos:14,name:'利亚姆·劳森',team:'红牛',pts:38},
        {pos:15,name:'埃斯特班·奥康',team:'哈斯',pts:38},{pos:16,name:'兰斯·斯特罗尔',team:'阿斯顿马丁',pts:33},
        {pos:17,name:'角田裕毅',team:'小红牛',pts:33},{pos:18,name:'皮埃尔·加斯利',team:'阿尔派',pts:22},
        {pos:19,name:'加布里埃尔·博托莱托',team:'索伯',pts:19},{pos:20,name:'弗朗哥·科拉平托',team:'阿尔派',pts:0},
        {pos:21,name:'杰克·杜汉',team:'阿尔派',pts:0}
      ],
      [
        {pos:1,name:'迈凯伦 McLaren',pts:833},{pos:2,name:'梅赛德斯 Mercedes',pts:469},
        {pos:3,name:'红牛 Red Bull',pts:451},{pos:4,name:'法拉利 Ferrari',pts:398},
        {pos:5,name:'威廉姆斯 Williams',pts:137},{pos:6,name:'小红牛 RB',pts:92},
        {pos:7,name:'阿斯顿马丁 Aston Martin',pts:89},{pos:8,name:'哈斯 Haas',pts:79},
        {pos:9,name:'索伯 Sauber',pts:70},{pos:10,name:'阿尔派 Alpine',pts:22}
      ]
    ]
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
