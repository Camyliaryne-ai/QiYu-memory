'use strict';
// Read the supplied metadata by name; asset IDs never replace the existing deck IDs.
const TarotImages = Object.create(null);
async function loadTarotImages() {
 const response=await fetch('tarot-cards.json');
 if(!response.ok) throw new Error('牌图映射加载失败：'+response.status);
 const metadata=await response.json();
 if(metadata.cards.length!==78) throw new Error('牌图映射数量不是78');
 for(const card of metadata.cards){
  if(!/^tarot-cards\/[a-z]+\/[a-z0-9-]+\.webp$/.test(card.image)) throw new Error('不支持的牌图路径');
  for(const name of [card.name,...card.aliases]) TarotImages[name]=card.image;
 }
 TarotImages['隐者']=TarotImages['隐士'];
 const script=document.createElement('script');script.src='app.js';document.head.append(script);
}
function makeTarotImage(card, className) {
 const name=TarotData.cards[card.id].name;
 const src=TarotImages[name];
 if(!src) throw new Error('缺失牌图映射：'+name);
 const image=document.createElement('img');
 image.src=src; image.alt=name+' · '+(card.reversed?'逆位':'正位');
 image.className=className+(card.reversed?' reversed':'');
 image.width=139; image.height=243; image.decoding='async';
 image.addEventListener('error',()=>{image.alt='牌图加载失败：'+name;console.error(image.alt,src);});
 return image;
}

loadTarotImages().catch(error=>{
 console.error(error);
 document.querySelector('#cards').textContent='牌图加载失败，请刷新重试';
 document.querySelector('#message').disabled=true;
});
