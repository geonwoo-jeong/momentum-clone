self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open("v1").then(cache => {
      return cache.addAll([
        "/dist",
        "/dist/bg.js",
        "/dist/clock.js",
        "/dist/greetings.js",
        "/dist/todo.js",
        "/dist/weather.js",
        "/images",
        "/images/1.jpg",
        "/images/2.jpg",
        "/images/3.jpg",
        "/index.html",
        "/index.css"
      ]);
    })
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    fetch(event.request).catch(error => {
      caches.open("momentum").then(cache => cache.match("/"));
    })
  );
});
