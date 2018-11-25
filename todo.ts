const todo = (function() {
  interface ToDoObj {
    id: string;
    text: String;
  }

  const doc = document;
  const form = <HTMLFormElement>doc.querySelector(".js-form-todo"),
    input = <HTMLInputElement>form.querySelector("input"),
    list = <HTMLUListElement>doc.querySelector(".js-ul-todo");

  const TODOS_LS = "toDos";
  const toDos: ToDoObj[] = [];

  function setToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

  function paintTodo(text) {
    const li = <HTMLLIElement>doc.createElement("li"),
      delBtn = <HTMLButtonElement>doc.createElement("button"),
      span = <HTMLSpanElement>doc.createElement("span"),
      id = String(toDos.length + 1);

    delBtn.innerText = "❌";
    span.innerText = text;
    li.id = id;
    li.appendChild(delBtn);
    li.appendChild(span);
    list.appendChild(li);

    const toDoObj: ToDoObj = {
      id,
      text
    };

    toDos.push(toDoObj);
    setToDos();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintTodo(currentValue);
  }

  function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if (loadedToDos !== null) {
      const parsedToDos: ToDoObj[] = JSON.parse(loadedToDos);

      parsedToDos.forEach(toDo => {
        paintTodo(toDo.text);
      });
    }
  }

  function init() {
    loadToDos();
    form.addEventListener("submit", handleSubmit);
  }

  init();
})();
