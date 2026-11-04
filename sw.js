const VERSION='fusheng-v911-venue-payment-1104',FILES=['./','./index.html','./manifest.webmanifest','./icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(x=>x.startsWith('fusheng-')&&x!==VERSION).map(x=>caches.delete(x)));await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;if(e.request.mode==='navigate')e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html')));else e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
