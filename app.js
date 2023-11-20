//managing the theme switch

const header = document.querySelector(".header");
const themeSwitch = document.querySelector(".theme-switch");
const themeImage = document.querySelector(".theme-image");
const body = document.querySelector("body");
const inputGroup = document.querySelector(".input-group");
const todoList = document.querySelector(".todo-list");
const statusesGroup = document.querySelector(".statuses-group");
const information = document.querySelector(".information");

themeSwitch.addEventListener("click", changeTheme);

let isDark = false;

function changeTheme(){
    if(!isDark){
        header.classList.add("dark");
        themeImage.src = "images/icon-sun.svg";
        body.classList.add("dark");
        inputGroup.classList.add("dark");
        todoList.classList.add("dark");
        statusesGroup.classList.add("dark");
        information.classList.add("dark");

        isDark = true;
    }

    else{
        header.classList.remove("dark");
        themeImage.src = "images/icon-moon.svg";
        body.classList.remove("dark");
        inputGroup.classList.remove("dark");
        todoList.classList.remove("dark");
        statusesGroup.classList.remove("dark");
        information.classList.remove("dark");

        isDark = false;
    }

}


const todoForm = document.querySelector(".todo-form");
const taskInput = document.querySelector("#task-input");
const infoBar = document.querySelector(".info-bar");


todoForm.addEventListener("submit", addTask)

//add a task

let todo;
let checkbox;
let todoName;
let deleteIcon;

function addTask(e){
    e.preventDefault()

    todo = document.createElement("div");
    checkbox = document.createElement("div");
    todoName = document.createElement("p");
    deleteIcon = document.createElement("img");

    if(taskInput.value === ""){
        taskInput.classList.add("error");
        taskInput.placeholder = "Enter a new task!!!";
        setTimeout(()=>{
            taskInput.classList.remove("error");
            taskInput.placeholder = "Create a new todo..."
        },2000)
    }
    else{
        todo.classList.add("todo");

        checkbox.classList.add("checkbox");
        checkbox.addEventListener("click", checkTask);
        checkbox.isChecked = false;

        todoName.textContent = taskInput.value;
        todoName.classList.add("todo-name");

        deleteIcon.src = "/images/icon-cross.svg";
        deleteIcon.addEventListener("click", deleteTask);
        deleteIcon.classList.add("delete-icon");

        todo.appendChild(checkbox);
        todo.appendChild(todoName);
        todo.appendChild(deleteIcon);
        todoList.insertBefore(todo, infoBar);

        calculateNumberItems(1);

        taskInput.value = "";
    }
}

// check a task

function checkTask(){
    if(this.isChecked === false){
        this.classList.add("checked");
        this.nextSibling.style.textDecoration = "line-through";
        this.isChecked = true;
    }
    else{
        this.classList.remove("checked");
        this.nextSibling.style.textDecoration = "none";
        this.isChecked = false;
    }
}

//Delete a task

function deleteTask(){
    this.parentElement.style.display = "none";
    calculateNumberItems(-1);
}

//clear completed task

    const clearCompleted = document.querySelector(".clear-completed");
    clearCompleted.addEventListener("click", clearTaskCompleted);

    function clearTaskCompleted(){
        const tasksChecked = document.querySelectorAll(".checked");
        const numberTaskchecked = tasksChecked.length
        tasksChecked.forEach(taskChecked =>{
            taskChecked.parentElement.style.display = "none";
        })
        calculateNumberItems(-numberTaskchecked);

    }


// display the number of items left

const ItemsLeft = document.querySelector(".number");
let numberItemsLeft = 0;

function calculateNumberItems(number){

    numberItemsLeft += number

    ItemsLeft.textContent = numberItemsLeft;

}

