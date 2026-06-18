Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 }) },
  data: {
    subtab: 0,
    teams: [
      {icon:'🐎',name:'Ferrari',base:'意大利马拉内罗',engine:'法拉利自研',d1:'Charles Leclerc',d2:'Lewis Hamilton',res:'Antonio Giovinazzi',desc:'F1最具传奇色彩的车队，唯一全赛季参赛。红色跃马是F1的象征。',championships:'16次',wins:'245+',since:'1950'},
      {icon:'🟠',name:'McLaren',base:'英国沃金',engine:'梅赛德斯',d1:'Lando Norris',d2:'Oscar Piastri',res:'Pato O\'Ward',desc:'2024赛季重返巅峰。塞纳、普罗斯特、汉密尔顿都曾效力。',championships:'8次',wins:'185+',since:'1966'},
      {icon:'⚫',name:'Mercedes',base:'英国布莱克利',engine:'梅赛德斯自研',d1:'George Russell',d2:'Kimi Antonelli',res:'Frederik Vesti',desc:'2014-21年间统治F1，汉密尔顿在银箭夺得6冠。2026进入调整期。',championships:'8次',wins:'125+',since:'2010'},
      {icon:'🔴',name:'Red Bull Racing',base:'英国米尔顿凯恩斯',engine:'本田',d1:'Max Verstappen',d2:'Sergio Pérez',res:'Liam Lawson',desc:'纽维设计的赛车+维斯塔潘的天赋=2020年代最具统治力的组合。',championships:'6次',wins:'120+',since:'2005'},
      {icon:'🔵',name:'Alpine',base:'法国恩斯通',engine:'雷诺自研',d1:'Pierre Gasly',d2:'周冠宇',res:'Jack Doohan',desc:'雷诺厂队，2021更名Alpine。周冠宇2025赛季加盟，中国车迷主场。',championships:'2次',wins:'35+',since:'2021'},
      {icon:'🟢',name:'Aston Martin',base:'英国银石',engine:'梅赛德斯',d1:'Fernando Alonso',d2:'Lance Stroll',res:'Felipe Drugovich',desc:'劳伦斯·斯特罗尔入主后重金投入。阿隆索的丰富经验是核心资产。',championships:'0',wins:'1+',since:'2021'},
      {icon:'⚪',name:'Williams',base:'英国格罗夫',engine:'梅赛德斯',d1:'Alex Albon',d2:'Carlos Sainz',res:'Franco Colapinto',desc:'90年代统治F1的老牌劲旅。近年重建中，赛恩斯加盟注入新希望。',championships:'9次',wins:'114+',since:'1977'},
      {icon:'🟡',name:'Racing Bulls',base:'意大利法恩扎',engine:'本田',d1:'Yuki Tsunoda',d2:'Isack Hadjar',res:'Ayumu Iwasa',desc:'红牛二队。培养过维特尔、维斯塔潘等天才车手。',championships:'0',wins:'2+',since:'2006'},
      {icon:'⚪',name:'Haas',base:'美国坎纳波利斯',engine:'法拉利',d1:'Esteban Ocon',d2:'Oliver Bearman',res:'Pietro Fittipaldi',desc:'F1唯一美国车队。2026赛季与丰田建立技术合作。',championships:'0',wins:'0',since:'2016'},
      {icon:'🔵',name:'Sauber',base:'瑞士辛维尔',engine:'法拉利',d1:'Nico Hülkenberg',d2:'Gabriel Bortoleto',res:'Théo Pourchaire',desc:'2026赛季后将被奥迪收购。中游稳定力量。',championships:'0',wins:'1+',since:'1993'},
      {icon:'🇺🇸',name:'Cadillac F1',base:'美国印第安纳',engine:'通用汽车',d1:'待定',d2:'待定',res:'待定',desc:'2026赛季作为第11支车队加入F1。通用汽车旗下品牌。',championships:'0',wins:'0',since:'2026'},
    ],
    drivers: [
      {num:4,name:'Lando Norris',team:'McLaren',nationality:'🇬🇧 英国',desc:'2024赛季争冠选手。从游戏玩家到F1顶级车手的励志故事。2025赛季积分榜领先。',championships:'0',wins:'10+',podiums:'30+'},
      {num:1,name:'Max Verstappen',team:'Red Bull',nationality:'🇳🇱 荷兰',desc:'4届世界冠军。F1最年轻分站冠军纪录保持者(18岁228天)。2025赛季激战诺里斯。',championships:'4次',wins:'60+',podiums:'110+'},
      {num:81,name:'Oscar Piastri',team:'McLaren',nationality:'🇦🇺 澳大利亚',desc:'2023赛季首秀即展现惊人天赋。2025赛季多次夺冠。未来世界冠军热门。',championships:'0',wins:'8+',podiums:'25+'},
      {num:16,name:'Charles Leclerc',team:'Ferrari',nationality:'🇲🇨 摩纳哥',desc:'法拉利当家车手。2024赛季主场摩纳哥夺冠圆梦。2025与汉密尔顿组成超级搭档。',championships:'0',wins:'8+',podiums:'40+'},
      {num:44,name:'Lewis Hamilton',team:'Ferrari',nationality:'🇬🇧 英国',desc:'7届世界冠军。F1历史上最成功的车手之一。2025赛季加盟法拉利开启新篇章。',championships:'7次',wins:'105+',podiums:'200+'},
      {num:63,name:'George Russell',team:'Mercedes',nationality:'🇬🇧 英国',desc:'扛起后汉密尔顿时代的银箭大旗。F2冠军出身，2025赛季表现稳健。',championships:'0',wins:'5+',podiums:'20+'},
      {num:24,name:'周冠宇',team:'Alpine',nationality:'🇨🇳 中国',desc:'中国首位F1正式车手。2022巴林站首秀即得分。2025赛季加盟Alpine。',championships:'0',wins:'0',podiums:'0'},
      {num:14,name:'Fernando Alonso',team:'Aston Martin',nationality:'🇪🇸 西班牙',desc:'2届世界冠军。F1最年长现役车手。43岁仍保持顶级竞争力。',championships:'2次',wins:'32+',podiums:'106+'},
      {num:11,name:'Sergio Pérez',team:'Red Bull',nationality:'🇲🇽 墨西哥',desc:'经验丰富的二号车手。多次在关键时刻为红牛贡献领奖台。',championships:'0',wins:'6+',podiums:'39+'},
      {num:55,name:'Carlos Sainz',team:'Williams',nationality:'🇪🇸 西班牙',desc:'2025赛季从法拉利转会威廉姆斯。稳定可靠的顶尖中游车手。',championships:'0',wins:'4+',podiums:'25+'},
      {num:10,name:'Pierre Gasly',team:'Alpine',nationality:'🇫🇷 法国',desc:'2020蒙扎奇迹夺冠。法国车手代表，2025与周冠宇搭档。',championships:'0',wins:'1+',podiums:'5+'},
      {num:12,name:'Kimi Antonelli',team:'Mercedes',nationality:'🇮🇹 意大利',desc:'18岁天才少年。跳过F3直接进入F1，被誉为"下一个维斯塔潘"。',championships:'0',wins:'2+',podiums:'8+'},
    ],
    circuits: [
      {flag:'🇨🇳',name:'上海国际赛车场',location:'中国上海',length:'5.45km',turns:16,drs:2,lapRecord:'1:32.238',firstGP:'2004',capacity:'20万',desc:'独特的"上"字形布局。1.2km的超长直道是F1最长之一。2004年加入赛历，周冠宇主场。'},
      {flag:'🇯🇵',name:'铃鹿赛道',location:'日本铃鹿',length:'5.81km',turns:18,drs:1,lapRecord:'1:28.197',firstGP:'1987',capacity:'15.5万',desc:'F1唯一的8字型赛道。S弯、邓禄普弯、130R高速弯，车手最爱的赛道之一。'},
      {flag:'🇲🇨',name:'蒙特卡洛赛道',location:'摩纳哥',length:'3.34km',turns:19,drs:1,lapRecord:'1:12.909',firstGP:'1950',capacity:'3.7万',desc:'F1最具代表性的街道赛。极窄+无缓冲区=最考验车手技术。周六排位赛几乎决定周日结果。'},
      {flag:'🇬🇧',name:'银石赛道',location:'英国银石',length:'5.89km',turns:18,drs:2,lapRecord:'1:27.097',firstGP:'1950',capacity:'15万',desc:'1950年F1首届比赛举办地。Maggots-Becketts-Chapel高速弯群是F1最美弯道。'},
      {flag:'🇧🇪',name:'斯帕赛道',location:'比利时斯帕',length:'7.0km',turns:19,drs:2,lapRecord:'1:46.286',firstGP:'1950',capacity:'7万',desc:'F1最长赛道之一。Eau Rouge-Raidillon连续弯是F1最著名最具挑战性的弯道。'},
      {flag:'🇮🇹',name:'蒙扎赛道',location:'意大利蒙扎',length:'5.79km',turns:11,drs:2,lapRecord:'1:21.046',firstGP:'1950',capacity:'11.8万',desc:'"速度圣殿"。F1全年最高速赛道，极速可达360km/h+。法拉利主场，Tifosi海洋。'},
      {flag:'🇸🇬',name:'滨海湾赛道',location:'新加坡',length:'4.94km',turns:19,drs:2,lapRecord:'1:41.905',firstGP:'2008',capacity:'9万',desc:'F1首场夜赛。23个弯道是全年最多。高温高湿=对车手体能最极限的考验。'},
      {flag:'🇦🇪',name:'亚斯码头赛道',location:'阿布扎比',length:'5.28km',turns:16,drs:2,lapRecord:'1:26.103',firstGP:'2009',capacity:'6万',desc:'F1赛季收官战。黄昏起跑的昼夜转换赛是独特景观。2021维斯塔潘在此夺冠封王。'},
    ]
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
