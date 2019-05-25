class Actor {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

}
class EventEmitter {
  constructor() {
    this.listeners = {};
    this.loggers = [];
  }

  on(event, callback) {
    if (typeof callback === "function") {
      if (!this.listeners[event]) {
        this.listeners[event] = [callback];
      } else {
        this.listeners[event].push(callback);
      }
    } else {
      console.error("Callback must be a function!");
    }
  }

  emit(event) {
    if (this.listeners[event]) {
      let eventListeners = this.listeners[event];
      eventListeners.forEach(listener => {
        listener();
        this.notify(event);
      });
    } else {
      console.error("There is no listener for " + event + " event");
    }
  }

  notify(event) {
    if (this.loggers.length) {
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

    if (eventListeners) {
      for (let i = 0; i < eventListeners.length; i++) {
        if (eventListeners[i] === callback) {
          eventListeners.splice(i, 1);
        }
      }

      if (!eventListeners.length) {
        delete this.listeners[event];
      }
    }
  }

  addLogger(logger) {
    if (logger instanceof Log && !this.loggers.includes(logger)) {
      this.loggers.push(logger);
    }
  }

  removeLoger(logger) {
    if (logger instanceof Log) {
      this.loggers = this.loggers.filter(element => {
        return element != logger;
      });
    }
  }

}
class Log {
  log(info) {
    console.log("Event " + info + " was emitted");
  }

}
class Movie extends EventEmitter {
  constructor(title, year, duration) {
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

    let social = {
      share: friendName => {
        console.log(`${friendName} shares ${this.title}`);
      },
      like: friendName => {
        console.log(`${friendName} shares ${this.title}`);
      }
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
    if (newCast instanceof Actor) {
      this.cast.push(newCast);
    } else if (newCast instanceof Array && newCast.length) {
      newCast.forEach(element => {
        if (element instanceof Array) {
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
"use strict";

window.onload = function () {
  //Movie duration is expressed in minutes
  let limitless = new Movie("Limitless", 2011, 105);
  let goodfellas = new Movie("Goodfellas", 1990, 148);
  let backToTheFuture = new Movie("Back to the future", 1985, 116);
  let bradleyCooper = new Actor("Bradley Cooper", 44);
  let robertDeNiro = new Actor("Robert De Niro", 75);
  let abbieCornish = new Actor("Abbie Cornish", 36);
  let goodfellasCast = [new Actor("Joe Pesci", 76), new Actor("Ray Liotta", 64), robertDeNiro];
  let backToTheFutureCast = [new Actor("Michael Fox", 57), new Actor("Christopher Lloyd", 80), new Actor("Thomas Wilson", 60)]; //Differents addCast() cases
  //Adding actors individually

  limitless.addCast(bradleyCooper);
  limitless.addCast([robertDeNiro, abbieCornish]); //Adding actors with array

  goodfellas.addCast(goodfellasCast);
  /*Adding actors with array and individually
  PD: I know that bradley cooper isn't in back to the future :)*/

  backToTheFuture.addCast(backToTheFutureCast, bradleyCooper); //Adding loggers to listen events

  limitless.addLogger(new Log());
  backToTheFuture.addLogger(new Log());
  goodfellas.addLogger(new Log()); //Events tests

  limitless.play();
  backToTheFuture.pause();
  goodfellas.resume(); //Social tests

  limitless.share("Jose");
  backToTheFuture.like("Kevin");
};
"use strict";

window.onload = function () {
  //Movie duration is expressed in minutes
  let limitless = new Movie("Limitless", 2011, 105);
  let goodfellas = new Movie("Goodfellas", 1990, 148);
  let backToTheFuture = new Movie("Back to the future", 1985, 116);
  let bradleyCooper = new Actor("Bradley Cooper", 44);
  let robertDeNiro = new Actor("Robert De Niro", 75);
  let abbieCornish = new Actor("Abbie Cornish", 36);
  let goodfellasCast = [new Actor("Joe Pesci", 76), new Actor("Ray Liotta", 64), robertDeNiro];
  let backToTheFutureCast = [new Actor("Michael Fox", 57), new Actor("Christopher Lloyd", 80), new Actor("Thomas Wilson", 60)]; //Differents addCast() cases
  //Adding actors individually

  limitless.addCast(bradleyCooper);
  limitless.addCast([robertDeNiro, abbieCornish]); //Adding actors with array

  goodfellas.addCast(goodfellasCast);
  /*Adding actors with array and individually
  PD: I know that bradley cooper isn't in back to the future :)*/

  backToTheFuture.addCast(backToTheFutureCast, bradleyCooper); //Adding loggers to listen events

  limitless.addLogger(new Log());
  backToTheFuture.addLogger(new Log());
  goodfellas.addLogger(new Log()); //Events tests

  limitless.play();
  backToTheFuture.pause();
  goodfellas.resume(); //Social tests

  limitless.share("Jose");
  backToTheFuture.like("Kevin");
};
