
const CACHE='special-cache-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/index.html','/style.css','/script.js','/offline.html'])))});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)).catch(()=>caches.match('/offline.html')))});
