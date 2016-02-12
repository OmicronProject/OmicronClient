/**
 * Contains the base class of the front end.
 */
'use strict';

import React from 'react';
import Logo from './components/logo';
import LoginForm from './containers/login_form';
import HTTPTest from './components/http_cors_test';
import {Router, Route, browserHistory} from 'react-router';

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

        if (this.props.pages === undefined){
            this.props.pages = [];
        }
    }

    static make_page(page){
        return(
            <Route path={page.path} component={page.component_to_load}/>
        )
    }

    /**
     * @returns {XML} The component to be rendered
     */
    render() {
        return (
            <Router history={browserHistory}>
                {this.props.pages.map(App.make_page)}
            </Router>
        )
    }
}

export default App;

