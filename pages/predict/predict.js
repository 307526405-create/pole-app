const API = 'http://localhost:8080/api'
const PERM_NUM = {
  'Andrea Kimi Antonelli':12,'Lewis Hamilton':44,'George Russell':63,'Charles Leclerc':16,
  'Lando Norris':1,'Oscar Piastri':81,'Max Verstappen':3,'Pierre Gasly':10,
  'Isack Hadjar':6,'Liam Lawson':30,'Oliver Bearman':87,'Franco Colapinto':43,
  'Carlos Sainz':55,'Alexander Albon':23,'Esteban Ocon':31,'Gabriel Bortoleto':5,
  'Fernando Alonso':14,'Nico Hülkenberg':27,'Sergio Pérez':11,'Lance Stroll':18,
  'Arvid Lindblad':41,'Valtteri Bottas':77,
}

Page({
  data: {
    step:0, canNext:false, showCelebrate:false, raceRound:8,
    stepTitles:['1/6 杆位','2/6 排位赛前三（选3人）','3/6 正赛领奖台（选3人）','4/6 最快圈','5/6 安全车次数','6/6 退赛车数'],
    drivers:[], options:[], picks:{pole:'',podium:[],fastest_lap:'',safety_car:'',retirements:''}
  },

  onLoad(){
    var t=this
    wx.request({url:API+'/standings/drivers',success(r){
      t.setData({drivers:(r.data.data||[]).map(function(d){return{num:PERM_NUM[d.driver_name]||d.position,name:d.driver_name,team:d.constructor,selected:false}})})
      t.prepareStep(0)
    }})
    wx.request({url:API+'/races',success(r){
      var n=(r.data.data||[]).find(function(rr){return new Date(rr.date)>new Date()})
      if(n)t.setData({raceRound:n.round})
    }})
    this.prepareStep(0)
  },

  prepareStep(s){
    var o=[]
    if(s===4)o=[{text:'0次',sel:false},{text:'1次',sel:false},{text:'2次及以上',sel:false}]
    if(s===5)o=[{text:'0-2辆',sel:false},{text:'3-5辆',sel:false},{text:'6辆以上',sel:false}]
    // 恢复之前的选择
    var pk=this.data.picks
    if(s===0||s===3){
      // 杆位/最快圈: 恢复单选
      var drs=this.data.drivers.map(function(d){return Object.assign({},d,{selected:false})})
      if(s===0&&pk.pole)drs.forEach(function(d){if(d.name===pk.pole)d.selected=true})
      if(s===3&&pk.fastest_lap)drs.forEach(function(d){if(d.name===pk.fastest_lap)d.selected=true})
      this.setData({drivers:drs,options:o,step:s,canNext:!!pk.pole||!!pk.fastest_lap})
    }else if(s===1||s===2){
      var drs=this.data.drivers.map(function(d){return Object.assign({},d,{selected:false})})
      if(pk.podium.length>0)drs.forEach(function(d){if(pk.podium.indexOf(d.name)>=0)d.selected=true})
      var sel=drs.filter(function(d){return d.selected}).length
      this.setData({drivers:drs,options:o,step:s,canNext:sel===3})
    }else{
      this.setData({options:o,step:s,canNext:false})
    }
  },

  selectDriver(e){
    var i=e.currentTarget.dataset.idx,s=this.data.step,drs=this.data.drivers.map(function(d){return Object.assign({},d)})
    if(s===0||s===3){drs.forEach(function(d,j){d.selected=(j===i)});this.setData({drivers:drs,canNext:true})}
    else{var sel=drs.filter(function(d){return d.selected}).length;if(drs[i].selected){drs[i].selected=false;sel--}else if(sel<3){drs[i].selected=true;sel++};this.setData({drivers:drs,canNext:sel===3})}
  },

  selectOption(e){
    var i=e.currentTarget.dataset.idx
    this.setData({options:this.data.options.map(function(o,j){return{text:o.text,sel:j===i}}),canNext:true})
  },

  savePicks(){
    var d=this.data,pk=d.picks,sel=d.drivers.filter(function(dr){return dr.selected})
    if(d.step===0)pk.pole=sel[0]?sel[0].name:''
    if(d.step===1||d.step===2)pk.podium=sel.map(function(dr){return dr.name})
    if(d.step===3)pk.fastest_lap=sel[0]?sel[0].name:''
    var o=d.options.find(function(o){return o.sel})
    if(d.step===4)pk.safety_car=o?o.text:''
    if(d.step===5)pk.retirements=o?o.text:''
    return pk
  },

  nextStep(){
    var pk=this.savePicks(),ns=this.data.step+1
    if(ns>=6){this.setData({picks:pk,showCelebrate:true});this.submit()}
    else{this.setData({picks:pk,options:[]});this.prepareStep(ns)}
  },

  prevStep(){this.savePicks();var ps=Math.max(0,this.data.step-1);this.setData({options:[]});this.prepareStep(ps)},

  submit(){
    var t=this,d=this.data,pk=d.picks
    wx.request({url:API+'/predict',method:'POST',
      data:{race_round:d.raceRound,pole:pk.pole,podium:pk.podium,fastest_lap:pk.fastest_lap,safety_car:pk.safety_car,retirements:pk.retirements,wx_openid:'test'},
      success:function(){setTimeout(function(){wx.switchTab({url:'/pages/index/index'})},2000)},
      fail:function(){wx.showToast({title:'提交失败',icon:'none'})}
    })
  }
})
