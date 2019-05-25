import EventEmitter from './EventEmitter.js';
import Actor from './Actor.js';

export default class Movie extends EventEmitter {
        
    constructor(title, year, duration){
        super();
        this.title = title;
        this.year = year;
        this.duration = duration;
        this.cast = [];

        /*I tried to create a class Social, but when i assign methods to target object
        it doesn't pass context reference and "this" is undefined
        so i had to do it with object literals .
        This method I do not like very much, since "social" should be reusable, 
         but it's the only way I found*/
        let social =  {
            share : friendName => {
                console.log(`${friendName} shares ${this.title}`);
            },
            
            like : friendName => {
                console.log(`${friendName} shares ${this.title}`);
            },
        };
    
        Object.assign(Movie.prototype, social);
        
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleResume = this.handleResume.bind(this);

        this.on("play", this.handlePlay);
        this.on("pause", this.handlePause);   
        this.on("resume", this.handleResume);
    } 
    
    play() {
        this.emit("play");
    }    
    
    pause() {
        this.emit("pause");
    }    
    
    resume() {
        this.emit("resume");
    }
    
    handlePlay() {
        console.log("Playing " + this.title);
    }
    
    handlePause() {
        console.log("Paused " + this.title);
    }
    
    handleResume() {
        console.log("Resumed " + this.title);
    }
    
    addCast(newCast) {
        if(newCast instanceof Actor){
            this.cast.push(newCast);
        } else if(newCast instanceof Array && newCast.length) {
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
        }
    }
} 