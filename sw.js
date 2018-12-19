self.addEventListener('install', event => {
  console.log('A new service worker is installing...');
  let cacheName = 'cache-1'

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          'css/style.css',
          'js/app.js',
          'images/back.jpg',
          'images/dice-1.png',
          'images/dice-2.png',
          'images/dice-3.png',
          'images/dice-4.png',
          'images/dice-5.png',
          'images/dice-6.png',
          '/'
        ]
      );
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activatisng...');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});