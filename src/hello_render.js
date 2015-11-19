/**
 * Created by Michal on 2015-11-17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import HelloForm from './HelloForm';

function render_app (target) {
    ReactDOM.render(<HelloForm />, target);
}

export default render_app;