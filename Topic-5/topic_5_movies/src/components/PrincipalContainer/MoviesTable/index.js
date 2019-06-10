import React from 'react';
import './styles.css';

const MovieRow = props => {
    const {index, name, year, director, genre, isFavourite, editable} = props;
    
    return ( <tr key={ index } >
            <td>
                <input 
                type="checkbox"
                id={ "fav-check-" + index } 
                className="fav-star"
                onChange={ props.toggleFav }
                checked={ isFavourite ? "checked" : "" }
                data-value={ index } />
                <label htmlFor={"fav-check-" + index} className="fav-star-label"></label>
            </td>                
            <th scope="row">
                <input 
                type="text" 
                defaultValue = { name }
                readOnly={ !editable }
                onChange={ props.updateMovie }
                data-index={ index }
                data-key="name"
                size="10" />
            </th>
            <td>
                <input 
                type="number"
                defaultValue={ year }
                readOnly={ !editable }
                onChange={ props.updateMovie }
                data-index={ index }
                data-key="year"
                min="1900"
                max="2020" />
            </td>
            <td>
                <input 
                type="text"
                defaultValue={ director }
                readOnly={ !editable }
                onChange={ props.updateMovie }
                data-index={ index }
                data-key="director"
                size="10" />
            </td>
            <td>
                <input 
                type="text"
                defaultValue={ genre }
                readOnly={ !editable }
                onChange={ props.updateMovie }
                data-index={ index }
                data-key="genre"
                size="10" />
            </td>
            <td>
                <button 
                onClick={ props.deleteMovie }
                data-value={ index }>Delete</button>
            </td>
            <td>
                <button 
                onClick={ props.toggleUpdate }
                data-value={ index }>{editable ? "Save" : "Edit"}</button>
            </td>
        </tr> );
    }
    
const MoviesTable = (props) => {
        
        const {movies, moviesById, favsOnly} = props;
        //If only favourites is checked
        //filter movies that are user favourites
        
        return (
            <div>
                <input 
                id="filter-favs"
                type="checkbox"
                onChange={ props.toggleViewFilter } />
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
                            editable={ movies[id].editable }
                            index={ id }
                            toggleFav={ props.toggleFav }
                            deleteMovie={ props.deleteMovie }
                            updateMovie={ props.updateMovie }
                            toggleUpdate={ props.toggleUpdate } />
                        }
                        //I only put this return because the compiler throw me a warning if i don't
                        return null; }) }
                        </tbody>
                    </table>
                </div>
                )
            }
            
            export default MoviesTable;