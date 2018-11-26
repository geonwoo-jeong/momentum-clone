const todo = (function() {
  interface ToDoObj {
    id: string;
    text: string;
  }

  const doc = <HTMLDocument>document;
  const form = <HTMLFormElement>doc.querySelector(".js-form-todo"),
    input = <HTMLInputElement>form.querySelector("input"),
    list = <HTMLUListElement>doc.querySelector(".js-ul-todo");

  const TODOS_LS = "toDos";
  let toDos: ToDoObj[] = [];

  function removeToDo(event: any) {
    const li = event.target.parentNode;
    list.removeChild(li);
    const cleanToDos = toDos.filter(todo => todo.id !== li.id);
    toDos = cleanToDos;
    setToDos();
  }

  function setToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

  function paintTodo(text: string) {
    const li = <HTMLLIElement>doc.createElement("li"),
      delBtn = <HTMLButtonElement>doc.createElement("button"),
      span = <HTMLSpanElement>doc.createElement("span"),
      id = String(toDos.length + 1);

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", removeToDo);

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

  function handleSubmit(event: any) {
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
