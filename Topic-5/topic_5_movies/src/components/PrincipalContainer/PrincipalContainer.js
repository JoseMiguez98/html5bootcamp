import React, { Component } from 'react';
import MoviesForm from './MoviesForm/MoviesForm';
import MoviesTable from './MoviesTable/MoviesTable';
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

class PrincipalContainer extends Component {
    
    render() {
        return (
            <div className="principal-container">
            <MoviesForm
            handleSubmit={ this.handleFormSubmit }
            addMovie = { this.props.addMovie }/>
            <MoviesTable 
            movies={ this.props.movies }
            moviesById={ this.props.moviesById }
            deleteMovie={ this.props.deleteMovie }
            favsOnly={ this.props.favsOnly }
            toggleFav={ this.props.toggleFav }
            toggleViewFilter={ this.props.toggleViewFilter }
            updateMovie={ this.props.updateMovie }
            toggleUpdate={ this.props.toggleUpdate } />
            </div>
            );
        }
    }
    
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