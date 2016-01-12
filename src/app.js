/**
 * Created by Michal on 2016-01-11.
 */
'use strict';

import React from 'react';
import {react_dom} from 'react-dom';
import Logo from './components/logo';
import LoginForm from './components/LoginForm';

class App extends React.Component {
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

    render() {
        return (
            <div>
                <LoginForm />
            </div>
        )
    }
}

export default App;

