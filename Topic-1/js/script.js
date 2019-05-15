"use strict";

window.onload = function() {

    function showMessage(){
        alert("Hi you clicked the button!");
    }

    let sectionElem = document.querySelector(".section.hidden");
    let buttonElem = document.querySelector(".button.alert")

    sectionElem.classList.remove("hidden");
    buttonElem.addEventListener("click", showMessage);
}