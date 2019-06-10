import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';
import { viewFilterReducer } from './viewFilterReducer';

export const initialState = {
    movies: {
        Limitless: {
            name: "Limitless",
            year: "2009",
            director: "Tarantino",
            genre: "Drama",
            isFavourite: true,
            editable: false
        },
        Spiderman: {
            name: "Spiderman",
            year: "2003",
            director: "Jose",
            genre: "Acción",
            isFavourite: true,
            editable: false
        },
        Goodfellas: {
            name: "Goodfellas",
            year: "1990",
            director: "Scorcesse",
            genre: "Drama",
            isFavourite: true,
            editable: false
        },
        Glass: {
            name: "Glass",
            year: "2019",
            director: "Shamalyan",
            genre: "Acción",
            isFavourite: false,
            editable: false
        }
    },
    moviesById: ["Limitless", "Spiderman", "Goodfellas", "Glass"],
    favMoviesId: ["Limitless", "Spiderman", "Goodfellas"],
    favsOnly: false
}

export default combineReducers({
    movie: movieReducer,
    filter: viewFilterReducer
});