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