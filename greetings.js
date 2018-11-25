var greetings = (function () {
    var doc = document;
    var form = doc.querySelector(".js-form-greetings"), input = form.querySelector("input"), greetings = doc.querySelector(".js-greetings");
    var USER_LS = "currentUser", SHOWING_CN = "showing";
    function setName(name) {
        localStorage.setItem(USER_LS, name);
    }
    function handleSubmit(event) {
        event.preventDefault();
        var currentName = input.value;
        paintGreetings(currentName);
        setName(currentName);
    }
    function askForName() {
        form.classList.add(SHOWING_CN);
        form.addEventListener("submit", handleSubmit);
    }
    function paintGreetings(text) {
        form.classList.remove(SHOWING_CN);
        greetings.classList.add(SHOWING_CN);
        greetings.innerHTML = "Hello " + text;
    }
    function loadName() {
        var currentUser = localStorage.getItem(USER_LS);
        console.log(currentUser);
        if (currentUser === null) {
            askForName();
        }
        else {
            paintGreetings(currentUser);
        }
    }
    loadName();
})();
