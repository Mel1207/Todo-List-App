//Get date today
let calendar;
let date = document.querySelector('#date');
let todayDate = new Date();
const ul = document.createElement('ul');
const li = document.createElement('li');

ul.className = 'date-list';
ul.innerHTML = `
    <li>Today is </li>
    <li>${todayDate.getMonth()},</li>
    <li>${todayDate.getDate()},</li>
    <li>${todayDate.getFullYear()}</li>
`
date.appendChild(ul);

// Defining all UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// Load all Event listeners
loadEventListeners();

function loadEventListeners () {
    // Load DOM event
    document.addEventListener('DOMContentLoaded', getTask)
    // Add task
    form.addEventListener('submit', addTask);
    // remove task
    taskList.addEventListener('click', removeTask);
    // Clear task btn
    clearBtn.addEventListener('click', clearTask);
    // filter task
    filter.addEventListener('keyup', filterTask);
}

// Get Task from LS
function getTask () {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task) {
        // Create an li element
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create Text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create a link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // Add the secondary content or icon
        link.innerHTML = '<i class="fas fa-trash-alt red-text"></i>';
        // Append link to li
        li.appendChild(link);
        // Append now li to ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask (e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }
    // Create an li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create a link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // Add the secondary content or icon
    link.innerHTML = '<i class="fas fa-trash-alt red-text"></i>';
    // Append link to li
    li.appendChild(link);
    // Append now li to ul
    taskList.appendChild(li);
    // Store task in LS
    storeTaskinLS(taskInput.value);

    // Clear task input after adding task
    taskInput.value = '';
    e.preventDefault();
}

// Strore Task
function storeTaskinLS (task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// removeTask
function removeTask (e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('are you sure?')) {
            e.target.parentElement.parentElement.remove()
            // Remove from LS
            removeTaskFromLS();
        }
    }
    e.preventDefault();
}

function removeTaskFromLS (taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all task
function clearTask (e) {
    if(confirm('are you sure?')) {
        taskList.innerHTML = '';
    }
    // Clear Task from LS
    clearTaskFromLS();
    e.preventDefault();
}

function clearTaskFromLS () {
    localStorage.clear();
}

// Filter task
function filterTask (e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else
            task.style.display = 'none';
    })
}
