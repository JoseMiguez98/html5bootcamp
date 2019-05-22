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
        console.error("There is no listener for "+event+" event")
        return false;
    }

    /*Consider all the methods to remove element from array
    *and i think that in this case iterate with a for loop and
    doing an array.splice() is the best way.*/
    off(event, callback) {
        let eventListeners = this.listeners[event];
        if(eventListeners) {
            for(let i = 0; i<eventListeners.length ; i++){
                if(eventListeners[i] === callback){
                    eventListeners.splice(i,1);
                }
            }
            
            if(!eventListeners.length) {
                delete this.listeners[event];
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
        this.cast = [];
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
    
    addCast(...newCast){
        if(newCast.length) {
            newCast.forEach(element => {
                if(element instanceof Array) {
                    /*Control that only Actors instances and no repeated
                      will be copied*/
                    let validCast = element.filter(actor => {
                        return actor instanceof Actor && !this.cast.includes(actor);
                    });
                    this.cast = this.cast.concat(validCast);
                } else if (element instanceof Actor && !this.cast.includes(element)) {
                    this.cast.push(element);
                }
            });
            return true;
        }
        return false;
    }
}    

class Actor {
    
    constructor(name, age){
        this.name = name;
        this.age = age;
    }    
}    

window.onload = function() {

    function handleResume(args) {
        console.log("Resume event triggered on " + args[0].title);
    }

    //Movie duration is expressed in minutes
    let limitless = new Movie("Limitless", 2011, 105);
    let goodfellas = new Movie("Goodfellas", 1990, 148);
    let backToTheFuture = new Movie("Back to the future", 1985, 116);
    
    let bradleyCooper = new Actor("Bradley Cooper", 44);
    let robertDeNiro = new Actor("Robert De Niro", 75);
    let abbieCornish = new Actor("Abbie Cornish", 36);

    let goodfellasCast = [
        new Actor("Joe Pesci", 76),
        new Actor("Ray Liotta", 64),
        robertDeNiro
    ];
      
    let backToTheFutureCast = [
        new Actor("Michael Fox", 57),
        new Actor("Christopher Lloyd", 80),
        new Actor("Thomas Wilson", 60)
    ];

    limitless.on("play", movie => {
        console.log("Playing event triggered on " + movie[0].title);
    });
    
    backToTheFuture.on("pause", movie => {
        console.log("Pause event triggered on " + movie[0].title);
    });

    goodfellas.on("resume", handleResume);

    //Differents addCast() cases

    //Adding actors individually
    limitless.addCast(bradleyCooper);
    limitless.addCast(robertDeNiro, abbieCornish);

    //Adding actors with array
    goodfellas.addCast(goodfellasCast);

    /*Adding actors with array and individually
    PD: I know that bradley cooper isn't in back to the future :)*/
    backToTheFuture.addCast(backToTheFutureCast, bradleyCooper);

    //Events tests
    limitless.play();
    backToTheFuture.pause();
    goodfellas.resume();
    goodfellas.off("resume", handleResume);
    goodfellas.resume();
}