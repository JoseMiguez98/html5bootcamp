import React, { Component } from 'react';
import MoviesForm from './MoviesForm/MoviesForm';
import MoviesTable from './MoviesTable/MoviesTable';
import './styles.css'

class PrincipalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

        this.handleFavStarChange = this.handleFavStarChange.bind(this);
        this.handleFavsOnlyChange = this.handleFavsOnlyChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleRowUpdate = this.handleRowUpdate.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleFavStarChange(evt) {
        const index = evt.target.dataset.value;
        //I cache check value here because evt.target is undefinded
        //inside setState() callback
        const checked = evt.target.checked;
        this.setState( prevState => {
            let favMoviesId = [...prevState.favMoviesId];
            //Check if user wants add or remove movie from favs
            //is better to performance ask for the checkbox value
            //than iterate favs index and see if i need remove or push
            //new index each time that the user click a star.
            if(!checked) {
                favMoviesId = favMoviesId.filter(movie => {
                    return movie !== index;
                });
            } else {
                favMoviesId.push(index);
            }

            return { 
                movies: {...prevState.movies, ...prevState.movies[index].isFavourite = !prevState.movies[index].isFavourite},
                favMoviesId
                
            };     
        });
    }
    
    handleFavsOnlyChange() {
        this.setState({
            favsOnly: !this.state.favsOnly
        });
    }

    handleFormSubmit(evt) {
        evt.preventDefault();
        const data = new FormData(evt.target);

        //Check if form is not empty
        if(data.get("name") && data.get("year") && data.get("director") && data.get("genre")) {
                const {moviesById: indexList} = this.state;

                //Check if movie exists, only to not admit repeated.
                if(!indexList.includes(data.get("name"))){

                let { movies }= this.state;

                movies[data.get("name")] = {
                    name : data.get("name"),
                    year: data.get("year"),
                    director: data.get("director"),
                    genre: data.get("genre"),
                    isFavourite: false
                }

                indexList.push(data.get("name"));

                this.setState({
                    movies,
                    moviesById: indexList
                });
            } else {
                alert("The movie is already in the list");
            }
        }
    }

    handleDeleteClick(evt) {
        const index = evt.target.dataset.value;
        const indexList = this.state.moviesById.filter(movie => {
            return movie !== index;
        });

        let { movies }= this.state;
        delete movies.index;

        this.setState({
            movies,
            moviesById: indexList
        });

    }

    handleRowUpdate(evt){
        const index = evt.target.dataset.index;
        const key = evt.target.dataset.key;
        const newValue = evt.target.value;

        //If is updating year check that is not
        //out of range
        if(key !== "year" || newValue >= 1900 & newValue <= 2020){
            this.setState(prevState => {
                prevState.movies[index][key] = newValue
                return{ movies: {...prevState.movies} };
            });
        }
    }

    handleEditClick(evt) {
        const index = evt.target.dataset.value;

        this.setState(prevState => {
            return {movies: {...prevState.movies, ...prevState.movies[index].editable = !prevState.movies[index].editable}}
        });
    }

    render() {
        return (
            <div className="principal-container">
                <MoviesForm
                    handleSubmit={ this.handleFormSubmit }/>
                <MoviesTable 
                    movies={ this.state.movies }
                    moviesById={ this.state.moviesById }
                    favsOnly={ this.state.favsOnly }
                    handleFavStarChange={ this.handleFavStarChange }
                    handleFavsOnlyChange={ this.handleFavsOnlyChange }
                    handleDeleteClick={ this.handleDeleteClick }
                    handleRowUpdate={ this.handleRowUpdate }
                    handleEditClick={ this.handleEditClick } />
            </div>
        );
    }
}

export default PrincipalContainer;