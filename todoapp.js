const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');
let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
});
function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject ={
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodo();
        todoInput.value = "";
        
    }
}
function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) =>{
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })

}
function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+ todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className= "todo";
    todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}" ${todo.completed ? 'checked':''}>
        <label for="${todoId}" class="custom-checkbox">
        <svg fill="transparent" 
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M5 11.917 9.724 16.5 19 7.5"/>
        </svg>                      
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
            </svg> 
        </button>
        `;
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
          deleteTodoItem(todoIndex);  
});
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodo();
    });
    checkbox.checked = todo.completed;
return todoLI;
}
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodo();
    updateTodoList();
}
function saveTodo(){
    try{
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
    }catch(error){
        console.error("Error saving todos", error);
        return [];
    }
}
function getTodos(){
    try{
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
    }catch(error){
        console.error("Error getting todos", error);
        return [];
    }
}
