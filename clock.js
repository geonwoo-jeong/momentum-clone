var clockContainer = document.querySelector(".js-clock"), clockTitle = clockContainer.querySelector("h1");
function getTime() {
    var date = new Date();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    clockTitle.innerHTML = hours + ":" + minutes + ":" + seconds;
}
function init() {
    getTime();
}
init();
