/*
Notice that PWAs run only on https because the service worker can access
the request and handle it. Therefore security is required.

A service worker is a script that your browser runs in the background in a
separate thread. That means it runs in a different place and is completely separate from your web page. That's the reason why it can't manipulate your DOM element.

The service worker can intercept and handle network requests, manage the cache to enable offline support or send push notifications to your users.
*/

const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg"
];
// Store all assets in the local cache
// self is the service worker
// only runs once for each service worker
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Fetch the assets
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
// also need to register the service working in app.js
