'use strict';
const majors = [
 ['愚者','新的起点','放轻脚步，允许自己慢慢探索'],['魔术师','主动创造','相信你已经拥有迈出一步的能力'],['女祭司','内在直觉','给自己的直觉留一点安静的空间'],['女皇','温柔滋养','照顾自己，也接住身边的善意'],['皇帝','边界与秩序','先确定你希望守住的边界'],['教皇','信任与经验','从熟悉的经验里寻找支撑'],['恋人','连接与选择','听听自己的心，选择让你自在的相处'],['战车','前进的勇气','把方向握在自己手里，不必急着赶路'],['力量','温柔的勇气','不用逞强，温柔也可以很有力量'],['隐者','独处与思考','暂时慢下来，辨认自己真正的需要'],['命运之轮','变化与机会','变化来临时，给新的可能留一点余地'],['正义','坦诚与平衡','把感受和事实放在一起认真看看'],['倒吊人','新的视角','换一个角度看，也许会发现不同的答案'],['死神','告别与新生','允许旧的阶段结束，为新的生活留位置'],['节制','平衡与耐心','按照自己的节奏，让感受慢慢沉淀'],['恶魔','牵绊与欲望','看见让你放不下的东西，也照顾自己的自由'],['高塔','打破与重建','当期待被打乱，先给自己一个稳稳的落脚点'],['星星','希望与疗愈','留住那一点微光，不必马上证明什么'],['月亮','情绪与未知','不确定时先安顿情绪，再慢慢分辨'],['太阳','明朗与喜悦','允许自己享受简单而真实的快乐'],['审判','回望与觉醒','听见自己的变化，再决定下一步'],['世界','完整与新的旅程','认可已经走过的路，也期待新的相遇']
];
const positions=['此刻的你','心底的回声','给你的轻语'];
const cardsEl=document.querySelector('#cards'), messages=document.querySelector('#messages'), input=document.querySelector('#message'), send=document.querySelector('#send');
let currentRound;
let roundNumber=0;
function randomInt(max){const a=new Uint32Array(1);const limit=Math.floor(4294967296/max)*max;do{crypto.getRandomValues(a);}while(a[0]>=limit);return a[0]%max;}
function draw(){const pool=majors.map((_,i)=>i);const cards=[];for(let i=0;i<3;i++){const id=pool.splice(randomInt(pool.length),1)[0];cards.push({id,reversed:randomInt(2)===1});}return {number:++roundNumber,cards};}
function illustration(id){
 const motifs=[
 '<circle cx="60" cy="69" r="24"/><path d="M34 111l26-28 26 28M60 37v10M94 69H84M26 69h10"/>',
 '<path d="M32 85q28-58 56 0q-28 58-56 0Z"/><path d="M35 85q25 24 50 0M60 50v70"/>',
 '<path d="M71 43a32 32 0 1 0 0 65 35 35 0 0 1 0-65Z"/><path d="M25 123h70M35 128h50"/>',
 '<path d="M32 110V55l16 15 12-26 12 26 16-15v55Z"/><circle cx="60" cy="92" r="8"/>',
 '<path d="M60 42l30 40-30 40-30-40Z"/><circle cx="60" cy="82" r="18"/><path d="M60 54v56M42 82h36"/>',
 '<path d="M32 112l28-64 28 64ZM60 48v64"/><circle cx="60" cy="82" r="13"/>'
 ];
 return `<svg viewBox="0 0 120 165" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M15 25h12M93 25h12M15 140h12M93 140h12" opacity=".6"/><circle cx="60" cy="82" r="46" stroke-dasharray="1 7" opacity=".45"/>${motifs[id%motifs.length]}<path d="M24 45l2-5 2 5-2 5ZM91 119l2-5 2 5-2 5Z"/><circle cx="89" cy="40" r="1.5"/><circle cx="26" cy="119" r="1.5"/></svg>`;
}
function renderCards(){cardsEl.replaceChildren();currentRound.cards.forEach((card,i)=>{const el=document.createElement('article');el.className='card';el.innerHTML=`<div class="card-art ${card.reversed?'reversed':''}"><span class="card-number">${String(card.id).padStart(2,'0')} · ✧</span>${illustration(card.id)}</div><p class="card-name">${majors[card.id][0]}</p><span class="orientation ${card.reversed?'reverse':''}">${card.reversed?'逆位':'正位'}</span><p class="card-position">${positions[i]}</p>`;cardsEl.append(el);});}
function interpretation(round,question,variation){const names=round.cards.map(c=>`${majors[c.id][0]}${c.reversed?'逆位':'正位'}`).join('、');const chosen=round.cards[variation%3];const [,theme,advice]=majors[chosen.id];const openings=['雾雾，过来一点。先不用急着找到答案。','我听着呢，雾雾。我们换个角度，慢慢看。','今晚的潮水很安静，雾雾。这次，先把注意力放回你身上。'];const framing=chosen.reversed?'逆位让我想到：也许你需要先照顾那些被压住的感受，再考虑往前走。':'正位让我想到：你可以给这份感受一点空间，看看它想带你去哪里。';return `${openings[variation%openings.length]}\n\n${question?'你刚才说：“'+question+'”\n\n':''}这一轮陪着我们的是：${names}。我想从「${majors[chosen.id][0]}」聊起，它的主题是${theme}。${framing}\n\n${advice}。如果愿意，告诉我，这里面哪一句最像你现在的心情？` ;}
function appendUser(text){const el=document.createElement('article');el.className='message user';const name=document.createElement('p');name.className='message-name';name.textContent='雾雾';const bubble=document.createElement('div');bubble.className='bubble';bubble.textContent=text;el.append(name,bubble);messages.append(el);}
function appendReply(question,round){let variation=0;const el=document.createElement('article');el.className='message assistant';el.dataset.round=round.number;const name=document.createElement('p');name.className='message-name';name.textContent='祁煜';const bubble=document.createElement('div');bubble.className='bubble';bubble.textContent=interpretation(round,question,variation);const footer=document.createElement('div');footer.className='message-footer';const retry=document.createElement('button');retry.type='button';retry.className='reinterpret';retry.textContent='↻ 重新解读';retry.setAttribute('aria-label','重新解读这条回复，保留原牌组');const label=document.createElement('span');label.textContent=`第 ${round.number} 轮 · 固定牌组`;retry.addEventListener('click',()=>{bubble.textContent=interpretation(round,question,++variation);label.textContent=`第 ${round.number} 轮 · 同组牌，第 ${variation+1} 次解读`;notify('已保留这条回复的原牌组，换一个角度解读');});footer.append(retry,label);el.append(name,bubble,footer);messages.append(el);}
function scrollToLatest(){messages.lastElementChild?.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
let toastTimer;function notify(text){const el=document.querySelector('#toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,3200);}
document.querySelector('#redraw').addEventListener('click',()=>{const old=JSON.stringify(currentRound.cards);do{currentRound=draw();}while(JSON.stringify(currentRound.cards)===old);renderCards();appendReply('',currentRound);notify('已抽取新一轮牌组；旧回复仍保留各自的原牌组');});
input.addEventListener('input',()=>send.disabled=!input.value.trim());
document.querySelector('#chat-form').addEventListener('submit',e=>{e.preventDefault();const text=input.value.trim();if(!text)return;appendUser(text);appendReply(text,currentRound);input.value='';send.disabled=true;scrollToLatest();});
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing&&matchMedia('(min-width: 700px)').matches){e.preventDefault();document.querySelector('#chat-form').requestSubmit();}});
document.querySelector('#image-tool').addEventListener('click',()=>notify('图片入口已预留，当前版本暂不上传图片'));
document.querySelector('#link-tool').addEventListener('click',()=>notify('链接入口已预留，可先将链接粘贴到输入框'));
const emojiToggle=document.querySelector('#emoji-tool'),picker=document.querySelector('#emoji-picker');emojiToggle.addEventListener('click',()=>{picker.hidden=!picker.hidden;emojiToggle.setAttribute('aria-expanded',String(!picker.hidden));});picker.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{const start=input.selectionStart,end=input.selectionEnd;input.setRangeText(button.textContent,start,end,'end');input.dispatchEvent(new Event('input'));input.focus();picker.hidden=true;emojiToggle.setAttribute('aria-expanded','false');}));
currentRound=draw();renderCards();appendReply('',currentRound);
