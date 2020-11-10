import React, { Component } from 'react';

class Try extends Component{

    render() {
        return(
            <li>과일: {this.props.y.fruit} - {this.props.y.taste} - {this.props.i}</li>
        )
    }
}

export default Try;