"use strict";
let form = document.getElementById('newItemForm');
let list = document.getElementById('list');
let newItem = document.getElementById('newItem');
let tasks = loadTasks();
tasks.forEach(addListItem);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', e => {
    e.preventDefault();
    if (newItem.value == '' || newItem.value == null)
        return;
    const newTask = {
        title: newItem.value,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    addListItem(newTask);
    newItem.value = "";
});
function addListItem(task) {
    const btn = document.createElement('button');
    const clearText = document.createTextNode('X');
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
    });
    checkbox.checked = task.completed;
    btn.append(clearText);
    label.append(checkbox, task.title, btn);
    item.append(label);
    list.append(item);
    label.style.display = 'flex';
    label.style.justifyContent = 'space-between';
    btn.addEventListener('click', () => {
        item.remove();
        saveTasks();
    });
}
function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
    const taskJSON = localStorage.getItem("TASKS");
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
