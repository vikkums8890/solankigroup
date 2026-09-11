// Never cache transcripts, API responses, profiles or appointment data.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>event.waitUntil(self.registration.showNotification('SolankiGroup',{body:'आपकी enquiry या appointment पर नया update है। Saved chat खोलें।',icon:'./icon-192.png',badge:'./icon-192.png',tag:'solankigroup-update',data:{url:self.registration.scope},renotify:true})));
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil((async()=>{const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});const existing=windows.find(w=>w.url.startsWith(self.registration.scope));if(existing)return existing.focus();return self.clients.openWindow(self.registration.scope);})());});
