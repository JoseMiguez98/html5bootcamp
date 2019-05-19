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
        };
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
        if(query.trim().length != 0) {
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
            
            while(reposList.firstChild) {
                reposList.removeChild(reposList.firstChild);
            }

            document.getElementsByClassName("repos-list-header")[0].classList.replace(
                "hidden","show"
            );
            
            fetchDataGeneric(config).then( (response) => {
                if(response.total_count != 0){
                    for(let i = 0 ; i < 10 ; i++) {
                        let liElem = document.createElement("li");
                        let anchorElem = document.createElement("a");
                        let paragraphElem = document.createElement("p");
                        anchorElem.setAttribute("href", response.items[i].html_url);
                        anchorElem.setAttribute("target", "_blank");
                        anchorElem.appendChild(document.createTextNode(response.items[i].name));
                        paragraphElem.appendChild(document.createTextNode(response.items[i].description));
                        liElem.appendChild(anchorElem);
                        liElem.appendChild(paragraphElem);
                        reposList.appendChild(liElem);
                    }
                } else {
                    reposList.appendChild(document.createTextNode("The search does not return results"));
                }

            }).catch( () => {
                reposList.appendChild(document.createTextNode("An error occurred, please try again later"));
            });
        } else {
            alert("Type something!");
        }
    }

    function generateTable(matrix, caption) {
        let tableElem = document.createElement("table");
        let tableCaptionElem = document.createElement("caption");
        let tableHeaderElem = document.createElement("thead");
        let tableBodyElem = document.createElement("tbody");
        let numberOfRows = matrix.length;
        let numberOfColumns = matrix[0].length;
        tableCaptionElem.appendChild(document.createTextNode(caption));
        tableElem.appendChild(tableCaptionElem);
        tableElem.appendChild(tableHeaderElem);
        tableElem.appendChild(tableBodyElem);

        for(let i = 0 ; i < numberOfRows ; i++) {
            let tableRowElem = document.createElement("tr");
            let header = i === 0 ? true : false;

            for(let j = 0 ; j< numberOfColumns ; j++) {
                let tableDataElem;
                if( header ) {
                    tableDataElem = document.createElement("th");
                    tableDataElem.setAttribute("scope", "col");
                } else {
                    if(j === 0) {
                        tableDataElem = document.createElement("th");
                        tableDataElem.setAttribute("scope", "row");
                    } else {
                        tableDataElem = document.createElement("td");
                    }
                }
                tableDataElem.appendChild(document.createTextNode(matrix[i][j]));
                tableRowElem.appendChild(tableDataElem);
            }

            if( header ) {
                tableHeaderElem.appendChild(tableRowElem);
            } else {
                tableBodyElem.appendChild(tableRowElem);
            }
        }

        return tableElem;
    }
    
    let sectionElem = document.getElementsByClassName("section hidden")[0];
    let buttonJokeElem = document.getElementsByClassName("button joke")[0];
    let buttonSearchElem = document.getElementsByClassName("button search")[0];
    let searchFieldElem = document.getElementById("repos-search-field");
    let tableContainer = document.getElementsByClassName("table generic-data")[0];
    let matrixData = [
        ["Country","Population","Official Coin","Native Lang/s"],
        ["Argentina","44.27 Million","Argentine Peso","Spanish"],
        ["United States","327.2 Millon","United States Dollar","English"],
        ["Canada","37,06 Million","Canadian Dollar","English / French"],
        ["France","66.99 Million","Euro","French"]
    ];
    let fetchConfig = {
        url: "http://api.icndb.com/jokes/random",
        method: "GET"
    };
    let countriesTable = generateTable(matrixData, "Countries data");

    tableContainer.appendChild(countriesTable);
    
    sectionElem.classList.replace("hidden", "show");
    
    searchFieldElem.addEventListener("keyup", (e) => {
        if(e.keyCode === 13) {
            buttonSearchElem.click();
        }
    });
    buttonJokeElem.addEventListener("click", () => {
        getJoke(fetchConfig);
    });
    buttonSearchElem.addEventListener("click", () => {
        let query = searchFieldElem.value;
        fetchRepos(query);
    });
};