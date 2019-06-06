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
                        onChange={ () => this.props.handleFavStarChange(index)  }
                        checked={ this.props.isFavourite ? "checked" : "" }/>
                    <label htmlFor={"fav-check-" + index} className="fav-star-label"></label>
                </td>
                <th scope="row">{ this.props.name }</th>
                <td>{ this.props.year }</td>
                <td>{ this.props.director }</td>
                <td>{ this.props.genre }</td>
                <td><button onClick={ () => this.props.handleDeleteClick(index)}>Delete</button></td>
            </tr>
        );
    }
}

export default MovieRow;