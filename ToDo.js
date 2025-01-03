let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskCategory = document.getElementById("taskCategory");
  const taskPriority = document.getElementById("taskPriority");

  if (taskInput.value.trim() === "") {
    alert("Task description cannot be empty!");
    return;
  }

  const newTask = {
    id: Date.now(),
    description: taskInput.value.trim(),
    date: taskDate.value,
    category: taskCategory.value,
    priority: taskPriority.value,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
}

function renderTasks(filter = "all", searchQuery = "") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "pending") filteredTasks = tasks.filter((task) => !task.completed);
  if (filter === "completed") filteredTasks = tasks.filter((task) => task.completed);

  if (searchQuery) {
    filteredTasks = filteredTasks.filter((task) =>
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  filteredTasks.sort((a, b) => {
    const priorities = { High: 3, Medium: 2, Low: 1 };
    return priorities[b.priority] - priorities[a.priority];
  });

  for (const task of filteredTasks) {
    const listItem = document.createElement("li");
    listItem.className = `task ${task.completed ? "completed" : ""}`;
    listItem.innerHTML = `
      <span class="${task.priority.toLowerCase()}-priority">${task.description} (${task.category}, ${task.date})</span>
      <div>
        <button onclick="toggleTask(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(listItem);
  }
}

function toggleTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function filterTasks(filter) {
  renderTasks(filter);
}

function searchTasks() {
  const searchInput = document.getElementById("searchInput");
  renderTasks("all", searchInput.value);
}
