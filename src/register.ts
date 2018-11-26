const sw = (function() {
  function init() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("../sw.js");
    }
  }

  init();
})();
