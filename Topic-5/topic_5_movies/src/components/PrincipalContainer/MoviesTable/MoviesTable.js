import React, { Component } from 'react';
import './styles.css';

const MovieRow = props => {
    const {index, name, year, director, genre, isFavourite} = props;

    return ( <tr key={ index } >
            <td>
                <input 
                    type="checkbox"
                    id={ "fav-check-" + index } 
                    className="fav-star"
                    onChange={ props.handleFavStarChange }
                    checked={ isFavourite ? "checked" : "" }
                    data-value={ index }/>
                <label htmlFor={"fav-check-" + index} className="fav-star-label"></label>
            </td>                
            <th scope="row">{ name }</th>
            <td>{ year }</td>
            <td>{ director }</td>
            <td>{ genre }</td>
            <td><button 
                onClick={ props.handleDeleteClick}
                data-value={ index }>Delete</button></td>
    </tr> );
}

class MoviesTable extends Component {
    
    render() {
        const {movies, moviesById, favsOnly} = this.props;
        //If only favourites is checked
        //filter movies that are user favourites
        
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
                    { moviesById.map( (id, index) => {
                        if(!favsOnly || movies[id].isFavourite) {
                            return <MovieRow
                            key={ index }
                            name={ movies[id].name }
                            year={ movies[id].year }
                            director={ movies[id].director }
                            genre={ movies[id].genre }
                            isFavourite={ movies[id].isFavourite }
                            index={ id }
                            handleFavStarChange={ this.props.handleFavStarChange }
                            handleDeleteClick={ this.props.handleDeleteClick } />
                        }
                        //I only put this return because the compiler throw me a warning if i don't
                        return null; }) }
                    </tbody>
                </table>
            </div>
            )
        }
    }
    
    export default MoviesTable;