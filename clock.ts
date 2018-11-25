const clock = (function() {
  const doc = document;
  const clockContainer = <HTMLDivElement>doc.querySelector(".js-clock"),
    clockTitle = <HTMLHeadingElement>clockContainer.querySelector("h1");

  function addZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  function init() {
    const date = new Date();
    const minutes = addZero(date.getMinutes());
    const hours = addZero(date.getHours());
    const seconds = addZero(date.getSeconds());
    clockTitle.innerHTML = `${hours}:${minutes}:${seconds}`;
  }

  setInterval(init, 1000);
})();
