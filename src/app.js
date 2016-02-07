/**
 * Contains the base class of the front end.
 */
'use strict';

import React from 'react';
import Logo from './components/logo';
import LoginForm from './components/LoginForm';
import HeaderBar from './components/header';
import {Router, Route, Link} from 'react-router';

import "bootstrap/dist/css/bootstrap.min.css";


/**
 * class responsible for creating the first-rendered React component
 */
class App extends React.Component {
    /**
     * Constructs the base method, takes in a unique name for the
     * app component, and sets the props and state for the component
     *
     * @param {object} props The properties of this component
     * @param {object} state The set of variables making up this component's state
     */
    constructor(props, state){
        super(props, state);
        if (props === undefined){
            this.props = {};
        } else {
            this.props = props;
        }

        if (state === undefined) {
            this.state = {};
        } else {
            this.state = state
        }
    }

    /**
     * @returns {XML} The component to be rendered
     */
    render() {
        return (
            <div>
            <HeaderBar
            buttons={
                    [
                        {name: "Home", link: "#", key: "header_button1"},
                        {name: "Dashboard", link: "#", key: "header_button2"},
                        {name: "Login", link: "#", key: "header_button3"}
                    ]
                    }
            />
            <Router>
                <Route path="/" component={LoginForm} />
            </Router>
            </div>
        )
    }
}

export default App;

