/* tslint:disable */
self.addEventListener("install", function (event) {
  console.log('V1 installing…');
  fetch("client/manifest-assets.json", {
    method: "GET",
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      console.error(`Manifest request return ${res.status} code`);
    }
  }).then(function (manifestAssets) {
    const arr = [];
    for (const key in manifestAssets) {
      if (manifestAssets.hasOwnProperty(key)) {
        const element = manifestAssets[key];
        arr.push(element);
      }
    }
    try {
      event.waitUntil(
        caches.open("v1").then(cache => {
          return cache.addAll([
            "/",
            "favicon.ico",
            ...arr
          ]);
        })
      );
    } catch (e) {
      console.log(e);
    }

  })
});

self.addEventListener('activate', function (event) {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener("fetch", function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        const responseClone = response.clone();

        caches.open("v1").then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function (err) {
        console.log(`Fetch error: ${err.message}\r\n${err.stack}`);

        throw err;
      });
    }
  }));
});
/* tslint:enable */
