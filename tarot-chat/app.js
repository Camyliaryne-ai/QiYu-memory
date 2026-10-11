'use strict';
// Local prototype metadata. Every card carries separate upright/reversed guidance.
const TarotData = (() => {
 const majorRows=[
 ['愚者','尝试新的可能','先确认风险再出发','轻快','迈出小小一步','给相处一点新鲜感'],['魔术师','有能力主动创造','表达与行动尚未一致','自信','把想法变成行动','主动表达真实心意'],['女祭司','直觉需要被倾听','猜测遮住了真实感受','安静','先听听自己的感受','留空间倾听对方'],['女皇','关爱正在生长','付出可能让自己疲惫','温柔','照顾自己的需要','让关爱有来有往'],['皇帝','边界带来稳定','控制让人难以靠近','坚定','说清自己的边界','尊重彼此的独立'],['教皇','共同价值提供支撑','旧规则限制了选择','沉稳','重新确认认同的原则','讨论彼此的期待'],['恋人','连接需要真诚选择','需求不同需要沟通','亲近','坦诚说出自己的选择','确认双方是否愿意靠近'],['战车','方向明确可以前进','急于推进失去节奏','勇敢','专注一个可行方向','不要替对方决定进度'],['力量','温柔也能支撑自己','勉强坚强耗尽精力','包容','给情绪一点耐心','用温和方式表达需要'],['隐者','独处帮助厘清想法','沉默可能变成隔离','内省','留一点思考时间','解释自己需要的空间'],['命运之轮','变化带来新的机会','变化暂时难以掌控','开放','留出调整的余地','允许相处方式改变'],['正义','事实与感受需要平衡','不公平的感受未被说出','清醒','核对事实后再判断','把责任与需要说清楚'],['倒吊人','换个角度会有发现','等待正在消耗自己','耐心','停一下重新看待问题','避免单方面牺牲'],['死神','旧阶段结束让新生出现','舍不得放下旧模式','释然','结束不再适合的习惯','讨论需要改变的相处模式'],['节制','慢慢协调可以靠近','失衡需要重新调整','平和','让节奏放慢一点','寻找双方都舒服的节奏'],['恶魔','牵绊需要被看见','正在尝试摆脱束缚','警觉','辨认依赖与自由','不要用占有代替关心'],['高塔','旧期待被打破','忽略的问题仍需面对','震动','先找到稳定的支点','面对被回避的冲突'],['星星','希望正在恢复','失望暂时遮住希望','期待','从小小的恢复开始','用细小的善意重建信任'],['月亮','未知让感受变得敏感','模糊的事情逐渐清晰','敏感','别把猜测当成事实','用直接沟通减少猜疑'],['太阳','真实的快乐值得享受','热情需要休息和补充','明朗','分享一个快乐的小事','让相处简单坦诚'],['审判','回望能帮助重新选择','自责妨碍做出选择','觉醒','承认变化再决定下一步','认真听见彼此的改变'],['世界','阶段完成值得认可','仍有未完成的心事','满足','认可走过的路','一起讨论下一段旅程']
 ];
 const majors=majorRows.map((r,id)=>({id,name:r[0],uprightMeaning:r[1],reversedMeaning:r[2],emotionalTone:{upright:r[3],reversed:'谨慎'},actionTendency:{upright:r[4],reversed:'先停下来，'+r[4]},relationshipMeaning:{upright:r[5],reversed:'先确认自己的需要，再'+r[5]}}));
 const suits=[{name:'权杖',domain:'行动与热情',tone:'热情',action:'选择一件能付诸行动的小事',relation:'让主动与回应保持平衡'}, {name:'圣杯',domain:'情绪与连接',tone:'柔和',action:'说出一个真实的感受',relation:'倾听彼此的情感需要'}, {name:'宝剑',domain:'思考与沟通',tone:'理性',action:'把事实和猜测分开',relation:'清楚表达，避免互相猜测'}, {name:'星币',domain:'日常与稳定',tone:'踏实',action:'从日常里安排一个可行步骤',relation:'用持续的小行动建立信任'}];
 const ranks=[['王牌','新的机会出现','开始前还需要准备'],['二','两个选择需要协调','犹豫让方向模糊'],['三','合作与成长正在发生','期待与配合有些错位'],['四','稳定带来安全感','舒适也可能变成停滞'],['五','冲突或失落需要照顾','正在从困难中恢复'],['六','分享与回应带来支持','付出与回应不够平衡'],['七','需要辨认真正重要的事','分散的注意力需要收回'],['八','投入和练习带来变化','急躁让努力难以持续'],['九','积累让自己更有底气','独自承担可能让人疲惫'],['十','一个阶段积累到了顶点','过多责任需要分担'],['侍从','好奇心邀请新的学习','想法还需要落实'],['骑士','正在积极靠近目标','冲动可能越过边界'],['王后','成熟的理解带来照顾','照顾别人时忽略了自己'],['国王','清晰的担当带来方向','过于坚持让人难以表达']];
 const cards=[...majors];for(const suit of suits)for(const rank of ranks){cards.push({id:cards.length,name:suit.name+rank[0],uprightMeaning: `${suit.domain}中，${rank[1]}`,reversedMeaning:`${suit.domain}中，${rank[2]}`,emotionalTone:{upright:suit.tone,reversed:'克制'},actionTendency:{upright:suit.action,reversed:'放慢节奏，'+suit.action},relationshipMeaning:{upright:suit.relation,reversed:'留意不对等的感受，'+suit.relation}});}
 const spreads=[
 ['single','单牌阵',['当下指引']],['three','三牌阵',['现状','阻碍','建议']],['time','时间之流',['过去','现在','未来趋势']],['triangle','圣三角',['原因','现状','发展']],['pyramid','恋人金字塔',['自己','对方','关系','发展']],['core','直指核心',['表象','核心原因','隐藏需求','行动建议']],['cross','爱情十字',['自己','对方','连接','阻碍','建议']],['tree','爱情树',['根基','自己','对方','沟通','挑战','支持','成长']],['star','六芒星',['过去','现在','未来趋势','内在','外在','建议','整体']],['celtic','凯尔特牌阵',['现状','挑战','根基','过去','期待','近期趋势','自己','环境','担忧','长期趋势']]
 ].map(([id,name,positions])=>Object.freeze({id,name,positions:Object.freeze(positions),count:positions.length}));
 function recommend(text){let id;if(/长期|多年|婚姻|结婚|复杂|纠缠/.test(text))id=/复杂|纠缠|婚姻/.test(text)?'celtic':'tree';else if(/以后|未来|趋势|接下来|会怎样/.test(text))id=/整体|长期趋势|全面/.test(text)?'star':'time';else if(/为什么|原因|根源/.test(text))id=/根源|到底|核心/.test(text)?'core':'triangle';else if(/恋爱|喜欢|爱我|想我|对方|[他她].*(想|看|感觉|态度)|我们.*(相处|发展)|感情|关系|复合/.test(text))id=/阻碍|冲突|复合/.test(text)?'cross':'pyramid';else if(/要不要|能不能|是否|该不该|行不行|可不可以|好不好/.test(text))id='single';else id='three';return spreads.find(s=>s.id===id);}
 return {cards,spreads,recommend};
})();

