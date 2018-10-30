const staticCacheName = 'v1';

const itemsCached = [
  'index.html',
  'restaurant.html',
  'README.md',
  'css/styles.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(itemsCached);
    })
    .catch(function(error) {
      console.log(error);
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
      return fetch(event.request)
      .then(function(response){
        const resp = response.clone();
        caches.open(staticCacheName).then(function(cache) {
          cache.put(event.request, resp);
        })
        return response;
      })            
    })
  );
});