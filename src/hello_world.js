import React from 'react';

class HelloWorld extends React.Component {
    constructor(props){
        this.props = props;
    }

    render() {
        return <p>Hello, {this.props.name}!</p>;
    }

    static hello_world() {
        return 'Hello World';
    }
}

export default HelloWorld;
