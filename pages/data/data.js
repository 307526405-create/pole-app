Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 }) },
  data: {
    teams: [
      {icon:'🐎',name:'Ferrari',base:'意大利马拉内罗',desc:'F1最具传奇色彩的车队，唯一全赛季参赛队伍。1950年至今从未缺席。',championships:'16次',wins:'245+',since:'1950年'},
      {icon:'🔴',name:'Red Bull Racing',base:'英国米尔顿凯恩斯',desc:'纽维设计的赛车+维斯塔潘的天赋=2020年代最具统治力的车队。',championships:'6次',wins:'120+',since:'2005年'},
      {icon:'🟠',name:'McLaren',base:'英国沃金',desc:'F1历史第二成功的车队。塞纳、普罗斯特、汉密尔顿都曾效力。',championships:'8次',wins:'185+',since:'1966年'},
      {icon:'⚫',name:'Mercedes',base:'英国布莱克利',desc:'2014-2021年间统治F1。2026赛季进入调整期。',championships:'8次',wins:'125+',since:'2010年'},
      {icon:'🔵',name:'Alpine',base:'法国恩斯通',desc:'雷诺厂队，2021年更名Alpine。周冠宇2025赛季加盟。',championships:'2次',wins:'35+',since:'2021年'},
      {icon:'🟢',name:'Aston Martin',base:'英国银石',desc:'劳伦斯·斯特罗尔入主后重金投入，阿隆索加盟提升竞争力。',championships:'0',wins:'1+',since:'2021年'},
    ]
  }
})
