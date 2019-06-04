import React from 'react'
import './styles.css';

class MoviesForm extends React.Component {

    render() {
        return (
            <form>
                <fieldset>
                    <legend>Add a new movie!</legend>
                    <label htmlFor="movie-name"> Name </label>
                    <input id="movie-name" type="text" />
                    <label htmlFor="movie-year"> Year </label>
                    <input id="movie-year" type="number" min="1900" max="2020" />
                    <label htmlFor="movie-director"> Director </label>
                    <input id="movie-director" type="text" />
                    <label htmlFor="movie-genre"> Genre </label>
                    <input id="movie-genre" type="text" />
                    <button id="submit-button" type="submit">Add movie</button>
                </fieldset>
            </form>
        );
    }
}

export default MoviesForm;