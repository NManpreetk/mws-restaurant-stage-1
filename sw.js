var filesToCache = [
    '/',
    './css/styles.css',
    './data/restaurants.json',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurat_info.js',
    './index.html',
    './restaurant.html',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
];

var staticCacheName = 'pages-cache';

self.addEventListener('install', function (event) {
    console.log('installing');
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            console.log('caching')
            return cache.addAll(filesToCache);
        })
    )
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request);
        }).catch((error) => {
            console.log(error);
        })
    );
});