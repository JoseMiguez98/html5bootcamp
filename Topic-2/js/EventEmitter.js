import Log from './Log.js';

export default class EventEmitter {
    
    constructor() {
        this.listeners = {};
        this.loggers = [];
    }
    
    on(event, callback) {
        if(typeof callback === "function"){
            if(!this.listeners[event]) {
                this.listeners[event] = [callback];
            } else{
                this.listeners[event].push(callback);
            }
        }
        else {
            console.error("Callback must be a function!");
        }
    }
    
    emit(event) {
        if(this.listeners[event]) {
            let eventListeners = this.listeners[event];
            eventListeners.forEach(listener => {
                listener();
                this.notify(event);
            });
        }
        else {
            console.error("There is no listener for " + event + " event");
        }
    }
    
    notify(event) {
        if(this.loggers.length) {
            this.loggers.forEach(logger => {
                logger.log(event);
            });
        }
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
        }   
    }
    
    addLogger(logger) {
        if(logger instanceof Log && !this.loggers.includes(logger)){
            this.loggers.push(logger);
        }
    }
    
    removeLoger(logger) {
        if(logger instanceof Log) {
            this.loggers = this.loggers.filter(
                element => {
                    return element != logger;
                }
                );
            }
        }
    }