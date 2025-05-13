// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    li.innerHTML = `
      <span>${taskText}</span>
      <button onclick="deleteTask(this)">Delete</button>
      <button onclick="toggleCompletion(this)">Complete</button>
    `;

    taskList.appendChild(li);
    saveTask(taskText);

    taskInput.value = ""; // Clear input
  }
}

function deleteTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();
  removeTaskFromStorage(taskItem.textContent.trim());
}

function toggleCompletion(button) {
  const taskItem = button.parentElement;
  taskItem.classList.toggle('completed');
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <button onclick="deleteTask(this)">Delete</button>
      <button onclick="toggleCompletion(this)">Complete</button>
    `;
    taskList.appendChild(li);
  });
}
