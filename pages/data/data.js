Page({
  onShow() { if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 }) },
  data: {
    tab: 0,
    data: [
      [{pos:1,name:'Lando Norris',team:'McLaren',pts:423},{pos:2,name:'Max Verstappen',team:'Red Bull',pts:421},{pos:3,name:'Oscar Piastri',team:'McLaren',pts:410},{pos:4,name:'George Russell',team:'Mercedes',pts:319},{pos:5,name:'Charles Leclerc',team:'Ferrari',pts:242},{pos:6,name:'Lewis Hamilton',team:'Ferrari',pts:223},{pos:7,name:'Kimi Antonelli',team:'Mercedes',pts:148},{pos:8,name:'周冠宇',team:'Alpine',pts:96}],
      [{pos:1,name:'McLaren',pts:833},{pos:2,name:'Mercedes',pts:467},{pos:3,name:'Ferrari',pts:465},{pos:4,name:'Red Bull Racing',pts:456},{pos:5,name:'Alpine',pts:161}],
      [{pos:1,name:'Max Verstappen',team:'Red Bull'},{pos:2,name:'Oscar Piastri',team:'McLaren'},{pos:3,name:'Lando Norris',team:'McLaren'},{pos:4,name:'Charles Leclerc',team:'Ferrari'},{pos:5,name:'George Russell',team:'Mercedes'}]
    ]
  },
  switchTab(e) { this.setData({ tab: parseInt(e.currentTarget.dataset.idx) }) }
})
