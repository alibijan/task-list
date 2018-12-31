// VARS - UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskItem = document.querySelectorAll('collection-item');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const removeItem = document.querySelector('.fa-remove');

// load all event listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task event
    form.addEventListener('submit', addTask);
    
    // remove item event
    taskList.addEventListener('click', removeList);

    // clear items event
    clearBtn.addEventListener('click', clearTasks);

    // filter tasks event
    filter.addEventListener('keyup', filterTask);
}

// Get tasks from Local Storage
function getTasks() {
    let tasks;
    if( localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create list element
        const li = document.createElement('li');
        // add class to li
        li.className = 'collection-item';
        // Creating the text node and appending to list
        li.appendChild(document.createTextNode(task));
        
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // append link to list
        li.appendChild(link);

        // append list to ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task!');
    } else {
        // Create list element
        const li = document.createElement('li');
        // add class to li
        li.className = 'collection-item';
        // Creating the text node and appending to list
        li.appendChild(document.createTextNode(taskInput.value));
        
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // append link to list
        li.appendChild(link);

        // append list to ul
        taskList.appendChild(li);

        // store in local storage
        taskStorage(taskInput.value);

        // clear the input
        taskInput.value = '';

        console.log(li);
    }

    e.preventDefault();
}

// store task
function taskStorage(task) {
    let tasks;
    if( localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove list item
function removeList(e) {
    if( e.target.parentElement.classList.contains('delete-item') ) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove task from local storage
            removeFromStorage(e.target.parentElement.parentElement);
        }
        console.log(e.target);
    }
}

// remove task
function removeFromStorage(taskItem) {
    let tasks;
    if( localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear List task
function clearTasks(e) {
    // taskList.innerHTML = '';
    // or you could do this, which is faster:
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from local storage
    clearFromStorage(taskList.firstChild);

    e.preventDefault();
}

// clear from local storage
function clearFromStorage() {
    localStorage.clear();
}

// filter task
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
        console.log(item.toLowerCase().indexOf(text))
    });

    console.log(text);
}