import React from 'react';
import MoviesForm from './MoviesForm/MoviesForm';
import MoviesTable from './MoviesTable/MoviesTable';
import './styles.css'

class PrincipalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: {
               movie1: {
                    name: "Limitless",
                    year: "2009",
                    director: "Tarantino",
                    genre: "Drama",
                    isFavourite: true
                },
                movie2: {
                    name: "Spiderman",
                    year: "2003",
                    director: "Jose",
                    genre: "Acción",
                    isFavourite: true
                },
                movie3: {
                    name: "Goodfellas",
                    year: "1990",
                    director: "Scorcesse",
                    genre: "Drama",
                    isFavourite: true
                },
                movie4: {
                    name: "Glass",
                    year: "2019",
                    director: "Shamalyan",
                    genre: "Acción",
                    isFavourite: false
                }
            },
            moviesById: ["movie1", "movie2", "movie3", "movie4"],

            favsOnly: false
        }

        this.handleFavStarChange = this.handleFavStarChange.bind(this);
        this.handleFavsOnlyChange = this.handleFavsOnlyChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFavStarChange(index) {
        const movies = this.state.movies;
        movies[index].isFavourite = !movies[index].isFavourite;

        this.setState({ movies });
    }
    
    handleFavsOnlyChange() {
        this.setState({
            favsOnly: !this.state.favsOnly
        });
    }

    handleFormSubmit(evt) {
        const data = new FormData(evt.target);

        //Check if form is not empty
        if(data.get("name") && data.get("year") && data.get("director") && data.get("genre")){

            const indexList = this.state.moviesById;
            const newIndex = "movie" + (Object.keys(this.state.movies).length + 1);
            let movies = this.state.movies;

            movies[newIndex] = {
                name : data.get("name"),
                year: data.get("year"),
                director: data.get("director"),
                genre: data.get("genre"),
                isFavourite: false
            }

            indexList.push(newIndex);

            this.setState({
                movies,
                moviesById: indexList
            });
        }  
    }

    render() {
        return (
            <div className="principal-container">
                <MoviesForm
                    handleSubmit= { this.handleFormSubmit }/>
                <MoviesTable 
                    movies={ this.state.movies }
                    moviesById={ this.state.moviesById }
                    favsOnly={ this.state.favsOnly }
                    handleFavStarChange= { this.handleFavStarChange }
                    handleFavsOnlyChange= { this.handleFavsOnlyChange } />
            </div>
        );
    }
}

export default PrincipalContainer;