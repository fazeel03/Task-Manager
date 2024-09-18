// Select form and task list elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Add task on button click
addTaskBtn.addEventListener('click', addTask);

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.classList.add('task-item');

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div>
            <button class="complete-task" onclick="completeTask(this)">Complete</button>
            <button class="edit-task" onclick="editTask(this)">Edit</button>
            <button class="remove-task" onclick="removeTask(this)">Remove</button>
        </div>
    `;
    taskList.appendChild(li);

    taskInput.value = ''; 
    updateProgress(); 
}

// Function to remove task
function removeTask(btn) {
    btn.parentElement.parentElement.remove();
    updateProgress(); 
}

// Function to mark task as complete
function completeTask(btn) {
    const taskItem = btn.parentElement.parentElement;
    taskItem.classList.toggle('complete'); 
    updateProgress(); 
}

// Function to edit a task
function editTask(btn) {
    const taskItem = btn.parentElement.parentElement; 
    const taskText = taskItem.querySelector('.task-text'); 

    const newTaskText = prompt('Edit task:', taskText.textContent);
    if (newTaskText) {
        taskText.textContent = newTaskText; 
    }
}

// Function to update progress
function updateProgress() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item.complete').length;
    const progressPercent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    document.getElementById('progress').textContent = `${Math.round(progressPercent)}%`;
    document.getElementById('progress-inner').style.width = `${progressPercent}%`;
}


function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.innerHTML = `
            <span class="task-text">${task}</span>
            <div>
                <button class="complete-task" onclick="completeTask(this)">Complete</button>
                <button class="edit-task" onclick="editTask(this)">Edit</button>
                <button class="remove-task" onclick="removeTask(this)">Remove</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    updateProgress(); 
}

window.onload = loadTasks;

// Dark mode toggle functionality
const toggleDarkMode = document.getElementById('dark-mode-toggle');
toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Fetch a motivational quote from an  API
const quoteDiv = document.getElementById('quote');

function fetchQuote() {
    fetch('https://api.adviceslip.com/advice')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            quoteDiv.innerHTML = `<p>"${data.slip.advice}"</p>`;
        })
        .catch(error => {
            console.error('There was a problem with the quote API:', error);
            quoteDiv.innerHTML = `<p>Unable to fetch quote. Please try again later.</p>`;
        });
}

// Fetch the quote when the page loads
window.onload = function() {
    fetchQuote();
};

