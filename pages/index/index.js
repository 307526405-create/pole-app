const API = 'http://localhost:8080/api'
const CN = {
  'Australian Grand Prix':'澳大利亚大奖赛','Chinese Grand Prix':'中国大奖赛','Japanese Grand Prix':'日本大奖赛','Miami Grand Prix':'迈阿密大奖赛','Canadian Grand Prix':'加拿大大奖赛','Monaco Grand Prix':'摩纳哥大奖赛','Barcelona Grand Prix':'巴塞罗那大奖赛','Austrian Grand Prix':'奥地利大奖赛','British Grand Prix':'英国大奖赛','Belgian Grand Prix':'比利时大奖赛','Hungarian Grand Prix':'匈牙利大奖赛','Dutch Grand Prix':'荷兰大奖赛','Italian Grand Prix':'意大利大奖赛','Spanish Grand Prix':'西班牙大奖赛','Azerbaijan Grand Prix':'阿塞拜疆大奖赛','Singapore Grand Prix':'新加坡大奖赛','United States Grand Prix':'美国大奖赛','Mexico City Grand Prix':'墨西哥城大奖赛','Brazilian Grand Prix':'巴西大奖赛','Las Vegas Grand Prix':'拉斯维加斯大奖赛','Qatar Grand Prix':'卡塔尔大奖赛','Abu Dhabi Grand Prix':'阿布扎比大奖赛',
  'Australia':'澳大利亚','China':'中国','Japan':'日本','USA':'美国','Canada':'加拿大','Monaco':'摩纳哥','Spain':'西班牙','Austria':'奥地利','UK':'英国','Belgium':'比利时','Hungary':'匈牙利','Netherlands':'荷兰','Italy':'意大利','Azerbaijan':'阿塞拜疆','Singapore':'新加坡','Mexico':'墨西哥','Brazil':'巴西','UAE':'阿联酋','Qatar':'卡塔尔',
}

Page({
  data: { nextRace:null, lastRace:null, seasonPct:0, checkedIn:false, streak:5, lootOpened:false, showLootToast:false, lootResult:{}, quizDone:false, quizResult:{}, quiz:{question:'舒马赫一共拿过几个F1世界冠军？',options:['5个','6个','7个','8个'],answer:'7个',explanation:'舒马赫生涯共获得7次F1世界冠军。'}, trivias:['舒马赫在2004赛季赢得了前13站中的12站。','维斯塔潘是F1最年轻的分站冠军(18岁228天)。','法拉利是唯一参加全部赛季的车队。'], cd:{days:'00',hours:'00',minutes:'00'}, cdUrgent:false, news:[] },
  onLoad(){this.fetchData();this.checkCheckin();this.checkLoot();this.checkQuiz()},
  onShow(){if(typeof this.getTabBar==='function'&&this.getTabBar())this.getTabBar().setData({selected:0})},
  onShareAppMessage(){return{title:'杆位 - F1赛车竞猜',path:'/pages/index/index'}},
  fetchData(){wx.request({url:API+'/races',success:(res)=>{
    const races=(res.data.data||[]).map(r=>({...r,cn:CN[r.name]||r.name,cnCountry:CN[r.country]||r.country}))
    const now=new Date(); const next=races.find(r=>new Date(r.date)>now)||races[races.length-1]; const last=races.filter(r=>new Date(r.date)<=now).pop()
    this.setData({nextRace:next||null,lastRace:last||null,seasonPct:next?Math.round(next.round/22*100):0})
    if(next)this.startCountdown(new Date(next.date+'T'+(next.time||'00:00:00')))
    this.setData({news:[{tag:'赛事',title:(last?last.cn+'已完赛':'赛季即将开始'),expanded:false},{tag:'前瞻',title:(next?'下一站：'+next.cn:''),expanded:false}]})
  }})},
  startCountdown(t){const tick=()=>{const n=new Date();const d=t-n;if(d<=0){this.setData({cd:{days:'00',hours:'00',minutes:'00'},cdUrgent:false});return}const dd=Math.floor(d/86400000);const hh=Math.floor((d%86400000)/3600000);const mm=Math.floor((d%3600000)/60000);this.setData({cd:{days:String(dd).padStart(2,'0'),hours:String(hh).padStart(2,'0'),minutes:String(mm).padStart(2,'0')},cdUrgent:d<3*3600000})};tick();if(this._timer)clearInterval(this._timer);this._timer=setInterval(tick,30000)},
  onUnload(){if(this._timer)clearInterval(this._timer)},
  onCheckin(){if(this.data.checkedIn)return;const t=new Date().toDateString();wx.setStorageSync('checkin_date',t);const s=(wx.getStorageSync('checkin_streak')||0)+1;wx.setStorageSync('checkin_streak',s);this.setData({checkedIn:true,streak:s});const m={1:'🏎️ 引擎启动！',3:'🔥 轮胎预热！',7:'⚡ DRS开启！',14:'🏆 领跑全场！',30:'👑 杆位之王！'};let msg=`连续${s}天`;Object.keys(m).reverse().forEach(k=>{if(s>=k)msg=m[k]+` 连续${s}天`});wx.showToast({title:msg,icon:'success'})},
  checkCheckin(){const t=new Date().toDateString();if(wx.getStorageSync('checkin_date')===t)this.setData({checkedIn:true,streak:wx.getStorageSync('checkin_streak')||1})},
  checkQuiz(){if(wx.getStorageSync('quiz_date')===new Date().toDateString())this.setData({quizDone:true,quizResult:{correct:wx.getStorageSync('quiz_correct')==='true'}})},
  pickQuiz(e){if(this.data.quizDone)return;const i=e.currentTarget.dataset.idx;const c=this.data.quiz.options[i]===this.data.quiz.answer;wx.setStorageSync('quiz_date',new Date().toDateString());wx.setStorageSync('quiz_correct',String(c));this.setData({quizDone:true,quizResult:{correct:c}});if(c)wx.showToast({title:'🎉 答对！+1分',icon:'success'})},
  openLoot(){if(this.data.lootOpened)return;const r=[{icon:'🎉',text:'+3 积分！'},{icon:'⭐',text:'+2 积分！'},{icon:'💪',text:'+1 积分'}][Math.floor(Math.random()*3)];wx.setStorageSync('loot_date',new Date().toDateString());this.setData({lootOpened:true,lootResult:r,showLootToast:true});setTimeout(()=>this.setData({showLootToast:false}),2000)},
  checkLoot(){if(wx.getStorageSync('loot_date')===new Date().toDateString())this.setData({lootOpened:true})},
  toggleNews(e){const i=e.currentTarget.dataset.idx;this.data.news[i].expanded=!this.data.news[i].expanded;this.setData({news:this.data.news})},
  onPredict(){wx.navigateTo({url:'/pages/predict/predict'})}
})
