"use strict";

window.onload = function() {

    function fetchData() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.icndb.com/jokes/random");
        xhr.responseType = "json";
        xhr.send();
        
        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                let section = document.getElementsByClassName("section")[0];
                let h2Elem = document.createElement("p");
                let response = document.createTextNode(xhr.response.value.joke);
                h2Elem.appendChild(response);
                section.appendChild(h2Elem); 
            }
            else {
                console.log(`${xhr.status}: ${xhr.statusText} ${xhr.response}`);
            }
        }
    }

    let sectionElem = document.querySelector(".section.hidden");
    let buttonElem = document.querySelector(".button.alert");

    sectionElem.classList.remove("hidden");
    buttonElem.addEventListener("click", fetchData)
}