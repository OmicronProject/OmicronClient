/**
 * Created by Michal on 2015-11-17.
 */
import React from 'react';

class HelloSayer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return <p>Hello {this.props.name}!</p>;
    }
}

export default HelloSayer;