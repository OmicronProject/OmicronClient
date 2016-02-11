/**
 * Created by Michal on 2016-01-12.
 *
 * Contains the login form for the user. Intended to be used as a test bed for
 * React's form handling
 */
'use strict';
import React from 'react';

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return(
            <div className="form-group">
                <label>{this.box_name}</label>
                <input type={this.input_type}
                       className="form-control"
                       id={this.box_id}
                       onChange={this.props.change_callback}
                       placeholder={this.box_name}
                       value={this.props.value}
                />
            </div>
        )
    }
}

class UserNameBox extends InputBox {
    constructor(props){
        super(props);
        this.box_name = 'Username';
        this.box_id = 'username-entry';
        this.input_type = 'text';
    }
}

class PasswordBox extends InputBox {
    constructor(props){
        super(props);
        this.box_name = 'Password';
        this.box_id = 'password-entry';
        this.input_type = 'password';
    }
}

export {UserNameBox, PasswordBox};