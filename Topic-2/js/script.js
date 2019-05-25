"use strict";

window.onload = function() {
    
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
    
    
    
    //Differents addCast() cases
    
    //Adding actors individually
    limitless.addCast(bradleyCooper);
    limitless.addCast([robertDeNiro, abbieCornish]);
    
    //Adding actors with array
    goodfellas.addCast(goodfellasCast);
    
    /*Adding actors with array and individually
    PD: I know that bradley cooper isn't in back to the future :)*/
    backToTheFuture.addCast(backToTheFutureCast, bradleyCooper);
    
    //Adding loggers to listen events
    limitless.addLogger(new Log());
    backToTheFuture.addLogger(new Log());
    goodfellas.addLogger(new Log());
    
    //Events tests
    limitless.play();
    backToTheFuture.pause();
    goodfellas.resume();
    
    //Social tests
    limitless.share("Jose");
    backToTheFuture.like("Kevin");
}