'use strict';
const cardsEl=document.querySelector('#cards'),messages=document.querySelector('#messages'),input=document.querySelector('#message'),send=document.querySelector('#send'),redraw=document.querySelector('#redraw');
const rounds=[];let currentRound=null,busy=false,nextId=0;
function randomInt(max){const a=new Uint32Array(1),limit=Math.floor(4294967296/max)*max;do{crypto.getRandomValues(a);}while(a[0]>=limit);return a[0]%max;}
function draw(spread,previous=[]){let cards;do{const pool=TarotData.cards.map(c=>c.id);cards=Array.from({length:spread.count},(_,index)=>{const position=spread.positions[index];return Object.freeze({id:pool.splice(randomInt(pool.length),1)[0],reversed:randomInt(2)===1,position});});}while(JSON.stringify(cards)===JSON.stringify(previous));return Object.freeze(cards);}
function interpret(cards,spread,userMessage){const insights=cards.map(c=>{const meta=TarotData.cards[c.id],side=c.reversed?'reversed':'upright';return Object.freeze({cardName:meta.name,position:c.position,orientation:side,meaning:c.reversed?meta.reversedMeaning:meta.uprightMeaning,tone:meta.emotionalTone[side],action:meta.actionTendency[side],relationship:meta.relationshipMeaning[side]});});return Object.freeze({spread:spread.name,userMessage,relationshipQuestion:/爱|喜欢|关系|对方|他|她|复合|婚姻/.test(userMessage),insights:Object.freeze(insights)});}
function replyText(round){const i=round.interpretation,items=i.insights;const focus=items.find(x=>/核心原因|阻碍|挑战/.test(x.position))||items[0];const guidance=items.find(x=>/建议|指引|成长|长期趋势|发展/.test(x.position))||items[items.length-1];const idea=i.relationshipQuestion?guidance.relationship:guidance.action;const positionContext=/未来|趋势|发展/.test(guidance.position)?'往后怎么走不用急着定下来。':/原因/.test(focus.position)?'我们可以先从这里慢慢理清。':'先照顾好你现在的感受。';const versions=[`雾雾，听你说完，我想到的是：${focus.meaning}。${positionContext}不如试着${idea}，我陪你。`,`我在听呢。${focus.meaning}，这点让我有些在意。先别催自己，试着${idea}，好不好？`,`过来一点，雾雾。${positionContext}也许${focus.meaning}。我们先${idea}，剩下的慢慢聊。`];return versions[round.version%versions.length];}
function renderCardGroup(cards,container,compact){container.replaceChildren();for(const card of cards){const meta=TarotData.cards[card.id],orientation=card.reversed?'逆位':'正位';const el=document.createElement(compact?'span':'article');el.className=compact?'mini-card':'detail-card';el.append(makeTarotImage(card,compact?'mini-art':'detail-image'));const label=document.createElement('span');label.className=compact?'mini-name':'detail-name';label.textContent=meta.name;const side=document.createElement('span');side.className='orientation';side.textContent=orientation;const text=document.createElement('span');text.append(label,side);el.append(text);if(!compact){const position=document.createElement('p');position.textContent=card.position;el.append(position);}container.append(el);}}
function renderCards(){const details=document.querySelector('#detail-cards');document.querySelector('#spread-name').textContent=currentRound?currentRound.spread.name+' · '+currentRound.spread.count+'张':'';if(!currentRound){cardsEl.textContent='等待你的下一句话';details.replaceChildren();redraw.disabled=true;return;}redraw.disabled=busy;renderCardGroup(currentRound.cards,cardsEl,true);renderCardGroup(currentRound.cards,details,false);}
function renderHistoricalCards(round,container){renderCardGroup(round.cards,container,false);}

