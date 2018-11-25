const form = <HTMLFormElement>document.querySelector(".js-form"),
  input = <HTMLInputElement>form.querySelector("input"),
  greeting = <HTMLHeadingElement>document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function setName(name) {
  localStorage.setItem(USER_LS, name);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentName = input.value;
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
  greeting.innerHTML = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function initGreeting() {
  loadName();
}

initGreeting();
