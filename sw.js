let staticCacheName = 'restaurant-static-vs1';

//Let cache some files
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			console.log('Cached: '+ staticCacheName);
			return cache.addAll([
				'./',
				'./index.html',
				'./restaurant.html',
				'./css/styles.css',
				'./data/restaurants.json',
				'./js/dbhelper.js',
				'./js/main.js',
				'./js/restaurant_info.js',
				'./js/sw_controller.js',
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg',
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/9.jpg',
				'./img/10.jpg'
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-static-vs') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

//Fetch Cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
      	return response;
      }
      else{
      	return fetch(event.request)
      	.then(function(response){
      		let respClone = response.clone();
      		catches.open(staticCacheName)
      		.then(function(cache){
      			cache.put(event.request, respClone);
      		})
      		return response;
      	})
      	.catch(function(error){
      		console.log(error);
      	})
      }
    })
  );
});