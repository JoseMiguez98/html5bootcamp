"use strict";

window.onload = function() {

    function fetchData() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.icndb.com/jokes/random");
        xhr.responseType = "json";
        xhr.send();
        
        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                let paragraphElem = document.createElement("p");
                let response = document.createTextNode(xhr.response.value.joke);
                paragraphElem.appendChild(response);
                sectionElem.appendChild(paragraphElem); 
            }
            else {
                console.log(`${xhr.status}: ${xhr.statusText} ${xhr.response}`);
            }
        }
    }

    function fetchDataGeneric(config) {
        return fetch(config.url, {
            method: config.method,
            headers: config.headers ? config.headers : Headers,
        });
    }

    function getJoke() {
        let promise = fetchDataGeneric(fetchConfig);
        promise.then( (response) => {
            if(!response.ok){
                console.log(Error(response.statusText));
                throw Error;
            }
            return response.json();
        }).then( (jsonResponse) => {
            let paragraphElem = document.createElement("p");
            let response = document.createTextNode(jsonResponse.value.joke);
            paragraphElem.appendChild(response);
            console.log(sectionElem);
            sectionElem.appendChild(paragraphElem); 
        }).catch( (err) => {
            console.log(err);
        });
    }

    let sectionElem = document.querySelector(".section.hidden");
    let buttonElem = document.querySelector(".button.alert");
    let fetchConfig = {
        url: "http://api.icndb.com/jokes/random",
        method: "GET"
    };

    sectionElem.classList.remove("hidden");
    buttonElem.addEventListener("click", () => {
        getJoke();
    });
}