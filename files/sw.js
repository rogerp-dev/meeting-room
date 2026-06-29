const CHECK_INTERVAL = 60000;

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

let checkTimer = null;

function startChecking() {
  if (checkTimer) clearInterval(checkTimer);
  checkTimer = setInterval(checkDeadlines, CHECK_INTERVAL);
}

async function checkDeadlines() {
  const clients = await self.clients.matchAll({ type: 'window' });
  if (clients.length === 0) return;
  clients.forEach(c => c.postMessage({ type: 'CHECK_DEADLINES' }));
}

self.addEventListener('message', e => {
  if (e.data?.type === 'START_WORKER') startChecking();
  if (e.data?.type === 'NOTIFY') {
    const { title, body, tag } = e.data;
    self.registration.showNotification(title, {
      body,
      tag,
      icon: 'https://www.gstatic.com/images/icons/material/system/2x/meeting_room_black_24dp.png',
      badge: 'https://www.gstatic.com/images/icons/material/system/2x/meeting_room_black_24dp.png',
      requireInteraction: true,
      actions: [{ action: 'open', title: 'Abrir painel' }]
    });
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(cls => {
      if (cls.length > 0) { cls[0].focus(); return; }
      self.clients.openWindow('./');
    })
  );
});
