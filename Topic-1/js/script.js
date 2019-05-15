"use strict";

window.onload = function() {

    function showMessage(){
        alert("Hi you clicked the button!");
    }

    function fetchData() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.icndb.com/jokes/random");
        xhr.responseType = "json";
        xhr.send();
        
        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                console.log(xhr.response);
            }
            else {
                console.log(`${xhr.status}: ${xhr.statusText} ${xhr.response}`)
            }
        }
    }

    let sectionElem = document.querySelector(".section.hidden");
    let buttonElem = document.querySelector(".button.alert")

    sectionElem.classList.remove("hidden");
    buttonElem.addEventListener("click", fetchData);
}