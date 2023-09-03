// my-todo-app/frontend/script.js
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

async function addTask() {
  const description = taskInput.value;
  if (!description) return;

  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  if (response.ok) {
    const data = await response.json();
    const listItem = document.createElement('li');
    listItem.textContent = data.description;
    taskList.appendChild(listItem);
    taskInput.value = '';
  } else {
    console.error('Error adding task');
  }
}

async function fetchTasks() {
  const response = await fetch('/api/tasks');
  if (response.ok) {
    const tasks = await response.json();
    tasks.forEach((task) => {
      const listItem = document.createElement('li');
      listItem.textContent = task.description;
      taskList.appendChild(listItem);
    });
  } else {
    console.error('Error fetching tasks');
  }
}

fetchTasks();

