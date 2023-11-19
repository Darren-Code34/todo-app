//managing the theme switch

const header = document.querySelector(".header");
const themeSwitch = document.querySelector(".theme-switch");
const themeImage = document.querySelector(".theme-image");
const body = document.querySelector("body");
const inputGroup = document.querySelector(".input-group");
const todoList = document.querySelector(".todo-list");
const status = document.querySelector(".status");
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
        status.classList.add("dark");
        information.classList.add("dark");

        isDark = true;
    }

    else{
        header.classList.remove("dark");
        themeImage.src = "images/icon-moon.svg";
        body.classList.remove("dark");
        inputGroup.classList.remove("dark");
        todoList.classList.remove("dark");
        status.classList.remove("dark");
        information.classList.remove("dark");

        isDark = false;
    }

}



const todoForm = document.querySelector(".todo-form");
const taskInput = document.querySelector("#task-input");
const infoBar = document.querySelector(".info-bar");


todoForm.addEventListener("submit", addTask)

//add a task

function addTask(e){
    e.preventDefault()

    const todo = document.createElement("div");
    const checkbox = document.createElement("div");
    const todoName = document.createElement("p");
    const deleteIcon = document.createElement("img");

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

        todoName.textContent = taskInput.value;
        todoName.classList.add("todo-name");

        deleteIcon.src = "/images/icon-cross.svg";
        deleteIcon.classList.add("delete-icon");

        todo.appendChild(checkbox);
        todo.appendChild(todoName);
        todo.appendChild(deleteIcon);
        todoList.insertBefore(todo, infoBar);

        taskInput.value = "";

    }


    //mark a task done

    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach(checkbox =>{
        checkbox.addEventListener("click", checkTask);

        let isChecked = false;

        function checkTask(){
            if(isChecked === false){
                checkbox.classList.add("checked");
                checkbox.nextSibling.style.textDecoration = "line-through";
                isChecked = true;
                calculateNumberItems();
            }
            else{
                checkbox.classList.remove("checked");
                checkbox.nextSibling.style.textDecoration = "none";
                isChecked = false;
                calculateNumberItems();
            }
        }
    })


    // display the number of items left

    const ItemsLeft = document.querySelector(".number");
    let numberItemsLeft;

    function calculateNumberItems(){
        
        const numberCheckboxes = checkboxes.length ;
        const numberTaskchecked = document.querySelectorAll(".checked").length;
        

        numberItemsLeft = numberCheckboxes - numberTaskchecked;

        ItemsLeft.textContent = numberItemsLeft;

    }

    calculateNumberItems()


    //Delete a task

    const deleteIcons = document.querySelectorAll(".delete-icon");

    deleteIcons.forEach(deleteIcon =>{
        deleteIcon.addEventListener("click", deleteTask);
    
        function deleteTask(){
            deleteIcon.parentElement.style.display = "none";
        }
    })


    //clear completed task

    const clearCompleted = document.querySelector(".clear-completed");
    clearCompleted.addEventListener("click", clearTaskCompleted);

    function clearTaskCompleted(){
        const tasksChecked = document.querySelectorAll(".checked");
        tasksChecked.forEach(taskChecked =>{
            taskChecked.parentElement.style.display = "none";
        })
    }
}

