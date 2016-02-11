/**
 * Created by Michal on 2015-12-07.
 */
import App from './src/app';
import React from 'react';
import React_DOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './src/store';

React_DOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app-container'));