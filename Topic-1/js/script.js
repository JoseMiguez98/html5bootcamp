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

    function getJoke( fetchConfig ) {
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

    function fetchRepos(query) {
        /*
        Consider the case of using string literals of ES6,
         but after doing a test in jsperf (https://jsperf.com/es6-string-literals-vs-string-concatenation)
        I saw that the concatenation of strings is faster
        */
        let url = "https://api.github.com/search/repositories?q=" + query;
        let config = {
            url,
            method: "GET" 
        };
        let reposList = document.getElementsByClassName("repos-list")[0];
        let i;

        fetchDataGeneric(config).then( (response) => {
            for(i = 0 ; i < 10 ; i++) {
                let liElem = document.createElement("li");
                let anchorElem = document.createElement("a");
                let paragraphElem = document.createElement("p");
                anchorElem.setAttribute("href", response.items[i].html_url);
                anchorElem.appendChild(document.createTextNode(response.items[i].name));
                paragraphElem.appendChild(document.createTextNode(response.items[i].description));
                paragraphElem.setAttribute("class", "repo-description");
                liElem.appendChild(anchorElem);
                liElem.appendChild(paragraphElem);
                reposList.appendChild(liElem);
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

    fetchRepos("javascript");
}