"use strict";

window.onload = function() {

    function fetchData() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.icndb.com/jokes/random");
        xhr.responseType = "json";
        xhr.send();
        
        xhr.onload = () => {
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
        }).then( (response) => {
            if(!response.ok){
                console.error(response.statusText);
                throw Error;
            }
            return response.json();
        });
    }

    function getJoke(fetchConfig) {
        let promise = fetchDataGeneric(fetchConfig);
        let paragraphElem = document.createElement("p");

        promise.then( (jsonResponse) => {
            let response = document.createTextNode(jsonResponse.value.joke);
            paragraphElem.appendChild(response);
            sectionElem.appendChild(paragraphElem);

            if(sectionElem.classList.contains("error")) {
                sectionElem.classList.remove("error");
            }

        }).catch( () => {
            paragraphElem.appendChild(document.createTextNode("An error occurred, please try again later"));
            sectionElem.appendChild(paragraphElem);

            if(!sectionElem.classList.contains("error")) {
                sectionElem.classList.add("error");
            }

        });
    }

    let sectionElem = document.querySelector(".section.hidden");
    let buttonElem = document.querySelector(".button.alert");
    let fetchConfig = {
        url: "http://api.icndb.com/jokes/random",
        method: "GET"
    };

    sectionElem.classList.replace("hidden", "show");
    buttonElem.addEventListener("click", () => {
        getJoke(fetchConfig);
    });
}