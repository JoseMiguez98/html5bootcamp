import React from 'react'
import MovieRow from './MovieRow';

class MoviesTable extends React.Component {

    render() {
        let movies = this.props.movies;
        let rows = movies.map( movie => {
            return <MovieRow
             name = { movie.name }
             year = { movie.year }
             director = { movie.director }
             genre = { movie.genre } />
        });

        return (
            <table>
                <caption>User favourite movies!</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Director</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                   { rows }
                </tbody>
            </table>
        )
    }
}

export default MoviesTable;