window.onload = () => {
    
    "use strict";
    
    const saveButtonElem = document.getElementsByClassName("button save")[0];
    const deleteButtonElem = document.getElementsByClassName("button delete")[0];
    const textAreaElem = document.getElementById("txt-area");
    const webSocket = new WebSocket("wss://echo.websocket.org/");
    const webSocketContainerElem = document.getElementsByClassName("webSocket-info-container")[0];
    const canvas = document.getElementsByClassName("myCanvas")[0];
    const context = canvas.getContext("2d");
    let db;
    
    
    // ======================================= Functions ====================================================//
    function addIndexedDBData(value) {
        const data = {"data": value};
        const transaction = db.transaction(["dataStore"], "readwrite");
        const objectStore = transaction.objectStore("dataStore");
        const objectStoreRequest = objectStore.add(data);
        
        objectStoreRequest.onerror = () => {
            console.error("There was an error saving data!");
        }
        
        transaction.onerror = () => {
            console.error("Error during transaction.")
        }
    }
    
    (function openDB() {
        if(window.indexedDB){
            const IDBOpenRequest = indexedDB.open("testDB", 1);
            
            IDBOpenRequest.onupgradeneeded = evt => {
                db = evt.target.result;
                if (!db.objectStoreNames.contains("dataStore")) {
                    db.createObjectStore("dataStore", {keyPath: "id", autoIncrement: true});
                }
            }
            
            IDBOpenRequest.onsuccess = evt => {
                db = evt.target.result;
            }
            
            IDBOpenRequest.onerror = () => {
                console.log("Error establising connection to the database");
            }
        }
    })()
    
    ;(function drawRandom() {
        const rectWidth = 500;
        const rectHeight = canvas.height;
        
        //Background rectangle
        context.beginPath();
        context.fillStyle = getRandomColor();
        context.strokeRect(0, 0, rectWidth, rectHeight);
        context.fillRect(0, 0, rectWidth, rectHeight);
        
        //Circle
        context.lineWidth = Math.floor(Math.random() * 10);
        context.arc(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight), 50, 0, 2 * Math.PI);
        context.stroke();
        
        //Random Strokes
        context.lineWidth = Math.floor(Math.random() * 10);
        context.strokeStyle = getRandomColor();
        context.moveTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.lineTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.moveTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.lineTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.moveTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.lineTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.moveTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.lineTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.moveTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.lineTo(getRandomStrokePosX(rectWidth), getRandomStrokePosY(rectHeight));
        context.stroke();
    })();
    
    function getRandomColor() {
        const pixel = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        }
        
        return `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
    }
    
    function getRandomStrokePosX(rectWidth) {
        return Math.floor(Math.random() * rectWidth+1);
    }
    
    function getRandomStrokePosY(rectHeight) {
        return Math.floor(Math.random() * rectHeight+1);
    }
    
    
    //Comment this function if you wanna see drawRandom() function in action
    //because the clearRect() sentence clear all the canvas to perform animation
    //and also clean the drawRandom() result, i tried to find a way to show both
    //but i have no exit.
    (function animateRectangle(rect ,isGoingDown) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#000";
        context.strokeRect(rect.posX, rect.posY, rect.width, rect.height);
        if(rect.posY < canvas.height-rect.height && isGoingDown){
            rect.posY += 7;
        } else {
            isGoingDown = false;
            
            if(rect.posY > 0) {
                rect.posY -= 7;
            } else {
                isGoingDown = true;
                rect.posY += 7;
            }
        }
        
        window.requestAnimationFrame( () => {
            animateRectangle(rect ,isGoingDown);
        });
        
    })({posX : 600,posY : 0, width: 300,height: 100}, true);
    
    //============================ Storage Events Handlers ===========================//
    saveButtonElem.onclick = () => {
        const value = textAreaElem.value.trim();
        const saveAdviseElem = document.getElementsByClassName("save-advise")[0];
        // keyNumber is only to allow save more than         
        // one data and not override the last.
        const keyNumber = Object.keys(window.localStorage).length;
        
        if(value.length != 0){
            
            //Add to local storage
            if(window.localStorage && window.localStorage != null) {
                window.localStorage.setItem("data" + keyNumber, value);
            }
            
            //Add to indexedDB
            addIndexedDBData(value);
            
            
            //Notify user
            saveAdviseElem.classList.add("fade-in");
            
            saveAdviseElem.addEventListener("animationend", () =>{
                saveAdviseElem.classList.remove("fade-in");
            });
            
        }
    }
    
    deleteButtonElem.onclick = () => {
        const deleteAdviseElem = document.getElementsByClassName("delete-advise")[0];
        const IDBStores = db.objectStoreNames;
        const IDBtransaction = db.transaction(IDBStores, "readwrite");
        
        //Clear Local Storage
        window.localStorage.clear();
        
        //Clear IndexedDB, this clear data DONT delete ObjectStore element
        for(let i = 0; i<IDBStores.length ; i++){
            IDBtransaction.objectStore(IDBStores.item(i)).clear();
        }
        
        //Clear textArea
        textAreaElem.value = "";
        
        //Notify user
        deleteAdviseElem.classList.add("fade-in");
        
        deleteAdviseElem.addEventListener("animationend", () => {
            deleteAdviseElem.classList.remove("fade-in");
        });
    }
    //==============================================================================//
    
    //=========================== Drag & Drop Events Handlers ==============================//
    
    //I use dragenter instead of dragover to set class
    //because dragover will set class every time that
    //mouse pointer move over textarea and that is not good (for me)
    textAreaElem.ondragenter = evt => {
        evt.target.classList.add("hover");
    }
    
    textAreaElem.ondragleave = evt =>{
        evt.target.classList.remove("hover");
    }
    
    textAreaElem.ondragover = evt => {
        evt.dataTransfer.dropEffect = "copy";
    }
    
    textAreaElem.ondrop = evt => {
        evt.preventDefault();
        const file = evt.dataTransfer.items[0].kind === "file" ?
        evt.dataTransfer.items[0].getAsFile() : false;
        //I use let because the value will be modified later
        let fileReader;
        
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            fileReader = new FileReader();
            
            if(file && file.type === "text/plain"){
                fileReader.readAsText(file);
                
                fileReader.onload = evt =>{
                    textAreaElem.value = evt.target.result;
                }
                
            } else {
                textAreaElem.value = "Only text files admitted!"
            }
        } else {
            textAreaElem.value = "Your browser dont support read files features";
        }
        evt.target.classList.remove("hover");
    }
    
    //==============================================================================//
    
    //=========================== WebSocket Events Handlers =======================//
    
    webSocket.onopen = evt => {
        const paragraphElem = document.createElement("p");
        paragraphElem.appendChild(document.createTextNode("Web Socket Connection Opened!"));
        webSocketContainerElem.appendChild(paragraphElem);
        
        webSocket.send("Testing Web Socket Connection!");
    }
    
    webSocket.onerror = evt => {
        const paragraphElem = document.createElement("p");
        paragraphElem.appendChild(document.createTextNode("An error ocurred opening Web Socket"));
        paragraphElem.classList.add("error");
        webSocketContainerElem.appendChild(paragraphElem);
    }
    
    webSocket.onmessage = evt => {
        const paragraphElem = document.createElement("p");
        paragraphElem.appendChild(document.createTextNode("Message recieved from the Server: " + evt.data));
        webSocketContainerElem.appendChild(paragraphElem);
    }
}