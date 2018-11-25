var clockContainer = document.querySelector(".js-clock"), clockTitle = clockContainer.querySelector("h1");
function addZero(number) {
    return number < 10 ? "0" + number : number;
}
function getTime() {
    var date = new Date();
    var minutes = addZero(date.getMinutes());
    var hours = addZero(date.getHours());
    var seconds = addZero(date.getSeconds());
    clockTitle.innerHTML = hours + ":" + minutes + ":" + seconds;
}
function init() {
    setInterval(getTime, 1000);
}
init();
