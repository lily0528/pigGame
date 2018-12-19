let staticCache = 'pig-cache-6'

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache).then(function(cache) {
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
          '/index.html',
          '/',
        ]
      );
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('pig-') && cacheName !== staticCache
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});