
type Task = {
    title: string, 
    completed: boolean, 
    createdAt: Date
}

let form = document.getElementById('newItemForm') as HTMLFormElement | null;
let list = document.getElementById('list') as HTMLUListElement;
let newItem = document.getElementById('newItem') as HTMLInputElement;
let tasks: Task[] = loadTasks();

tasks.forEach(addListItem)

form?.addEventListener('submit', e => {
    e.preventDefault();

    if (newItem.value == '' || newItem.value == null) return;

    const newTask: Task = {
        title: newItem.value,
        completed: false,
        createdAt: new Date()
    }

    tasks.push(newTask);
    addListItem(newTask);
    newItem.value = "" ;
})


function addListItem(task: Task) {
    const btn = document.createElement('button') as HTMLButtonElement;
    const clearText = document.createTextNode('X');
    const item = document.createElement('li') as HTMLLIElement;
    const label = document.createElement('label') as HTMLLabelElement;
    const checkbox = document.createElement('input') as HTMLInputElement;
    checkbox.type = "checkbox";
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks()
    })
    checkbox.checked = task.completed;
    btn.append(clearText);
    label.append(checkbox, task.title, btn);
    item.append(label);
    list.append(item);
    label.style.display = 'flex'
    label.style.justifyContent = 'space-between';

    btn.addEventListener('click', () => {
        item.remove();
        saveTasks();
    })
}

function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS");
    if(taskJSON == null) return [];
    return JSON.parse(taskJSON);
}
