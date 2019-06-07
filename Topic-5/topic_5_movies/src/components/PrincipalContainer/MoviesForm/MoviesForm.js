import React, { Component } from 'react';
import './styles.css';

class MoviesForm extends Component {

    render() {
        return (
            //I use arrow function because i need pass a parameter
            <form onSubmit={ this.props.handleSubmit } >
                <fieldset>
                    <legend>Add a new movie!</legend>
                    <label htmlFor="movie-name"> Name </label>
                    <input name="name" id="movie-name" type="text" required/>
                    <label htmlFor="movie-year"> Year </label>
                    <input name="year" id="movie-year" type="number" min="1900" max="2020" required/>
                    <label htmlFor="movie-director"> Director </label>
                    <input name="director" id="movie-director" type="text" required/>
                    <label htmlFor="movie-genre"> Genre </label>
                    <input name="genre" id="movie-genre" type="text" required/>
                    <button id="submit-button" type="submit">Add movie</button>
                </fieldset>
            </form>
        );
    }
}

export default MoviesForm;