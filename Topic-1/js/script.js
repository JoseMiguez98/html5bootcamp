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
        let paragraphElem = document.createElement("p");

        promise.then( (response) => {
            if(!response.ok){
                console.log(Error(response.statusText));
                throw Error;
            }
            return response.json();
        }).then( (jsonResponse) => {
            let response = document.createTextNode(jsonResponse.value.joke);
            paragraphElem.appendChild(response);

            if(sectionElem.classList.contains("error")) {
                sectionElem.classList.remove("error");
            }

        }).catch( () => {
            let errorMessage = document.createTextNode("An error occurred, please try again later");
            paragraphElem.appendChild(errorMessage);

            if(!sectionElem.classList.contains("error")) {
                sectionElem.classList.add("error");
            }

        }).finally( () => {
            sectionElem.appendChild(paragraphElem);
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