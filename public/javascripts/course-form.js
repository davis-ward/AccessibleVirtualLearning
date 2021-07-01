const body = document.body;

const unitForm = document.querySelector('.unit-form')
const addTaskButton = document.querySelector('.add-task-button')
const createUnitRow = document.querySelector('.create-unit-row');

let taskCount = document.querySelectorAll('.task-container').length + 1;
console.log(taskCount);

addTaskButton.addEventListener('click', event => {
    // create the div row for a new task
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('mb-3');
    taskDiv.classList.add('row');
    taskDiv.classList.add('task-container');

    // create the new label
    let taskLabel = document.createElement('label');
    taskLabel.classList.add('col-2');
    taskLabel.classList.add('col-form-label');
    taskLabel.setAttribute('for', `taskInput${taskCount}`);
    var taskLabelText = document.createTextNode(`Task ${taskCount}`);
    taskLabel.appendChild(taskLabelText);

    // create the new col div for the task
    let taskInputDiv = document.createElement('div');
    taskInputDiv.classList.add('col-10');

    // create the new input
    let taskInput = document.createElement('input');
    taskInput.classList.add('form-control');
    taskInput.setAttribute('name', `task${taskCount}`);
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('id', `taskInput${taskCount}`);

    // build and append the div
    taskInputDiv.appendChild(taskInput);
    taskDiv.appendChild(taskLabel);
    taskDiv.appendChild(taskInputDiv);
    console.log(taskDiv);

    // remove the button
    addTaskButton.remove();
    createUnitRow.remove();
    unitForm.appendChild(taskDiv);
    unitForm.appendChild(addTaskButton);
    unitForm.appendChild(createUnitRow);
    taskCount++;
});


