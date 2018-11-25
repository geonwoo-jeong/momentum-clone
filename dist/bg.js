var bg = (function () {
    var doc = document, body = doc.querySelector("body");
    var IMG_NUMBER = 3;
    function paintImage(number) {
        var image = new Image();
        image.src = "images/" + (number + 1) + ".jpg";
        image.classList.add("bg-image");
        body.prepend(image);
    }
    function genRandom() {
        return Math.floor(Math.random() * IMG_NUMBER);
    }
    function init() {
        var randomNumber = genRandom();
        paintImage(randomNumber);
    }
    init();
})();
