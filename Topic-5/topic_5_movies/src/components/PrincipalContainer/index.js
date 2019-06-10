import React from 'react';
import MoviesForm from './MoviesForm'
import MoviesTable from './MoviesTable';
import { connect } from 'react-redux';
import { 
    addMovie,
    deleteMovie,
    updateMovie,
    toggleUpdate,
    toggleFav,
    toggleViewFilter
} from '../../redux/actions';
import './styles.css'

const PrincipalContainer = (props) => (
        <div className="principal-container">
        <MoviesForm
        addMovie = { props.addMovie }/>
        <MoviesTable 
        movies={ props.movies }
        moviesById={ props.moviesById }
        deleteMovie={ props.deleteMovie }
        favsOnly={ props.favsOnly }
        toggleFav={ props.toggleFav }
        toggleViewFilter={ props.toggleViewFilter }
        updateMovie={ props.updateMovie }
        toggleUpdate={ props.toggleUpdate } />
        </div>
    );
    
    const mapDispatchToProps = dispatch => {
        return {
            addMovie: evt => dispatch(addMovie(evt)),
            deleteMovie: evt => dispatch(deleteMovie(evt)),
            updateMovie: evt => dispatch(updateMovie(evt)),
            toggleUpdate: evt => dispatch(toggleUpdate(evt)),
            toggleFav: evt => dispatch(toggleFav(evt)),
            toggleViewFilter: () => dispatch(toggleViewFilter())
        };
    }
    
    const mapStateToProps = state => {
        return {
            movies: state.movie.movies,
            moviesById: state.movie.moviesById,
            favMoviesId: state.movie.favMoviesId,
            favsOnly: state.filter.favsOnly
        }
    }
    
    export default connect(mapStateToProps ,mapDispatchToProps)(PrincipalContainer);