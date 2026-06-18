Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 }) },
  data: {
    subtab: 0,
    teams: [
      {icon:'🐎',name:'Ferrari',base:'意大利马拉内罗',desc:'F1最具传奇色彩的车队，唯一全赛季参赛。红色跃马是F1的象征。',championships:'16次',wins:'245+',since:'1950'},
      {icon:'🔴',name:'Red Bull Racing',base:'英国米尔顿凯恩斯',desc:'纽维+维斯塔潘=2020年代最强组合。',championships:'6次',wins:'120+',since:'2005'},
      {icon:'🟠',name:'McLaren',base:'英国沃金',desc:'塞纳、普罗斯特、汉密尔顿曾效力。2024重返巅峰。',championships:'8次',wins:'185+',since:'1966'},
      {icon:'⚫',name:'Mercedes',base:'英国布莱克利',desc:'2014-21统治F1。2026新规调整期。',championships:'8次',wins:'125+',since:'2010'},
      {icon:'🔵',name:'Alpine',base:'法国恩斯通',desc:'雷诺厂队，2021更名。周冠宇2025加盟。',championships:'2次',wins:'35+',since:'2021'},
      {icon:'🟢',name:'Aston Martin',base:'英国银石',desc:'斯特罗尔入主后重金投入。阿隆索加盟。',championships:'0',wins:'1+',since:'2021'},
      {icon:'⚪',name:'Williams',base:'英国格罗夫',desc:'90年代统治F1的老牌劲旅。近年重建中。',championships:'9次',wins:'114+',since:'1977'},
      {icon:'🟡',name:'Racing Bulls',base:'意大利法恩扎',desc:'红牛二队，培养维特尔、维斯塔潘等天才。',championships:'0',wins:'2+',since:'2006'},
      {icon:'⚫',name:'Haas',base:'美国坎纳波利斯',desc:'F1唯一美国车队。2026与丰田技术合作。',championships:'0',wins:'0',since:'2016'},
      {icon:'🔵',name:'Sauber',base:'瑞士辛维尔',desc:'2026奥迪收购在即。多年来为中游稳定力量。',championships:'0',wins:'1+',since:'1993'},
      {icon:'🇺🇸',name:'Cadillac',base:'美国',desc:'2026赛季作为第11支车队加入F1。通用汽车背景。',championships:'0',wins:'0',since:'2026'},
    ],
    drivers: [
      {num:4,name:'Lando Norris',team:'McLaren',desc:'2024赛季争冠选手。从游戏玩家到F1顶级车手。',championships:'0',wins:'10+',podiums:'30+'},
      {num:1,name:'Max Verstappen',team:'Red Bull',desc:'4届世界冠军。F1最年轻分站冠军纪录保持者。',championships:'4次',wins:'60+',podiums:'110+'},
      {num:16,name:'Charles Leclerc',team:'Ferrari',desc:'法拉利当家车手。摩纳哥人，2024主场夺冠。',championships:'0',wins:'8+',podiums:'40+'},
      {num:44,name:'Lewis Hamilton',team:'Ferrari',desc:'7届世界冠军。F1历史上最成功的车手之一。',championships:'7次',wins:'105+',podiums:'200+'},
      {num:24,name:'周冠宇',team:'Alpine',desc:'中国首位F1正式车手。2022巴林站首秀得分。',championships:'0',wins:'0',podiums:'0'},
      {num:63,name:'George Russell',team:'Mercedes',desc:'2025赛季扛起银箭大旗。F2冠军出身。',championships:'0',wins:'5+',podiums:'20+'},
    ],
    circuits: [
      {flag:'🇨🇳',name:'上海国际赛车场',location:'中国上海',length:'5.45km',turns:16,desc:'2004年加入F1赛历。独特的"上"字形布局。最长大直道1.2km。'},
      {flag:'🇯🇵',name:'铃鹿赛道',location:'日本铃鹿',length:'5.81km',turns:18,desc:'F1唯一8字型赛道。高速弯道著称，车手最爱的赛道之一。'},
      {flag:'🇲🇨',name:'蒙特卡洛赛道',location:'摩纳哥',length:'3.34km',turns:19,desc:'F1最具代表性的街道赛。狭窄+无缓冲区=最考验车手技术。'},
      {flag:'🇬🇧',name:'银石赛道',location:'英国银石',length:'5.89km',turns:18,desc:'1950年首届F1比赛举办地。高速弯道群+狂热英国车迷。'},
      {flag:'🇧🇪',name:'斯帕赛道',location:'比利时斯帕',length:'7.0km',turns:19,desc:'F1最长赛道之一。Eau Rouge弯是F1最著名的弯道。'},
    ]
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
