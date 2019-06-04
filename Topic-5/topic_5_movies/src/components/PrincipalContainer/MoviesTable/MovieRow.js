import React from 'react'

class MovieRow extends React.Component {
    render() {
        return(
            <tr>
                <td>{ this.props.name }</td>
                <td>{ this.props.year }</td>
                <td>{ this.props.director }</td>
                <td>{ this.props.genre }</td>
            </tr>
        );
    }
}

export default MovieRow;