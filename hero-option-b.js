(() => {
'use strict';
const hero=document.querySelector('.opening__first');
if(!hero||document.getElementById('l14-hero-slides'))return;
const style=document.createElement('style');
style.textContent=`
#opening .opening__first{color:white;min-height:90svh;align-items:center;padding:65px var(--pad) 105px;overflow:hidden}
#opening .opening__ground,#opening .wall{visibility:hidden}
#opening .opening__copy{grid-column:1/-1;position:relative;z-index:3;animation:none!important;translate:none!important;opacity:1!important;max-width:1050px;gap:30px}
#opening .opening__title{font-size:clamp(48px,8vw,112px);line-height:.96}
#opening .opening__lead{color:#e2ebf1;font-size:clamp(18px,2vw,25px)}
#opening .opening__copy .btn{background:#28a5e9;color:#07121a}
#opening .opening__copy .link{color:white}
.l14-slides,.l14-slide,.l14-shade,.l14-structure{position:absolute;inset:0}
.l14-slides{z-index:0;background:#243c4b}
.l14-slide{clip-path:inset(0 100% 0 0);transition:clip-path 1.2s cubic-bezier(.65,0,.35,1);overflow:hidden}
.l14-slide img{width:100%;height:100%;object-fit:cover;object-position:50% 55%;animation:none!important;scale:1!important;transform:none!important}
.l14-slide.is-visible{clip-path:inset(0)}
.l14-slide.no-transition{transition:none}
.l14-shade{z-index:1;background:linear-gradient(90deg,#000d,#0008 65%,#0005);pointer-events:none}
.l14-structure{inset:22px;z-index:2;border:1px solid #ffffff26;border-top-color:#28a5e9;pointer-events:none}
.l14-structure:before,.l14-structure:after{content:'';position:absolute;top:0;bottom:0;width:1px;background:#ffffff20}
.l14-structure:before{left:66%}.l14-structure:after{left:83%}
.l14-controls{position:absolute;left:var(--pad);right:var(--pad);bottom:25px;z-index:4;display:flex;flex-wrap:wrap;align-items:center;gap:10px}
.l14-controls button{font:inherit;font-size:13px;min-height:44px;padding:8px 13px;background:#0c0c0cbb;color:white;border:1px solid #ffffff85;cursor:pointer}
.l14-count{margin-left:auto;font-size:12px;color:white}
@media(max-width:800px){#opening .opening__first{display:flex;min-height:85svh;padding:55px var(--pad) 115px}#opening .wall{display:none}.l14-structure{inset:14px}.l14-controls{bottom:22px}}
@media(prefers-reduced-motion:reduce){.l14-slide{transition:none!important}}
`;
document.head.append(style);
const files=['Hero Section.jpg','448320631_381589838242467_3558822267490725755_n.jpg','454287302_415620131506104_5896173599323843769_n.jpg','480501350_559913030410146_3482554490678849654_n.jpg'];
const slides=document.createElement('div');slides.id='l14-hero-slides';slides.className='l14-slides';slides.setAttribute('aria-hidden','true');
const layers=files.map((file,i)=>{const layer=document.createElement('div');layer.className='l14-slide'+(i===0?' is-visible':'');const image=new Image();image.alt='';image.src='images/'+encodeURIComponent(file);image.decoding='async';if(i===0)image.fetchPriority='high';layer.append(image);slides.append(layer);return layer});
hero.prepend(slides);
for(const name of ['l14-shade','l14-structure']){const el=document.createElement('div');el.className=name;el.setAttribute('aria-hidden','true');hero.append(el)}
const controls=document.createElement('div');controls.className='l14-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','Hero photograph controls');
function button(label,handler){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',handler);controls.append(b);return b}
const preference=matchMedia('(prefers-reduced-motion: reduce)');
let current=0,playing=!preference.matches,timer=null,busy=false,order=1;
const pause=button('Pause slideshow',()=>{playing=!playing;sync()});
button('Previous',()=>{stop();show(-1)});button('Next',()=>{stop();show(1)});
const count=document.createElement('span');count.className='l14-count';count.textContent='01 / 04';count.setAttribute('aria-live','off');controls.append(count);hero.append(controls);
function stop(){playing=false;sync()}
function sync(){clearTimeout(timer);timer=null;pause.textContent=playing?'Pause slideshow':'Play slideshow';if(playing&&!document.hidden)timer=setTimeout(async()=>{await show(1);sync()},6500)}
async function show(direction){if(busy)return;busy=true;try{let next=(current+direction+layers.length)%layers.length;let loaded=false;for(let tries=0;tries<layers.length-1;tries++){const image=layers[next].querySelector('img');try{await image.decode();loaded=image.naturalWidth>0}catch(e){loaded=false}if(loaded)break;next=(next+direction+layers.length)%layers.length}if(!loaded||next===current)return;const outgoing=layers[current],incoming=layers[next];incoming.classList.add('no-transition');incoming.classList.remove('is-visible');incoming.style.zIndex=String(++order);void incoming.offsetWidth;incoming.classList.remove('no-transition');incoming.classList.add('is-visible');await new Promise(resolve=>setTimeout(resolve,preference.matches?0:1250));outgoing.classList.add('no-transition');outgoing.classList.remove('is-visible');current=next;count.textContent=String(current+1).padStart(2,'0')+' / 04'}finally{busy=false}}
hero.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')stop()});
hero.addEventListener('focusin',e=>{if(e.target!==pause)stop()});
hero.addEventListener('focusout',e=>{if(e.target===pause&&!hero.contains(e.relatedTarget))stop()});
preference.addEventListener('change',stop);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop()},{threshold:0}).observe(hero);
sync();
})();
