var form = document.querySelector(".js-form"), input = form.querySelector("input"), greeting = document.querySelector(".js-greetings");
var USER_LS = "currentUser", SHOWING_CN = "showing";
function setName(name) {
    localStorage.setItem(USER_LS, name);
}
function handleSubmit(event) {
    event.preventDefault();
    var currentName = input.value;
    paintGreeting(currentName);
    setName(currentName);
}
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = "Hello " + text;
}
function loadName() {
    var currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    }
    else {
        paintGreeting(currentUser);
    }
}
function initGreeting() {
    loadName();
}
initGreeting();
