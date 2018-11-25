const form = <HTMLFormElement>document.querySelector(".js-form"),
  input = <HTMLInputElement>form.querySelector("input"),
  greeting = <HTMLHeadingElement>document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // not
  } else {
    paintGreeting(currentUser);
  }
}

function initGreeting() {
  loadName();
}

initGreeting();
