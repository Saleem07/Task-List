//Define ui variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListener();

//load all event listeners
function loadEventListener() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
    return;
  }
  //create li element
  const li = document.createElement("li");

  //add class
  li.className = "collection-item";

  //Create Text Node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //create new link element
  const link = document.createElement("a");

  //add class
  link.className = "delete-item secondary-content";

  //add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i>';

  //append link to li
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  //Adding to local Storage

  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//showing tasks inside the ul from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    const li = document.createElement("li");

    //add class
    li.className = "collection-item";

    //Create Text Node and append to li
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement("a");

    //add class
    link.className = "delete-item secondary-content";

    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}
//Remove Task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      //remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear all the tasks

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
    clearTasksFromLocalStorage();
  }
  // clearTasksFromLocalStorage();
}

//clear tasks from ls
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
