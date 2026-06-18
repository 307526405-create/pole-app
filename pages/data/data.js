const TEAM_LOGO = {
  'Ferrari':'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png',
  'McLaren':'https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col-retina/image.png',
  'Mercedes':'https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col-retina/image.png',
  'Red Bull':'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png',
  'Alpine':'https://media.formula1.com/content/dam/fom-website/teams/2025/alpine-logo.png.transform/2col-retina/image.png',
  'Aston Martin':'https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin-logo.png.transform/2col-retina/image.png',
}

Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 }) },
  data: {
    subtab: 0,
    teams: [
      {icon:'🐎',name:'法拉利 Ferrari',base:'意大利马拉内罗',engine:'法拉利自研',d1:'勒克莱尔 #16',d2:'汉密尔顿 #44',res:'吉奥维纳兹',desc:'F1最具传奇色彩的车队，唯一全赛季参赛。红色跃马是F1的象征。',championships:'16次',wins:'245+',since:'1950',logo:TEAM_LOGO['Ferrari'],color:'#DC0000'},
      {icon:'🟠',name:'迈凯伦 McLaren',base:'英国沃金',engine:'梅赛德斯',d1:'诺里斯 #4',d2:'皮亚斯特里 #81',res:'欧沃德',desc:'2024重返巅峰。塞纳、普罗斯特、汉密尔顿曾效力。',championships:'8次',wins:'185+',since:'1966',logo:TEAM_LOGO['McLaren'],color:'#FF8700'},
      {icon:'⚫',name:'梅赛德斯 Mercedes',base:'英国布莱克利',engine:'梅赛德斯自研',d1:'拉塞尔 #63',d2:'安东内利 #12',res:'维斯蒂',desc:'2014-21统治F1。后汉密尔顿时代新生代扛旗。',championships:'8次',wins:'125+',since:'2010',logo:TEAM_LOGO['Mercedes'],color:'#00D2BE'},
      {icon:'🔴',name:'红牛 Red Bull',base:'英国米尔顿凯恩斯',engine:'本田',d1:'维斯塔潘 #1',d2:'劳森 #30',res:'待定',desc:'纽维+维斯塔潘=2020年代最强组合。',championships:'6次',wins:'120+',since:'2005',logo:TEAM_LOGO['Red Bull'],color:'#3671C6'},
      {icon:'🔵',name:'阿尔派 Alpine',base:'法国恩斯通',engine:'雷诺自研',d1:'加斯利 #10',d2:'科拉平托 #43',res:'杜汉',desc:'雷诺厂队。2025赛季艰难重建。',championships:'2次',wins:'35+',since:'2021',logo:TEAM_LOGO['Alpine'],color:'#0090FF'},
      {icon:'🟢',name:'阿斯顿马丁 Aston Martin',base:'英国银石',engine:'梅赛德斯',d1:'阿隆索 #14',d2:'斯特罗尔 #18',res:'德鲁戈维奇',desc:'斯特罗尔入主后重金投入。',championships:'0',wins:'1+',since:'2021',logo:TEAM_LOGO['Aston Martin'],color:'#006F62'},
    ],
    drivers: [
      {num:4,name:'兰多·诺里斯',team:'迈凯伦',nationality:'🇬🇧',desc:'2024争冠选手。从游戏玩家到F1顶级车手。',championships:'0',wins:'10+',podiums:'30+',img:'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png'},
      {num:1,name:'马克斯·维斯塔潘',team:'红牛',nationality:'🇳🇱',desc:'4届世界冠军。最年轻分站冠军(18岁228天)。',championships:'4次',wins:'60+',podiums:'110+',img:'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png'},
      {num:16,name:'夏尔·勒克莱尔',team:'法拉利',nationality:'🇲🇨',desc:'法拉利当家车手。2024主场摩纳哥夺冠。',championships:'0',wins:'8+',podiums:'40+',img:'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png'},
      {num:44,name:'刘易斯·汉密尔顿',team:'法拉利',nationality:'🇬🇧',desc:'7届世界冠军。F1最成功车手之一。',championships:'7次',wins:'105+',podiums:'200+',img:'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png'},
      {num:63,name:'乔治·拉塞尔',team:'梅赛德斯',nationality:'🇬🇧',desc:'扛起后汉密尔顿时代银箭大旗。',championships:'0',wins:'5+',podiums:'20+',img:'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png'},
      {num:14,name:'费尔南多·阿隆索',team:'阿斯顿马丁',nationality:'🇪🇸',desc:'2届世界冠军。F1最年长现役。',championships:'2次',wins:'32+',podiums:'106+',img:'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col-retina/image.png'},
    ],
    circuits: [
      {flag:'🇨🇳',name:'上海国际赛车场',location:'中国上海',length:'5.45km',turns:16,drs:2,lapRecord:'1:32.238',firstGP:'2004',capacity:'20万',desc:'独特的"上"字形布局。周冠宇主场。',map:'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/China_Circuit.png.transform/7col-retina/image.png'},
      {flag:'🇯🇵',name:'铃鹿赛道',location:'日本铃鹿',length:'5.81km',turns:18,drs:1,lapRecord:'1:28.197',firstGP:'1987',capacity:'15.5万',desc:'F1唯一8字型赛道。车手最爱的赛道之一。',map:'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Japan_Circuit.png.transform/7col-retina/image.png'},
      {flag:'🇲🇨',name:'蒙特卡洛赛道',location:'摩纳哥',length:'3.34km',turns:19,drs:1,lapRecord:'1:12.909',firstGP:'1950',capacity:'3.7万',desc:'F1最具代表性的街道赛。排位赛几乎决定正赛。',map:'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monaco_Circuit.png.transform/7col-retina/image.png'},
      {flag:'🇬🇧',name:'银石赛道',location:'英国银石',length:'5.89km',turns:18,drs:2,lapRecord:'1:27.097',firstGP:'1950',capacity:'15万',desc:'F1首届比赛举办地。高速弯群是F1最美弯道。',map:'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit.png.transform/7col-retina/image.png'},
    ]
  },
  switchSub(e) { this.setData({ subtab: parseInt(e.currentTarget.dataset.idx) }) }
})
