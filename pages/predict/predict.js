const API = 'http://localhost:8080/api'

// 车手永久编号
const PERM_NUM = {
  'Andrea Kimi Antonelli':12,'Lewis Hamilton':44,'George Russell':63,'Charles Leclerc':16,
  'Lando Norris':1,'Oscar Piastri':81,'Max Verstappen':3,'Pierre Gasly':10,
  'Isack Hadjar':6,'Liam Lawson':30,'Oliver Bearman':87,'Franco Colapinto':43,
  'Carlos Sainz':55,'Alexander Albon':23,'Esteban Ocon':31,'Gabriel Bortoleto':5,
  'Fernando Alonso':14,'Nico Hülkenberg':27,'Sergio Pérez':11,'Lance Stroll':18,
  'Arvid Lindblad':41,'Valtteri Bottas':77,
}

Page({
  data: { step:0, showCelebrate:false, canSubmit:false, raceRound:8,
    stepTitles:['1/6 杆位','2/6 排位赛前三（选3人）','3/6 正赛领奖台（选3人）','4/6 最快圈','5/6 安全车次数（含SC和VSC）','6/6 退赛车数'],
    drivers:[], options:[], submitData:{pole:'',podium:[],fastest_lap:'',safety_car:'',retirements:''} },
  
  onLoad(){
    var that=this
    wx.request({url:API+'/standings/drivers',success(res){
      that.setData({drivers:(res.data.data||[]).map(function(d){return{num:PERM_NUM[d.driver_name]||d.position,name:d.driver_name,team:d.constructor,selected:false}})})
    }})
    wx.request({url:API+'/races',success(res){
      var next=(res.data.data||[]).find(function(r){return new Date(r.date)>new Date()})
      if(next) that.setData({raceRound:next.round})
    }})
  },

  selectDriver(e){
    var that=this;var idx=e.currentTarget.dataset.idx;var step=this.data.step;var drivers=this.data.drivers.slice()
    if(step===0||step===3){
      drivers.forEach(function(d,i){d.selected=(i===idx)})
      this.setData({drivers:drivers});setTimeout(function(){that.nextStep()},300)
      return
    }
    var sel=drivers.filter(function(d){return d.selected}).length
    if(drivers[idx].selected){drivers[idx].selected=false}
    else if(sel<3){drivers[idx].selected=true}
    this.setData({drivers:drivers})
    if(drivers.filter(function(d){return d.selected}).length===3) setTimeout(function(){that.nextStep()},300)
  },

  nextStep(){
    var step=this.data.step+1
    if(step===5){
      this.setData({step:step,drivers:this.data.drivers.map(function(d){d.selected=false;return d}),options:[{text:'0次',selected:false},{text:'1次',selected:false},{text:'2次及以上',selected:false}]})
    } else if(step===6){
      this.setData({step:step,options:[{text:'0-2辆',selected:false},{text:'3-5辆',selected:false},{text:'6辆以上',selected:false}]})
    } else {
      this.setData({step:step,drivers:this.data.drivers.map(function(d){d.selected=false;return d})})
    }
  },

  selectOption(e){
    var that=this;var idx=e.currentTarget.dataset.idx
    var options=this.data.options.map(function(o,i){o.selected=(i===idx);return o})
    this.setData({options:options})
    setTimeout(function(){
      if(that.data.step===5){
        that.setData({step:6,options:[{text:'0-2辆',selected:false},{text:'3-5辆',selected:false},{text:'6辆以上',selected:false}]})
      } else {
        that.setData({canSubmit:true})
      }
    },300)
  },

  submit(){
    var that=this
    var d=this.data
    // 收集用户选择
    var selDrivers=d.drivers.filter(function(dr){return dr.selected})
    var pole=selDrivers.length>0?selDrivers[0].name:''
    var podium=selDrivers.slice(0,3).map(function(dr){return dr.name})
    var fastest=selDrivers.length>0?selDrivers[0].name:''
    var sc=d.options.find(function(o){return o.selected})
    var safety_car=sc?sc.text:''
    var retirements=sc?sc.text:''
    
    var data={race_round:d.raceRound,pole:pole,podium:podium,fastest_lap:fastest,safety_car:safety_car,retirements:retirements,wx_openid:'test'}
    
    wx.request({url:API+'/predict',method:'POST',data:data,success:function(){
      that.setData({showCelebrate:true})
      setTimeout(function(){
        that.setData({showCelebrate:false,step:0,canSubmit:false,drivers:d.drivers.map(function(dr){dr.selected=false;return dr}),options:[],submitData:{pole:'',podium:[],fastest_lap:'',safety_car:'',retirements:''}})
        wx.showShareMenu({withShareTicket:true})
        wx.switchTab({url:'/pages/index/index'})
      },2000)
    }})
  }
})
