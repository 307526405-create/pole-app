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
    step:0, canAdvance:false, canSubmit:false, showConfirm:false, showCelebrate:false,
    raceRound:8,
    stepTitles:['1/6 杆位','2/6 排位赛前三（选3人）','3/6 正赛领奖台（选3人）','4/6 最快圈','5/6 安全车次数（含SC和VSC）','6/6 退赛车数'],
    drivers:[], options:[], picks:{pole:'',podium:[],fastest_lap:'',safety_car:'',retirements:''}
  },

  onLoad(){
    var that=this
    wx.request({url:API+'/standings/drivers',success:function(res){
      that.setData({drivers:(res.data.data||[]).map(function(d){return{num:PERM_NUM[d.driver_name]||d.position,name:d.driver_name,team:d.constructor,selected:false}})})
    },fail:function(){}})
    wx.request({url:API+'/races',success:function(res){
      var next=(res.data.data||[]).find(function(r){return new Date(r.date)>new Date()})
      if(next)that.setData({raceRound:next.round})
    },fail:function(){}})
  },

  selectDriver(e){
    var idx=e.currentTarget.dataset.idx,step=this.data.step
    var drivers=this.data.drivers.map(function(d){return Object.assign({},d)})
    
    if(step===0||step===3){
      // 单选：杆位、最快圈
      drivers.forEach(function(d,i){d.selected=(i===idx)})
      this.setData({drivers:drivers,canAdvance:true})
      return
    }
    // 多选：排位前三、领奖台（最多3个）
    var sel=drivers.filter(function(d){return d.selected}).length
    if(drivers[idx].selected){drivers[idx].selected=false;sel--}
    else if(sel<3){drivers[idx].selected=true;sel++}
    this.setData({drivers:drivers,canAdvance:sel===3})
  },

  selectOption(e){
    var idx=e.currentTarget.dataset.idx
    var options=this.data.options.map(function(o,i){return{text:o.text,selected:i===idx}})
    this.setData({options:options,canAdvance:true})
  },

  nextStep(){
    var step=this.data.step,d=this.data
    // 保存当前选择
    var sel=d.drivers.filter(function(dr){return dr.selected})
    if(step===0)d.picks.pole=sel[0]?sel[0].name:''
    if(step===1||step===2)d.picks.podium=sel.map(function(dr){return dr.name})
    if(step===3)d.picks.fastest_lap=sel[0]?sel[0].name:''
    if(step===4||step===5){
      var opt=d.options.find(function(o){return o.selected})
      if(step===4)d.picks.safety_car=opt?opt.text:''
      if(step===5)d.picks.retirements=opt?opt.text:''
    }
    
    step++
    var clean=d.drivers.map(function(dr){dr.selected=false;return dr})
    
    if(step===4||step===5){
      // 安全车和退赛：显示选项
      var opts=step===4?[{text:'0次',selected:false},{text:'1次',selected:false},{text:'2次及以上',selected:false}]:[{text:'0-2辆',selected:false},{text:'3-5辆',selected:false},{text:'6辆以上',selected:false}]
      this.setData({step:step,drivers:clean,options:opts,canAdvance:false})
    }else if(step===6){
      // 最后一步：显示确认页
      this.setData({step:step,drivers:clean,options:[],canAdvance:false,showConfirm:true})
    }else{
      this.setData({step:step,drivers:clean,options:[],canAdvance:false})
    }
  },

  submit(){
    var that=this,d=this.data
    wx.request({
      url:API+'/predict',method:'POST',
      data:{race_round:d.raceRound,pole:d.picks.pole,podium:d.picks.podium,fastest_lap:d.picks.fastest_lap,safety_car:d.picks.safety_car,retirements:d.picks.retirements,wx_openid:'test'},
      success:function(){
        that.setData({showConfirm:false,showCelebrate:true})
        setTimeout(function(){wx.switchTab({url:'/pages/index/index'})},2500)
      },
      fail:function(){wx.showToast({title:'提交失败',icon:'none'})}
    })
  },

  onBack(){wx.navigateBack()}
})
