// 浮生無界 V7.4 service worker: 不快取 AI API、不快取玩家資料。
const VERSION='fusheng-v82-world-integrity-1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(x=>(x.startsWith('fusheng-v72-')||x.startsWith('fusheng-v73-')||x.startsWith('fusheng-v74-')||x.startsWith('fusheng-v75-')||x.startsWith('fusheng-v80-')||x.startsWith('fusheng-v82-')||x.startsWith('fusheng-v81-'))&&x!==VERSION).map(x=>caches.delete(x)));await self.clients.claim();})()));
self.addEventListener('message',e=>{if(e.data?.type==='CACHE_OFFLINE')e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)))});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){
  e.respondWith((async()=>{try{const resp=await fetch(e.request);if(resp.ok){const c=await caches.open(VERSION);await c.put('./index.html',resp.clone())}return resp}catch{return await caches.match('./index.html')||await caches.match('./')||Response.error()}})());return;
 }
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));
});
