var todo = (function () {
    var doc = document;
    var form = doc.querySelector(".js-form-todo"), input = form.querySelector("input"), list = doc.querySelector(".js-ul-todo");
    var TODOS_LS = "toDos";
    function paintTodo(text) {
        var li = doc.createElement("li"), delBtn = doc.createElement("button"), span = doc.createElement("span");
        delBtn.innerText = "❌";
        span.innerText = text;
        li.appendChild(delBtn);
        li.appendChild(span);
        list.appendChild(li);
    }
    function handleSubmit(event) {
        event.preventDefault();
        var currentValue = input.value;
        paintTodo(currentValue);
    }
    function loadToDos() {
        var toDos = localStorage.getItem(TODOS_LS);
        if (toDos !== null) {
        }
    }
    function init() {
        loadToDos();
        form.addEventListener("submit", handleSubmit);
    }
    init();
})();
