const todo = (function() {
  const doc = document;
  const form = <HTMLFormElement>doc.querySelector(".js-form-todo"),
    input = <HTMLInputElement>form.querySelector("input"),
    list = <HTMLUListElement>doc.querySelector(".js-ul-todo");

  const TODOS_LS = "toDos";

  function paintTodo(text) {
    const li = <HTMLLIElement>doc.createElement("li"),
      delBtn = <HTMLButtonElement>doc.createElement("button"),
      span = <HTMLSpanElement>doc.createElement("span");

    delBtn.innerText = "❌";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    list.appendChild(li);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintTodo(currentValue);
  }

  function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS);
    if (toDos !== null) {
    }
  }

  function init() {
    loadToDos();
    form.addEventListener("submit", handleSubmit);
  }

  init();
})();
