import { 
    ADD_MOVIE,
    DELETE_MOVIE, 
    UPDATE_MOVIE, 
    TOGGLE_FAV, 
    TOGGLE_UPDATE
} from '../types';

const addMovie = evt => {
    evt.preventDefault();
    const data = new FormData(evt.target);
    let movie;
    
    //Check if form is not empty
    if(data.get("name") && data.get("year") && data.get("director") && data.get("genre")) {
        movie = { 
            name : data.get("name"),
            year: data.get("year"),
            director: data.get("director"),
            genre: data.get("genre"),
            isFavourite: false
        }
    }
    
    return {
        type: ADD_MOVIE,
        payload: {
            id: movie.name,
            movie
        }
    };
};

const deleteMovie = evt => ({
    type: DELETE_MOVIE,
    payload: {
        id: evt.target.dataset.value
    }
});

const updateMovie = evt => {
    const id = evt.target.dataset.index;
    const key = evt.target.dataset.key;
    let text = evt.target.value;
    
    //If year is out of range i modify value
    //to preserve consistency, i know that
    //in a real case i must notify this to
    //the user but in this case i thin that
    //is not necesary, correct me if i'm wrong.
    if(key === "year" & text < 1900 || text > 2020){
        text = text < 1900 ? 1900 : 2020;
    }
    
    return {
        type: UPDATE_MOVIE,
        payload: {id, key, text}
    };
};

const toggleUpdate = evt => {
    const id = evt.target.dataset.value;
    
    return {
        type: TOGGLE_UPDATE,
        payload: {id}
    };
};

const toggleFav = evt => {
    const id = evt.target.dataset.value;
    //I cache check value here because evt.target is undefinded
    //inside setState() callback
    const checked = evt.target.checked;
    
    
    return {
        type: TOGGLE_FAV,
        payload: {id, checked}
    }
};

export {addMovie, deleteMovie, updateMovie, toggleFav, toggleUpdate};