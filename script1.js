const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#yr').textContent=new Date().getFullYear();
addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('done'),400));

// Theme (remembers choice)
const root=document.documentElement;
try{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t}catch(e){}
const setIcon=()=>$('#theme').textContent=root.dataset.theme==='dark'?'☀️':'🌙';setIcon();
$('#theme').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}setIcon()};

// Mobile menu
$('#menu').onclick=()=>{const o=$('#links').classList.toggle('open');$('#menu').setAttribute('aria-expanded',o)};
$$('#links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));

// Typing role
const roles=['Information Technology Student','Aspiring Web Developer','UI/UX Enthusiast','Future Full Stack Developer'];
let ri=0,ci=0,del=false;const el=$('#role');
function type(){const w=roles[ri];el.textContent=w.slice(0,ci);
  if(!del&&ci===w.length){del=true;return setTimeout(type,1600)}
  if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
  ci+=del?-1:1;setTimeout(type,del?35:70)}
matchMedia('(prefers-reduced-motion:reduce)').matches?el.textContent=roles[0]:type();

// Scroll reveal + skill bars
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
  if(e.target.id==='bars')$$('.fill').forEach(f=>f.style.width=f.dataset.w+'%');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(e=>io.observe(e));

// Active nav link + progress bar + back-to-top
const secs=$$('main section'),links=$$('#links a');
addEventListener('scroll',()=>{
  const y=scrollY,h=document.body.scrollHeight-innerHeight;
  $('#bar').style.width=(y/h*100)+'%';
  $('#top').classList.toggle('show',y>600);
  let cur=secs[0].id;secs.forEach(s=>{if(y>=s.offsetTop-140)cur=s.id});
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});
$('#top').onclick=()=>scrollTo({top:0});

// Project filter
$$('.filters button').forEach(b=>b.onclick=()=>{
  $$('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  $$('.proj').forEach(p=>p.classList.toggle('hide',b.dataset.f!=='all'&&!p.dataset.c.includes(b.dataset.f)))});

// Contact form opens the visitor's email app
$('#form').onsubmit=e=>{e.preventDefault();
  const b=encodeURIComponent(`${$('#m').value}\n\nFrom: ${$('#n').value} (${$('#e').value})`);
  location.href=`mailto:neea.niang@gmail.com?subject=Hello from your CV site&body=${b}`;
  $('#msg').textContent='Opening your email app…'};