function appendMessage(text,isUser,round){const el=document.createElement('article');el.className=`message ${isUser?'user':'assistant'}`;const avatar=document.createElement('div');avatar.className='avatar';avatar.setAttribute('aria-hidden','true');avatar.textContent=isUser?'雾':'祁';const content=document.createElement('div');content.className='message-content';const name=document.createElement('p');name.className='message-name';name.textContent=isUser?'雾雾':'祁煜';const bubble=document.createElement('div');bubble.className='bubble';bubble.textContent=text;const footer=document.createElement('div');footer.className='message-footer';const stamp=document.createElement('span');stamp.className='time';stamp.textContent=new Intl.DateTimeFormat('zh-CN',{hour:'2-digit',minute:'2-digit'}).format(new Date());footer.append(stamp);if(round){el.dataset.roundId=round.id;const button=document.createElement('button');button.type='button';button.className='reinterpret';button.textContent='↻ 重新解读';button.addEventListener('click',()=>{if(busy)return;round.version++;round.qiyuReply=replyText(round);bubble.textContent=round.qiyuReply;notify('换一种表达，保留这条回复的原牌组');});footer.append(button);const history=document.createElement('details');history.className='history-deck';const summary=document.createElement('summary');summary.textContent='查看本轮牌组 · '+round.spread.name;const group=document.createElement('div');group.className='history-cards';history.append(summary,group);history.addEventListener('toggle',()=>{if(history.open)renderHistoricalCards(round,group);});el._history=history;}content.append(name,bubble,footer);if(el._history)content.append(el._history);el.append(avatar,content);messages.append(el);return el;}
function scrollToLatest(){const el=document.querySelector('#conversation');el.scrollTop=el.scrollHeight;}
function setBusy(value){busy=value;send.disabled=value||!input.value.trim();redraw.disabled=value||!currentRound;document.querySelectorAll('.reinterpret').forEach(b=>b.disabled=value);messages.setAttribute('aria-busy',String(value));}
// Recommendation seam: a future Luna classifier may return only a spread ID, never cards.
const spreadSelector={classify:async text=>TarotData.recommend(text).id};
const spreadMode=document.querySelector('#spread-mode');
for(const spread of TarotData.spreads){const option=document.createElement('option');option.value=spread.id;option.textContent=spread.name+' · '+spread.count+'张';spreadMode.append(option);}
const flowStatus=document.querySelector('#flow-status'),shuffleStage=document.querySelector('#shuffle-stage');
for(let i=0;i<20;i++){const back=document.createElement('span');back.className='shuffle-back';back.style.setProperty('--i',i);shuffleStage.append(back);}
let flowState='idle';
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
// Presentation timing is independent of the card random engine.
const pacing=(min,max)=>Math.round(min+Math.random()*(max-min));
function typingDuration(reply){return Math.max(2500,Math.min(5500,2200+Array.from(reply).length*25+pacing(-400,400)));}
function showTyping(message){
 message.classList.add('typing');
 const bubble=message.querySelector('.bubble');bubble.replaceChildren();bubble.setAttribute('aria-label','祁煜正在输入');
 const dots=document.createElement('span');dots.className='typing-dots';dots.setAttribute('aria-hidden','true');
 for(let i=0;i<3;i++){const dot=document.createElement('span');dot.textContent='•';dots.append(dot);}bubble.append(dots);
 scrollToLatest();
}
function finishTyping(message,reply){message.classList.remove('typing');const bubble=message.querySelector('.bubble');bubble.removeAttribute('aria-label');bubble.textContent=reply;}

