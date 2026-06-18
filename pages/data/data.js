Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 }) },
  data: {
    tab: 0,
    data: [
      [{pos:1,name:'Lando Norris',team:'McLaren',pts:423},{pos:2,name:'Max Verstappen',team:'Red Bull',pts:421},{pos:3,name:'Oscar Piastri',team:'McLaren',pts:410},{pos:4,name:'George Russell',team:'Mercedes',pts:319},{pos:5,name:'Charles Leclerc',team:'Ferrari',pts:242}],
      [{pos:1,name:'McLaren',pts:833},{pos:2,name:'Mercedes',pts:467},{pos:3,name:'Ferrari',pts:465},{pos:4,name:'Red Bull Racing',pts:456},{pos:5,name:'Alpine',pts:161}],
      [{pos:1,name:'Max Verstappen',team:'Red Bull'},{pos:2,name:'Oscar Piastri',team:'McLaren'},{pos:3,name:'Lando Norris',team:'McLaren'},{pos:4,name:'Charles Leclerc',team:'Ferrari'},{pos:5,name:'George Russell',team:'Mercedes'}],
    ],
    teams: [
      {icon:'🐎',name:'Ferrari',base:'意大利马拉内罗',desc:'F1最具传奇色彩的车队，唯一全赛季参赛队伍。1950年至今从未缺席，红色跃马已成为F1的象征。',championships:'16次',wins:'245+',since:'1950年'},
      {icon:'🔴',name:'Red Bull Racing',base:'英国米尔顿凯恩斯',desc:'2005年收购捷豹车队后进入F1，凭借纽维设计的赛车和维斯塔潘的天赋，成为2020年代最具统治力的车队。',championships:'6次',wins:'120+',since:'2005年'},
      {icon:'🟠',name:'McLaren',base:'英国沃金',desc:'F1历史第二成功的车队，塞纳、普罗斯特、汉密尔顿都曾效力。2024赛季重返巅峰。',championships:'8次',wins:'185+',since:'1966年'},
      {icon:'⚫',name:'Mercedes',base:'英国布莱克利',desc:'2014-2021年间统治F1，汉密尔顿在银箭夺得6冠。2026赛季引入新规后进入调整期。',championships:'8次',wins:'125+',since:'2010年'},
    ]
  },
  switchTab(e) { this.setData({ tab: parseInt(e.currentTarget.dataset.idx) }) }
})
