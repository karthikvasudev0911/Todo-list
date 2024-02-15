document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value.trim();
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
                <button onclick="markCompleted(this)">Mark Completed</button>
                <button onclick="markIncomplete(this)">Mark Incomplete</button>
            </div>
        `;
        taskList.appendChild(taskItem);

        saveTask(taskText);
        taskInput.value = '';
    }
}

function editTask(button) {
    const listItem = button.parentNode.parentNode;
    const taskTextElement = listItem.querySelector('span');
    const taskText = taskTextElement.innerText;

    // Create an input field for editing
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskText;
    inputField.classList.add('edit-input');

    // Replace the task text with the input field
    taskTextElement.replaceWith(inputField);

    // Focus on the input field
    inputField.focus();

    // Add an event listener to handle the editing
    inputField.addEventListener('blur', () => {
        const editedTaskText = inputField.value.trim();

        // If the user entered a non-empty text, update the task text
        if (editedTaskText !== '') {
            taskTextElement.innerText = editedTaskText;
            updateLocalStorage();
        }

        // Remove the input field and restore the original text display
        inputField.replaceWith(taskTextElement);
    });
}

function deleteTask(button) {
    const taskList = document.getElementById('taskList');
    const listItem = button.parentNode.parentNode;
    taskList.removeChild(listItem);
    updateLocalStorage();
}

function toggleTaskStatus(checkbox) {
    const listItem = checkbox.parentNode.parentNode;
    listItem.classList.toggle('completed');
    updateLocalStorage();
}

function markCompleted(button) {
    const listItem = button.parentNode.parentNode;
    listItem.classList.add('completed');
    updateLocalStorage();
}

function markIncomplete(button) {
    const listItem = button.parentNode.parentNode;
    listItem.classList.remove('completed');
    updateLocalStorage();
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
                <button onclick="markCompleted(this)">Mark Completed</button>
                <button onclick="markIncomplete(this)">Mark Incomplete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function updateLocalStorage() {
    const taskList = document.getElementById('taskList');
    let tasks = [];

    taskList.childNodes.forEach(taskItem => {
        const taskText = taskItem.firstChild.innerText;
        tasks.push(taskText);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
