 var PRECACHE_URLS = [
    '/',
    //html file
    'index.html',
    //html manifest pointer
    'index.html?homescreen=1',
    '?homescreen=1',
    //css file
    'bulma.min.css',
    //javascript
    'index.js',
    //assets or images
    'public-transport-icon.png' 
 ];
var cacheName, contentToCache;

 //Installing Service Worker
 self.addEventListener('install', function(e){
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(contentToCache);
        }) 
    );
 });

 //Fetching content using Service Worker
 self.addEventListener('fetch', function(e){
     e.respondWith(
         caches.match(e.request).then(function(r){
             console.log('[Service Worker] Fetching respurces: '+ e.request.url);
             return r || fetch(e.request).then(function(response){
                 return caches.open(cacheName).then(function(cache){
                     console.log('[Service Worker] Caching new resources: '+ e.request.url);
                     cache.put(e.request, request.clone());
                     return response;
                 });
             });
         })
     )
 });