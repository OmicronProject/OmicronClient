/**
 * Contains the base class of the front end.
 */
'use strict';

import React from 'react';
import {react_dom} from 'react-dom';
import Logo from './components/logo';
import LoginForm from './components/LoginForm';

/**
 * class responsible for creating the first-rendered React component
 */
class App extends React.Component {
    /**
     * Constructs the base method, takes in a unique name for the
     * app component, and sets the props and state for the component
     *
     * @param {string} className The name of the instance of this component
     * @param {object} props The properties of this component
     * @param {object} state The set of variables making up this component's state
     */
    constructor(className, props, state){
        super(props, state);
        if (className === undefined) {
            throw Error('A Generic App object was instantiated without a className')
        }
        if (props === undefined) {
            console.log(
                'Props undefined for class ' + String(className) + '. Using {} instead'
            );
            this.props = {};
        } else {
            this.props = props;
        }

        if (state === undefined) {
            console.log(
                'State undefined for class ' + String(className) + '. Using {} instead'
            );
            this.state = {}
        } else {
            this.state = state;
        }
    }

    /**
     * @returns {XML} The component to be rendered
     */
    render() {
        return (
            <div>
                <LoginForm />
            </div>
        )
    }
}

export default App;

