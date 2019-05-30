window.onload = () => {

"use strict";

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
// ======================================================================================//

    const saveButtonElem = document.getElementsByClassName("button save")[0];
    const deleteButtonElem = document.getElementsByClassName("button delete")[0];
    const textAreaElem = document.getElementById("txt-area");
    let db;
    
    saveButtonElem.onclick = () => {
        const value = textAreaElem.value.trim();
        const saveAdviseElem = document.getElementsByClassName("save-advise")[0];
        // keyNumber is only to allow save more than         
        // one data and not override the last
        const keyNumber = Object.keys(window.localStorage).length;
        
        if(value.length != 0){
            
            if(window.localStorage && window.localStorage != null) {
                window.localStorage.setItem("data" + keyNumber, value);
            }

            addIndexedDBData(value);
            
            saveAdviseElem.classList.add("fade-in");
            
            saveAdviseElem.addEventListener("animationend", () =>{
                saveAdviseElem.classList.remove("fade-in");
            });
            
        }
        
        deleteButtonElem.onclick = () => {
            const deleteAdviseElem = document.getElementsByClassName("delete-advise")[0];
            const IDBStores = db.objectStoreNames;
            const IDBtransaction = db.transaction(IDBStores, "readwrite");
            
            //Clear Local Storage
            window.localStorage.clear();
            
            //Clean IndexedDB, this clear data DONT delete ObjectStore element
            for(let i = 0; i<IDBStores.length ; i++){
                IDBtransaction.objectStore(IDBStores.item(i)).clear();
            }
            
            deleteAdviseElem.classList.add("fade-in");
            
            deleteAdviseElem.addEventListener("animationend", () => {
                deleteAdviseElem.classList.remove("fade-in");
            });
        }
    }
}