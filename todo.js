var todo = (function () {
    var doc = document;
    var form = doc.querySelector(".js-form-todo"), input = form.querySelector("input"), list = doc.querySelector(".js-ul-todo");
    var TODOS_LS = "toDos";
    var toDos = [];
    function setToDos() {
        localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    }
    function paintTodo(text) {
        var li = doc.createElement("li"), delBtn = doc.createElement("button"), span = doc.createElement("span"), id = String(toDos.length + 1);
        delBtn.innerText = "❌";
        span.innerText = text;
        li.id = id;
        li.appendChild(delBtn);
        li.appendChild(span);
        list.appendChild(li);
        var toDoObj = {
            id: id,
            text: text
        };
        toDos.push(toDoObj);
        setToDos();
    }
    function handleSubmit(event) {
        event.preventDefault();
        var currentValue = input.value;
        paintTodo(currentValue);
    }
    function loadToDos() {
        var loadedToDos = localStorage.getItem(TODOS_LS);
        if (loadedToDos !== null) {
            var parsedToDos = JSON.parse(loadedToDos);
            parsedToDos.forEach(function (toDo) {
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
