import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './src/hello_world';

ReactDOM.render(
    <HelloWorld name="World" />,
    document.getElementById('app-container')
);
