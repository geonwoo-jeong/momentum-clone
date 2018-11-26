const bg = (function() {
  const doc = <HTMLDocument>document,
    body = <HTMLBodyElement>doc.querySelector("body");

  const IMG_NUMBER = 3;

  function paintImage(number: number) {
    const image = new Image();
    image.src = `images/${number + 1}.jpg`;
    image.classList.add("bg-image");
    body.prepend(image);
  }

  function genRandom() {
    return Math.floor(Math.random() * IMG_NUMBER);
  }

  function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
  }
  init();
})();
