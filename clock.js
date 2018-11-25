var clock = (function () {
    var doc = document;
    var clockContainer = doc.querySelector(".js-clock"), clockTitle = clockContainer.querySelector("h1");
    function addZero(number) {
        return number < 10 ? "0" + number : number;
    }
    function init() {
        var date = new Date();
        var minutes = addZero(date.getMinutes());
        var hours = addZero(date.getHours());
        var seconds = addZero(date.getSeconds());
        clockTitle.innerHTML = hours + ":" + minutes + ":" + seconds;
    }
    setInterval(init, 1000);
})();
