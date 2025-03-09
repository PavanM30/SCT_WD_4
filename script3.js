document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskDateTime = document.getElementById("taskDateTime");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      const taskText = document.createElement("span");
      taskText.textContent = ${task.text} (Due: ${task.date || "No date"});
      li.appendChild(taskText);

      const buttons = document.createElement("div");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit";
      editBtn.addEventListener("click", () => editTask(index));
      buttons.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete";
      deleteBtn.addEventListener("click", () => deleteTask(index));
      buttons.appendChild(deleteBtn);

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Undo" : "Complete";
      completeBtn.addEventListener("click", () => toggleComplete(index));
      buttons.appendChild(completeBtn);

      li.appendChild(buttons);
      taskList.appendChild(li);
    });
  }

  // Add a new task
  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const date = taskDateTime.value;
    if (text) {
      tasks.push({ text, date, completed: false });
      taskInput.value = "";
      taskDateTime.value = "";
      saveTasks();
      renderTasks();
    }
  });

  // Edit a task
  function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    const newDate = prompt("Edit the date and time (YYYY-MM-DDTHH:MM):", tasks[index].date);
    if (newText !== null) {
      tasks[index].text = newText;
      tasks[index].date = newDate;
      saveTasks();
      renderTasks();
    }
  }

  // Delete a task
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  // Toggle task completion
  function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Initial render
  renderTasks();
});
