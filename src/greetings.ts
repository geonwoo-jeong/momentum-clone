const greetings = (function() {
  const doc = <HTMLDocument>document;
  const form = <HTMLFormElement>doc.querySelector(".js-form-greetings"),
    input = <HTMLInputElement>form.querySelector("input"),
    greetings = <HTMLHeadingElement>doc.querySelector(".js-greetings");

  const USER_LS = "currentUser",
    SHOWING_CN = "showing";

  function setName(name: string) {
    localStorage.setItem(USER_LS, name);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const currentName = input.value;
    paintGreetings(currentName);
    setName(currentName);
  }

  function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
  }

  function paintGreetings(text: string) {
    form.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    greetings.innerHTML = `Hello ${text}`;
  }

  function init() {
    const currentUser = localStorage.getItem(USER_LS);

    if (currentUser === null) {
      askForName();
    } else {
      paintGreetings(currentUser);
    }
  }

  init();
})();
