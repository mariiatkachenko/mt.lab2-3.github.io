const todoList = document.getElementById('todo-list');
const totalTasksSpan = document.getElementById('total-tasks');
const inProgressSpan = document.getElementById('in-progress');
const todoInput = document.getElementById('todo-input');

let todos = [];

// Функція для збереження задач в localStorage
function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Функція для завантаження задач з localStorage
function loadFromLocalStorage() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
}

// Завантаження задач при першому завантаженні сторінки
loadFromLocalStorage();
render();
updateCounter();

function newTodo() {
  const taskText = todoInput.value.trim();
  if (taskText) {
    const newTodo = {
      id: Date.now(),
      text: taskText,
      isChecked: false
    };
    todos.push(newTodo);
    todoInput.value = '';
    render();
    updateCounter();
    saveToLocalStorage();
  }
}

function renderTodo(todo) {
  return `
    <li class="todo-item">
      <input type="checkbox" id="todo-${todo.id}" ${todo.isChecked ? 'checked' : ''} onclick="checkTodo(${todo.id})">
      <label for="todo-${todo.id}" class="todo-text">${todo.text}</label>
      <button class="todo-delete" onclick="deleteTodo(${todo.id})">Delete</button>
    </li>
  `;
}

function render() {
  todoList.innerHTML = todos.map(renderTodo).join('');
}

function updateCounter() {
  const totalTasks = todos.length;
  const inProgress = todos.filter(todo => !todo.isChecked).length;

  totalTasksSpan.textContent = `Total tasks: ${totalTasks}`;
  inProgressSpan.textContent = `In progress: ${inProgress}`;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
  saveToLocalStorage();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  todo.isChecked = !todo.isChecked;
  render();
  updateCounter();
  saveToLocalStorage();
}
