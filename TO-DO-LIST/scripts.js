document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = { text: taskText, id: Date.now().toString() };
        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = '';
    }
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.dataset.id = task.id;

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskItem.appendChild(taskText);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.onclick = () => editTask(taskItem, taskText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = () => deleteTask(taskItem);

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

function editTask(taskItem, taskText) {
    const taskId = taskItem.dataset.id;
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.id === taskId);

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.text;
    taskItem.replaceChild(editInput, taskText);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save');
    saveButton.onclick = () => saveEdit(taskItem, editInput, taskText, task);
    taskItem.replaceChild(saveButton, taskItem.querySelector('.edit'));
}

function saveEdit(taskItem, editInput, taskText, task) {
    const updatedText = editInput.value.trim();
    if (updatedText) {
        task.text = updatedText;
        taskText.textContent = updatedText;

        taskItem.replaceChild(taskText, editInput);
        taskItem.replaceChild(createEditButton(taskItem, taskText), taskItem.querySelector('.save'));

        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const taskIndex = tasks.findIndex(t => t.id === task.id);
        tasks[taskIndex].text = updatedText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function createEditButton(taskItem, taskText) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.onclick = () => editTask(taskItem, taskText);
    return editButton;
}

function deleteTask(taskItem) {
    const taskId = taskItem.dataset.id;
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    taskItem.remove();
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