function setState(state,text){flowState=state;document.querySelector('.app').dataset.state=state;flowStatus.textContent=text;flowStatus.hidden=!text;shuffleStage.hidden=state!=='shuffling';}
async function runRound(round,isRedraw=false){
 setBusy(true);spreadMode.disabled=true;
 document.querySelector('#deck-details').hidden=true;document.querySelector('#deck-toggle').setAttribute('aria-expanded','false');
 try{
  if(!isRedraw){
   setState('connecting_qiyu','正在与祁煜建立联系…');cardsEl.textContent='等待建立联系…';document.querySelector('#spread-name').textContent='';
   await wait(pacing(2000,5000));
   setState('selecting_spread','正在推荐牌阵…');cardsEl.textContent='正在推荐牌阵…';
   const id=spreadMode.value==='auto'?await spreadSelector.classify(round.userMessage):spreadMode.value;
   round.spread=TarotData.spreads.find(s=>s.id===id);if(!round.spread)throw new Error('未找到合适牌阵');
   await wait(pacing(800,1400));
  }
  document.querySelector('#spread-name').textContent=round.spread.name+' · '+round.spread.count+'张';
  setState('shuffling','洗牌中…');cardsEl.textContent='洗牌中…';
  await wait(pacing(3500,5000));
  // The random engine alone selects cards. Exactly one draw operation per user-requested round.
  round.cards=draw(round.spread,round.cards);currentRound=round;round.version=0;
  setState('cards_revealed','本轮牌组已锁定');renderCards();
  await wait(pacing(1200,2000));
  setState('interpreting','正在解读这一轮…');
  round.interpretation=interpret(round.cards,round.spread,round.userMessage);
  await wait(pacing(1800,3000));
  round.qiyuReply=replyText(round);
  setState('qiyu_typing','');
  const replyMessage=isRedraw?messages.querySelector(`[data-round-id="${round.id}"]`):appendMessage('',false,round);
  showTyping(replyMessage);
  await wait(typingDuration(round.qiyuReply));
  finishTyping(replyMessage,round.qiyuReply);
  if(isRedraw){
   const history=replyMessage.querySelector('.history-deck');if(history?.open)renderHistoricalCards(round,history.querySelector('.history-cards'));
  }else{rounds.push(round);}
  setState('reply','');scrollToLatest();
 }catch(error){console.error(error);setState('idle','暂时未能完成，请重新发送消息。');}
 finally{setBusy(false);spreadMode.disabled=false;renderCards();}
}
document.querySelector('#chat-form').addEventListener('submit',async e=>{e.preventDefault();const text=input.value.trim();if(!text||busy)return;const round={id:++nextId,userMessage:text,spread:null,cards:[],interpretation:null,qiyuReply:'',version:0};appendMessage(text,true);input.value='';input.style.height='auto';scrollToLatest();await runRound(round);});
redraw.addEventListener('click',async()=>{if(busy||!currentRound)return;await runRound(currentRound,true);});
const toggle=document.querySelector('#deck-toggle'),details=document.querySelector('#deck-details');toggle.addEventListener('click',()=>{if(!currentRound||busy)return;details.hidden=!details.hidden;toggle.setAttribute('aria-expanded',String(!details.hidden));document.querySelector('#chevron').textContent=details.hidden?'⌄':'⌃';});
input.addEventListener('input',()=>{send.disabled=busy||!input.value.trim();input.style.height='auto';input.style.height=Math.min(input.scrollHeight,110)+'px';});input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing&&matchMedia('(min-width:700px)').matches){e.preventDefault();document.querySelector('#chat-form').requestSubmit();}});
let toastTimer;function notify(text){const el=document.querySelector('#toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,2600);}
document.querySelector('#image-tool').addEventListener('click',()=>notify('图片入口已预留，暂不上传图片'));document.querySelector('#link-tool').addEventListener('click',()=>notify('链接入口已预留，也可以直接粘贴链接'));
const emojiToggle=document.querySelector('#emoji-tool'),picker=document.querySelector('#emoji-picker');emojiToggle.addEventListener('click',()=>{picker.hidden=!picker.hidden;emojiToggle.setAttribute('aria-expanded',String(!picker.hidden));});picker.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{input.setRangeText(button.textContent,input.selectionStart,input.selectionEnd,'end');input.dispatchEvent(new Event('input'));input.focus();picker.hidden=true;emojiToggle.setAttribute('aria-expanded','false');}));
setState('idle','');renderCards();
if(window.visualViewport){const fit=()=>document.querySelector('.app').style.height=window.visualViewport.height+'px';window.visualViewport.addEventListener('resize',fit);fit();}
