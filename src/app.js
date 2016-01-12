/**
 * Created by Michal on 2016-01-11.
 */
'use strict';

import React from 'react';
import {react_dom} from 'react-dom';
import Logo from './components/logo';

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
                <Logo source="https://avatars3.githubusercontent.com/u/8391612?v=3&s=460"/>
            </div>
        )
    }
}

export default App;

