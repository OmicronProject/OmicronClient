import React from 'react';
import ReactDOM from 'react-dom';

var HelloWorld = React.createClass({
    render: function() {
        return(
            <p>Hello, world!</p>
        );
    }
});

ReactDOM.render(
    <HelloWorld />,
    document.getElementById('app-container')
);