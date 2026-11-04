const VERSION='fusheng-v972-npc-interaction-20261104';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('fusheng-')&&k!==VERSION).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;if(event.request.mode==='navigate')event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));else event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)))});
