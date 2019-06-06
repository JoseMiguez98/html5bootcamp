import React from 'react';
import MovieRow from './MovieRow';

class MoviesTable extends React.Component {
    
    render() {
        //If only favourites is checked
        //filter movies that are user favourites
        let rows = this.props.moviesById.map( (id) => {
            if(!this.props.favsOnly || this.props.movies[id].isFavourite) {
                return <MovieRow
                name = { this.props.movies[id].name }
                year = { this.props.movies[id].year }
                director = { this.props.movies[id].director }
                genre = { this.props.movies[id].genre }
                isFavourite = { this.props.movies[id].isFavourite }
                index = { id }
                handleFavStarChange = { this.props.handleFavStarChange }
                handleDeleteClick = { this.props.handleDeleteClick } />
            }
            //I only put this return because the compiler throw me a warning if i don't
            return null;
        });
        
        return (
            <div>
                <input 
                id="filter-favs"
                type="checkbox"
                onChange={ this.props.handleFavsOnlyChange } />
                <label id="filter-favs-label" htmlFor="filter-favs">Favourites only</label>
                <table>
                    <caption>User movies!</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Name</th>
                            <th scope="col">Year</th>
                            <th scope="col">Director</th>
                            <th scope="col">Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
            </div>
            )
        }
    }
    
    export default MoviesTable;