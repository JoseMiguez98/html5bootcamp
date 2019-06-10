import {
    ADD_MOVIE,
    DELETE_MOVIE,
    UPDATE_MOVIE,
    TOGGLE_UPDATE,
    TOGGLE_FAV
} from '../types';

import { initialState } from './index';

const movieReducer = (state = initialState, action) => {
    let newState;
    let id;
    
    //I declare id at the top of the function because otherwise
    //i need to redefine inside each case of the switch statement
    if(action.payload){
        id = action.payload.id;
    }
    
    switch (action.type) {
        case ADD_MOVIE:
        let { movie } = action.payload;
        
        //Copy the state and add new index
        newState = {
            ...state,
            movies: {...state.movies},
            moviesById: [...state.moviesById, id]
        };
        
        //Add movie to my new state
        newState.movies[id] = movie;
        
        return newState;
        
        case DELETE_MOVIE:
        
        //Copy the state and filter index
        newState = {
            ...state,
            moviesById: state.moviesById.filter(movie => {
                return movie !== id;
            })
        };
        
        //Delete movie from new state
        delete newState.id;
        
        return newState;
        
        case UPDATE_MOVIE:
        const {text, key} = action.payload;
        
        newState = {
            ...state,
            movies: {...state.movies}
        }
        
        newState.movies[id][key] = text;
        
        return newState;
        
        case TOGGLE_UPDATE:
        
        newState = {
            ...state,
            movies: {
                ...state.movies, ...state.movies[id].editable = !state.movies[id].editable
            }
        }
        
        return newState;
        
        case TOGGLE_FAV:
        
        const { checked }= action.payload;
        
        let favMoviesId = [...state.favMoviesId];
        //Check if user wants add or remove movie from favs
        //is better to performance ask for the checkbox value
        //than iterate favs index and see if i need remove or push
        //new index each time that the user click a star.
        if(!checked) {
            favMoviesId = favMoviesId.filter(movie => {
                return movie !== id;
            });
        } else {
            favMoviesId.push(id);
        }

        newState = {
            ...state,
            movies: {...state.movies, ...state.movies[id].isFavourite = !state.movies[id].isFavourite},
            favMoviesId
        }
        
        return newState;
        
        default:
        return state;
    }
}

export { movieReducer };