"use strict";

class EventEmitter {
    
    constructor() {
        this.listeners = {};
    }
    
    on(event, callback) {
        if(typeof callback === "function"){
            if(!this.listeners[event]) {
                this.listeners[event] = [callback];
            } else{
                this.listeners[event].push(callback);
            }
            return true;
        }
        console.error("Callback must be a function!");
        return false;
    }
    
    emit(event, ...args) {
        if(this.listeners[event]) {
            let eventListeners = this.listeners[event];
            eventListeners.forEach(listener => {
                args.length ? listener(args) : listener();
            });
            return true;
        }
        console.error("Theres no listener for "+event+" event")
        return false;
    }

    //Consider all the methods to remove element from array
    //and i think that in this case iterate with a for loop and
    //doing an array.splice() is the best way.
    off(event, callback) {
        let eventListeners = this.listeners[event];
        if(eventListeners && eventListeners[event].includes(callback)) {
            for(let i = 0; i<eventListeners.length ; i++){
                if(eventListeners[i] === callback){
                    eventListeners.splice(i,1);
                }
            }
            return true;
        }
        return false;   
    }
}


class Movie extends EventEmitter {
    
    constructor(title, year, duration){
        super();
        this.title = title;
        this.year = year;
        this.duration = duration;
    }    
    
    play() {
        this.emit("play", this);
    }    
    
    pause() {
        this.emit("pause", this);
    }    
    
    resume() {
        this.emit("resume", this);
    }    
}    

class Actor {
    
    constructor(name, age){
        this.name = name;
        this.age = age;
    }    
}    

window.onload = function() {
    //Movie duration is expressed in minutes
    let limitless = new Movie("Limitless", 2011, 105);
    let goodfellas = new Movie("Goodfellas", 1990, 148);
    let backToTheFuture = new Movie("Back to the future", 1985, 116);

    limitless.on("play", movie => {
        console.log("Playing event triggered on " + movie[0].title);
    });
    
    backToTheFuture.on("pause", movie => {
        console.log("Pause event triggered on " + movie[0].title);
    });

    goodfellas.on("resume", movie => {
        console.log("Resume event triggered on " + movie[0].title);
    });

    limitless.play();
    backToTheFuture.pause();
    goodfellas.resume();
}