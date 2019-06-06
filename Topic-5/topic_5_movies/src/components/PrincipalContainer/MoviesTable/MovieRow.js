import React from 'react';
import './styles.css';

class MovieRow extends React.Component {
    render() {
        const index = this.props.index;
        return(
            <tr key={ index } >
                <td>
                    <input 
                        type="checkbox"
                        id={ "fav-check-" + index } 
                        className="fav-star"
                        onChange={ () => { this.props.handleFavStarChange(index) } }
                        checked={ this.props.isFavourite ? "checked" : "" }/>
                    <label htmlFor={"fav-check-" + index} className="fav-star-label"></label>
                </td>
                <td>{ this.props.name }</td>
                <td>{ this.props.year }</td>
                <td>{ this.props.director }</td>
                <td>{ this.props.genre }</td>
            </tr>
        );
    }
}

export default MovieRow;