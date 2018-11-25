const clockContainer = <HTMLDivElement>document.querySelector(".js-clock"),
  clockTitle = <HTMLHeadingElement>clockContainer.querySelector("h1");

function addZero(number) {
  return number < 10 ? `0${number}` : number;
}

function getTime() {
  const date = new Date();
  const minutes = addZero(date.getMinutes());
  const hours = addZero(date.getHours());
  const seconds = addZero(date.getSeconds());
  clockTitle.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function initClock() {
  setInterval(getTime, 1000);
}

initClock();
