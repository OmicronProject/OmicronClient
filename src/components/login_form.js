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


class SignInButton extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        if (this.props.is_active === undefined) {
            this.props.is_active = true;
        }

        this.get_class_name = this.get_class_name.bind(this);
    }

    get_class_name() {
        let className;
        if (this.props.is_active) {
            className = "btn-primary active"
        } else {
            className = 'btn-primary disabled'
        }
        return (className);
    }

    render() {
        return (
            <button className={this.get_class_name()} type="submit"
                    onClick={this.props.onClick}>{this.props.content}
            </button>
        );
    }
}

class SignUpButton extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render() {
        return (
            <button className="btn btn-primary" onClick={this.props.onClick}>
                Sign Up
            </button>
        )
    }
}
export {UserNameBox, PasswordBox, SignInButton, SignUpButton};