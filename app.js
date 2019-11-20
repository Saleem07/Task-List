//Define ui variables 

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListener();

//load all event listeners
function loadEventListener(){
form.addEventListener('submit',addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTasks);


}

// Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('add a task');
    }

    //create li element 
    const li = document.createElement('li');

    //add class
    li.className = 'collection-item';

    //Create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element 
    const link = document.createElement('a');

    //add class 
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>'

    //append link to li 
    li.appendChild(link)

    //append li to ul
    taskList.appendChild(li)

    //clear input 
    taskInput.value = '';

    e.preventDefault();
}

//Remove Task 

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove()
        }
    }
}

//clear all the tasks 
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}
