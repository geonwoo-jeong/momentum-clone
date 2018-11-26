self.addEventListener("install", function (event) {
    event.waitUntil(caches.open("v1").then(function (cache) {
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
    }));
});
self.addEventListener("fetch", function (event) {
    event.respondWith(fetch(event.request)["catch"](function (error) {
        caches.open("momentum").then(function (cache) { return cache.match("/"); });
    }));
});
