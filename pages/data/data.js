Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 }) },
  data: {
    subtab: 0,
    teams: [
      {icon:'🐎',name:'法拉利 Ferrari',base:'意大利马拉内罗',engine:'法拉利自研',d1:'勒克莱尔 Leclerc #16',d2:'汉密尔顿 Hamilton #44',res:'吉奥维纳兹 Giovinazzi',desc:'F1最具传奇色彩的车队，唯一全赛季参赛。红色跃马是F1的象征。',championships:'16次',wins:'245+',since:'1950'},
      {icon:'🟠',name:'迈凯伦 McLaren',base:'英国沃金',engine:'梅赛德斯',d1:'诺里斯 Norris #4',d2:'皮亚斯特里 Piastri #81',res:'欧沃德 O\'Ward',desc:'2024赛季重返巅峰。塞纳、普罗斯特、汉密尔顿都曾效力。',championships:'8次',wins:'185+',since:'1966'},
      {icon:'⚫',name:'梅赛德斯 Mercedes',base:'英国布莱克利',engine:'梅赛德斯自研',d1:'拉塞尔 Russell #63',d2:'安东内利 Antonelli #12',res:'维斯蒂 Vesti',desc:'2014-21年间统治F1。后汉密尔顿时代由拉塞尔+新星安东内利扛旗。',championships:'8次',wins:'125+',since:'2010'},
      {icon:'🔴',name:'红牛 Red Bull Racing',base:'英国米尔顿凯恩斯',engine:'本田',d1:'维斯塔潘 Verstappen #1',d2:'佩雷兹 Pérez #11',res:'劳森 Lawson',desc:'纽维设计的赛车+维斯塔潘的天赋=2020年代最具统治力的组合。',championships:'6次',wins:'120+',since:'2005'},
      {icon:'🔵',name:'阿尔派 Alpine',base:'法国恩斯通',engine:'雷诺自研',d1:'加斯利 Gasly #10',d2:'周冠宇 Zhou #24',res:'杜汉 Doohan',desc:'雷诺厂队，2021更名Alpine。周冠宇2025赛季加盟，中国车迷主场。',championships:'2次',wins:'35+',since:'2021'},
      {icon:'🟢',name:'阿斯顿马丁 Aston Martin',base:'英国银石',engine:'梅赛德斯',d1:'阿隆索 Alonso #14',d2:'斯特罗尔 Stroll #18',res:'德鲁戈维奇 Drugovich',desc:'劳伦斯·斯特罗尔入主后重金投入。阿隆索的丰富经验是核心资产。',championships:'0',wins:'1+',since:'2021'},
      {icon:'⚪',name:'威廉姆斯 Williams',base:'英国格罗夫',engine:'梅赛德斯',d1:'阿尔本 Albon #23',d2:'赛恩斯 Sainz #55',res:'科拉平托 Colapinto',desc:'90年代统治F1的老牌劲旅。赛恩斯加盟注入新希望。',championships:'9次',wins:'114+',since:'1977'},
      {icon:'🟡',name:'小红牛 Racing Bulls',base:'意大利法恩扎',engine:'本田',d1:'角田裕毅 Tsunoda #22',d2:'哈贾尔 Hadjar #6',res:'岩佐步梦 Iwasa',desc:'红牛二队。培养过维特尔、维斯塔潘等天才。日本车手角田裕毅领军。',championships:'0',wins:'2+',since:'2006'},
      {icon:'⚪',name:'哈斯 Haas',base:'美国坎纳波利斯',engine:'法拉利',d1:'奥康 Ocon #31',d2:'贝尔曼 Bearman #87',res:'菲蒂帕尔迪 Fittipaldi',desc:'F1唯一美国车队。2026赛季与丰田建立技术合作。',championships:'0',wins:'0',since:'2016'},
      {icon:'🔵',name:'索伯 Sauber',base:'瑞士辛维尔',engine:'法拉利',d1:'霍肯伯格 Hülkenberg #27',d2:'博托莱托 Bortoleto #5',res:'波谢尔 Pourchaire',desc:'2026赛季后将被奥迪收购。霍肯伯格带来丰富经验。',championships:'0',wins:'1+',since:'1993'},
      {icon:'🇺🇸',name:'凯迪拉克 Cadillac F1',base:'美国印第安纳',engine:'通用汽车',d1:'待定',d2:'待定',res:'待定',desc:'2026赛季作为第11支车队加入F1。通用汽车旗下品牌首秀。',championships:'0',wins:'0',since:'2026'},
    ],
    drivers: [
      {num:4,name:'兰多·诺里斯',team:'迈凯伦 McLaren',nationality:'🇬🇧',desc:'2024赛季争冠选手。从游戏玩家到F1顶级车手。2025赛季积分榜领先。',championships:'0',wins:'10+',podiums:'30+'},
      {num:1,name:'马克斯·维斯塔潘',team:'红牛 Red Bull',nationality:'🇳🇱',desc:'4届世界冠军。最年轻分站冠军(18岁228天)。2025赛季与诺里斯激战。',championships:'4次',wins:'60+',podiums:'110+'},
      {num:81,name:'奥斯卡·皮亚斯特里',team:'迈凯伦 McLaren',nationality:'🇦🇺',desc:'2023首秀即展现惊人天赋。2025多次夺冠。未来世界冠军热门。',championships:'0',wins:'8+',podiums:'25+'},
      {num:16,name:'夏尔·勒克莱尔',team:'法拉利 Ferrari',nationality:'🇲🇨',desc:'法拉利当家车手。2024主场摩纳哥夺冠圆梦。2025与汉密尔顿搭档。',championships:'0',wins:'8+',podiums:'40+'},
      {num:44,name:'刘易斯·汉密尔顿',team:'法拉利 Ferrari',nationality:'🇬🇧',desc:'7届世界冠军。F1历史上最成功的车手之一。2025加盟法拉利。',championships:'7次',wins:'105+',podiums:'200+'},
      {num:63,name:'乔治·拉塞尔',team:'梅赛德斯 Mercedes',nationality:'🇬🇧',desc:'扛起后汉密尔顿时代银箭大旗。F2冠军出身，表现稳健。',championships:'0',wins:'5+',podiums:'20+'},
      {num:24,name:'周冠宇',team:'阿尔派 Alpine',nationality:'🇨🇳',desc:'中国首位F1正式车手。2022巴林首秀得分。2025加盟Alpine。',championships:'0',wins:'0',podiums:'0'},
      {num:14,name:'费尔南多·阿隆索',team:'阿斯顿马丁 Aston Martin',nationality:'🇪🇸',desc:'2届世界冠军。F1最年长现役车手。43岁仍保持顶级竞争力。',championships:'2次',wins:'32+',podiums:'106+'},
      {num:11,name:'塞尔吉奥·佩雷兹',team:'红牛 Red Bull',nationality:'🇲🇽',desc:'经验丰富的二号车手。多次关键时刻贡献领奖台。',championships:'0',wins:'6+',podiums:'39+'},
      {num:55,name:'卡洛斯·赛恩斯',team:'威廉姆斯 Williams',nationality:'🇪🇸',desc:'2025从法拉利转会威廉姆斯。稳定可靠的顶尖中游车手。',championships:'0',wins:'4+',podiums:'25+'},
      {num:10,name:'皮埃尔·加斯利',team:'阿尔派 Alpine',nationality:'🇫🇷',desc:'2020蒙扎奇迹夺冠。法国车手代表，2025与周冠宇搭档。',championships:'0',wins:'1+',podiums:'5+'},
      {num:12,name:'基米·安东内利',team:'梅赛德斯 Mercedes',nationality:'🇮🇹',desc:'18岁天才少年。跳级进入F1，被称为"下一个维斯塔潘"。',championships:'0',wins:'2+',podiums:'8+'},
    ],
    circuits: [
      {flag:'🇨🇳',name:'上海国际赛车场',location:'中国上海',length:'5.45km',turns:16,drs:2,lapRecord:'1:32.238',firstGP:'2004',capacity:'20万',desc:'独特的"上"字形布局。1.2km超长直道是F1最长之一。周冠宇主场。'},
      {flag:'🇯🇵',name:'铃鹿赛道',location:'日本铃鹿',length:'5.81km',turns:18,drs:1,lapRecord:'1:28.197',firstGP:'1987',capacity:'15.5万',desc:'F1唯一8字型赛道。S弯+130R高速弯。车手最爱的赛道之一。'},
      {flag:'🇲🇨',name:'蒙特卡洛赛道',location:'摩纳哥',length:'3.34km',turns:19,drs:1,lapRecord:'1:12.909',firstGP:'1950',capacity:'3.7万',desc:'F1最具代表性的街道赛。极窄+无缓冲区=最考验技术。排位赛几乎决定正赛。'},
      {flag:'🇬🇧',name:'银石赛道',location:'英国银石',length:'5.89km',turns:18,drs:2,lapRecord:'1:27.097',firstGP:'1950',capacity:'15万',desc:'1950年F1首届比赛举办地。Maggots-Becketts-Chapel是F1最美弯道群。'},
      {flag:'🇧🇪',name:'斯帕赛道',location:'比利时斯帕',length:'7.0km',turns:19,drs:2,lapRecord:'1:46.286',firstGP:'1950',capacity:'7万',desc:'F1最长赛道之一。Eau Rouge弯是F1最具挑战性的弯道。'},
      {flag:'🇮🇹',name:'蒙扎赛道',location:'意大利蒙扎',length:'5.79km',turns:11,drs:2,lapRecord:'1:21.046',firstGP:'1950',capacity:'11.8万',desc:'"速度圣殿"。F1全年最高速赛道，极速可达360km/h+。法拉利主场。'},
      {flag:'🇸🇬',name:'滨海湾赛道',location:'新加坡',length:'4.94km',turns:19,drs:2,lapRecord:'1:41.905',firstGP:'2008',capacity:'9万',desc:'F1首场夜赛。23个弯道全年最多。高温高湿=体能极限考验。'},
      {flag:'🇦🇪',name:'亚斯码头赛道',location:'阿布扎比',length:'5.28km',turns:16,drs:2,lapRecord:'1:26.103',firstGP:'2009',capacity:'6万',desc:'F1赛季收官战。黄昏起跑的昼夜转换。2021维斯塔潘封王之地。'},
    ]
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
