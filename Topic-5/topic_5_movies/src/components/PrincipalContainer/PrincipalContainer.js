import React from 'react';
import MoviesForm from './MoviesForm/MoviesForm';
import MoviesTable from './MoviesTable/MoviesTable';
import './styles.css'

class PrincipalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: {
                Limitless: {
                    name: "Limitless",
                    year: "2009",
                    director: "Tarantino",
                    genre: "Drama",
                    isFavourite: true
                },
                Spiderman: {
                    name: "Spiderman",
                    year: "2003",
                    director: "Jose",
                    genre: "Acción",
                    isFavourite: true
                },
                Goodfellas: {
                    name: "Goodfellas",
                    year: "1990",
                    director: "Scorcesse",
                    genre: "Drama",
                    isFavourite: true
                },
                Glass: {
                    name: "Glass",
                    year: "2019",
                    director: "Shamalyan",
                    genre: "Acción",
                    isFavourite: false
                }
            },
            moviesById: ["Limitless", "Spiderman", "Goodfellas", "Glass"],

            favsOnly: false
        }

        this.handleFavStarChange = this.handleFavStarChange.bind(this);
        this.handleFavsOnlyChange = this.handleFavsOnlyChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
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
        if(data.get("name") && data.get("year") && data.get("director") && data.get("genre")) {
                const indexList = this.state.moviesById;

                //Check if movie exists, only to not admit repeated.
                if(!indexList.includes(data.get("name"))){

                let movies = this.state.movies;

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
            }
        } else {
            alert("The movie is already in the list");
        }
    }

    handleDeleteClick(index) {
        const indexList = this.state.moviesById.filter(movie => {
            return movie !== index;
        });

        let movies = this.state.movies;
        delete movies.index;

        this.setState({
            movies,
            moviesById: indexList
        });

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
                    handleFavsOnlyChange= { this.handleFavsOnlyChange }
                    handleDeleteClick= { this.handleDeleteClick } />
            </div>
        );
    }
}

export default PrincipalContainer;