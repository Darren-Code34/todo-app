//managing the theme switch

const header = document.querySelector(".header");
const themeSwitch = document.querySelector(".theme-switch");
const themeImage = document.querySelector(".theme-image");
const body = document.querySelector("body");
const inputGroup = document.querySelector(".input-group");
const todoList = document.querySelector(".todo-list");
const container = document.querySelector(".container");
const infoBar = document.querySelector(".info-bar");
const filterGroup = document.querySelector(".filter-group");
const information = document.querySelector(".information");


themeSwitch.addEventListener("click", changeTheme);

let isDark = false;

function changeTheme(){
    if(!isDark){
        header.classList.add("dark");
        themeImage.src = "images/icon-sun.svg";
        body.classList.add("dark");
        inputGroup.classList.add("dark");
        container.classList.add("dark");
        todoList.classList.add("dark");
        infoBar.classList.add("dark");
        filterGroup.classList.add("dark");
        information.classList.add("dark");

        isDark = true;
    }

    else{
        header.classList.remove("dark");
        themeImage.src = "images/icon-moon.svg";
        body.classList.remove("dark");
        inputGroup.classList.remove("dark");
        container.classList.remove("dark");
        todoList.classList.remove("dark");
        infoBar.classList.remove("dark");
        filterGroup.classList.remove("dark");
        information.classList.remove("dark");

        isDark = false;
    }

}


const todoForm = document.querySelector(".todo-form");
const taskInput = document.querySelector("#task-input");


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
        todo.setAttribute("draggable", "true");
        todo.addEventListener("dragstart",()=>{
            setTimeout(()=>todo.classList.add("dragging"),0)
        })
        todo.addEventListener("dragend", ()=> todo.classList.remove("dragging"));

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
        todoList.appendChild(todo);

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
    this.parentElement.remove();
    calculateNumberItems(-1);
}

//clear completed task

const clearCompleted = document.querySelector(".clear-completed");
clearCompleted.addEventListener("click", clearTaskCompleted);

function clearTaskCompleted(){
    const tasksChecked = todoList.querySelectorAll(".checked");
    let numberTaskchecked = tasksChecked.length;
    console.log(numberTaskchecked);
        
    if(todoList.length === 0 || numberTaskchecked === 0) return
    else{
        tasksChecked.forEach(taskChecked =>{
            taskChecked.parentElement.remove();
        })
        calculateNumberItems(-numberTaskchecked);
    }

}


// display the number of items left

const ItemsLeft = document.querySelector(".number");
let numberItemsLeft = 0;

function calculateNumberItems(number){

    numberItemsLeft += number

    ItemsLeft.textContent = numberItemsLeft;

}

//filter task

const filterAll = document.querySelector("button.filter-all");
const filterActive = document.querySelector("button.filter-active");
const filterCompleted = document.querySelector("button.filter-completed");

filterAll.addEventListener("click", displayAllTask);
filterActive.addEventListener("click", displayActiveTask);
filterCompleted.addEventListener("click", displayCompletedTask);


function displayActiveTask(){

    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach(checkbox =>{
        if(checkbox.classList.contains("checked")){
            checkbox.parentElement.style.display = "none";
        }
        else{
            checkbox.parentElement.style.display = "flex";
        }
    })

    filterAll.classList.remove("active");
    filterCompleted.classList.remove("active");
    filterActive.classList.add("active");
}


function displayCompletedTask(){
    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach(checkbox =>{
        if(checkbox.classList.contains("checked")){
            checkbox.parentElement.style.display = "flex";
        }
        else{
            checkbox.parentElement.style.display = "none";
        }
    })

    filterAll.classList.remove("active");
    filterCompleted.classList.add("active");
    filterActive.classList.remove("active");
}

function displayAllTask(){
    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach(checkbox =>{
        checkbox.parentElement.style.display = "flex";
    })

    filterAll.classList.add("active");
    filterCompleted.classList.remove("active");
    filterActive.classList.remove("active");
}

//drag and drop

todoList.addEventListener("dragover", sortableTodolist);
todoList.addEventListener("dragenter", (e)=> e.preventDefault());

function sortableTodolist(e){
    e.preventDefault();
    const dragginItem = document.querySelector(".dragging");
    

    let siblings = [...todoList.querySelectorAll(".todo:not(.dragging)")];

    let nextSibling = siblings.find(sibling => {
        console.log(sibling.offsetTop, sibling.offsetHeight / 2);
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    })
    // console.log(nextSibling);

    todoList.insertBefore(dragginItem, nextSibling);
}