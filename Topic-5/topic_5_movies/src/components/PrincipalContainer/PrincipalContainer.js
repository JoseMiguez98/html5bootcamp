import React from 'react'
import MoviesForm from './MoviesForm/MoviesForm';
import MoviesTable from './MoviesTable/MoviesTable';

class PrincipalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [
                {
                    name: "Limitless",
                    year: "2009",
                    director: "Tarantino",
                    genre: "Drama"
                },
                {
                    name: "Spiderman",
                    year: "2003",
                    director: "Jose",
                    genre: "Acción"
                },
                {
                    name: "Goodfellas",
                    year: "1990",
                    director: "Scorcesse",
                    genre: "Drama"
                },
                {
                    name: "Glass",
                    year: "2019",
                    director: "Shamalyan",
                    genre: "Acción"
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <MoviesForm />
                <MoviesTable movies={ this.state.movies }/>
            </div>
        );
    }
}

export default PrincipalContainer;