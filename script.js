
(function(){
const cfg = window.__MUMET_CONFIG || {};
const videoIds = ['dQw4w9WgXcQ','kXYiU_JCYtU','3JZ_D3ELwOQ','LsoLEjrDogU','fLexgOxsZu0','nCkpzqqog4k','5qap5aO4i9A','IcrbM1l_BoI','sCNrK-n68CM','hTWKbfoikeg'];
let muted=true; let idx=0;
const frame=document.getElementById('ytFrame'); const playlist=document.getElementById('playlist');
function setYt(id, autoplay=true){ frame.src='https://www.youtube.com/embed/'+id+'?autoplay='+(autoplay?1:0)+'&mute='+(muted?1:0)+'&rel=0'; }
function pickRandom(){ idx=Math.floor(Math.random()*videoIds.length); setYt(videoIds[idx]); playlist.value=videoIds[idx]; }
document.getElementById('randBtn').addEventListener('click', pickRandom);
document.getElementById('muteBtn').addEventListener('click', ()=>{ muted=!muted; pickRandom(); });
videoIds.forEach(id=>{ const o=document.createElement('option'); o.value=id; o.textContent=id; playlist.appendChild(o); });
playlist.addEventListener('change', ()=> setYt(playlist.value,true));

// search
document.getElementById('ytSearchBtn').addEventListener('click', ()=> doSearch());
document.getElementById('ytQuery').addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); doSearch(); } });
function doSearch(){
  const q=document.getElementById('ytQuery').value.trim(); const out=document.getElementById('ytResults'); out.innerHTML='';
  if(!q){ out.innerText='Masukkan kata pencarian.'; return; }
  // open YouTube results in new tab + show a few quick suggestions (no API)
  window.open('https://www.youtube.com/results?search_query='+encodeURIComponent(q),'_blank');
  out.innerHTML='<div class="yt-result">Hasil dibuka di YouTube (tab baru). Gunakan pilihan untuk putar cepat.</div>';
}

// embed handling
document.getElementById('showEmbed').addEventListener('click', ()=>{
  const v=document.getElementById('embedInput').value.trim(); const out=document.getElementById('embedOut');
  if(!v){ alert('Masukkan URL atau kode embed'); return; }
  if(v.startsWith('<iframe')||v.includes('instagram')||v.includes('<blockquote')){ out.innerHTML=v; return; }
  if(v.includes('tiktok.com')){ out.innerHTML='<iframe src="'+v+'" style="width:100%;height:500px;border:0"></iframe>'; return; }
  if(v.includes('instagram.com')){ window.open(v,'_blank'); return; }
  out.innerHTML='<a href="'+v+'" target="_blank" rel="noopener">'+v+'</a>';
});
document.getElementById('clearEmbed').addEventListener('click', ()=>{ document.getElementById('embedInput').value=''; document.getElementById('embedOut').innerHTML=''; });

// AI demo local
document.getElementById('aiBtn').addEventListener('click', ()=>{
  const t=document.getElementById('aiInput').value.trim(); const out=document.getElementById('aiOut');
  if(!t){ out.innerText='Tuliskan pertanyaan'; return; }
  const low=t.toLowerCase();
  if(low.includes('lagu')||low.includes('musik')){ out.innerText='Coba klik Putar Random.'; return; }
  if(low.includes('motiv')||low.includes('semangat')){ out.innerText='Kamu bisa — mulai dari satu langkah kecil hari ini.'; return; }
  out.innerText='AI (demo): '+t+'\n(Tip: deploy proxy & set PROXY_URL in config.js untuk AI nyata)';
});
document.getElementById('aiClear').addEventListener('click', ()=>{ document.getElementById('aiInput').value=''; document.getElementById('aiOut').innerText=''; });

// quotes and notifications
const quotes=['Kesuksesan dimulai dari langkah kecil','Jangan menyerah — mulai hari ini','Satu langkah kecil setiap hari menghasilkan kemajuan'];
document.getElementById('quoteBtn').addEventListener('click', ()=> document.getElementById('quoteBox').innerText=quotes[Math.floor(Math.random()*quotes.length)]);
let notifyEnabled=false, notifyInterval=null;
document.getElementById('notifyToggle').addEventListener('click', ()=>{
  if(!('Notification' in window)){ alert('Browser tidak mendukung notifikasi'); return; }
  if(Notification.permission==='default'){ Notification.requestPermission().then(p=>{ if(p==='granted') startNotify(); else alert('Notifikasi ditolak'); }); return; }
  if(Notification.permission==='granted'){ if(notifyEnabled) stopNotify(); else startNotify(); }
});
function startNotify(){ notifyEnabled=true; document.getElementById('notifyToggle').innerText='Matikan Notifikasi'; showMotivation(); notifyInterval=setInterval(showMotivation,3600000); }
function stopNotify(){ notifyEnabled=false; document.getElementById('notifyToggle').innerText='Aktifkan Notifikasi'; clearInterval(notifyInterval); }
function showMotivation(){ const m=quotes[Math.floor(Math.random()*quotes.length)]; if(Notification.permission==='granted') new Notification('Mumet', {body:m}); else alert(m); }

// theme & pwa
const themeToggle=document.getElementById('themeToggle'); themeToggle.addEventListener('click', ()=>{ document.body.classList.toggle('dark'); themeToggle.innerText=document.body.classList.contains('dark')?'☀️':'🌙'; });

// autoplay random on load
window.addEventListener('load', ()=>{ pickRandom(); });

// register sw
if('serviceWorker' in navigator){ navigator.serviceWorker.register('/service-worker.js').catch(()=>console.warn('SW register failed')); }
})();