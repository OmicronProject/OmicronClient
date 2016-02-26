/**
 * Created by Michal on 2016-01-12.
 *
 * Contains the login form for the user. Intended to be used as a test bed for
 * React's form handling
 */
'use strict';
import React, { PropTypes } from 'react';
import Reducer from '../reducer';
import clone from '../object_cloning';
import {connect} from 'react-redux';

export class InputBox extends React.Component {
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
        this.get_class_name = this.get_class_name.bind(this);
    }

    get_class_name() {
        let className;
        if (this.props.is_active) {
            className = "btn btn-primary"
        } else {
            className = 'btn btn-primary disabled'
        }
        return (className);
    }

    render() {
        return (
            <button className={this.get_class_name()} type="button"
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
            <button className="btn btn-primary" onClick={this.props.onClick}
            type="button">
                Sign Up
            </button>
        )
    }
}

class SignInSpinner extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        if (this.props.is_active){
            return (
                <img src={this.props.source} id="loading_spinner" height="20px"/>
            )
        } else {
            return (
                <div className="col-md-1 hidden">
                    <img src={this.props.source} id="loading_spinner" height="20px"/>
                </div>

            )
        }
    }

}

export const LogoutButtonTemplate = ({on_click, className}) => (
    <button className={className} type="button" onClick={on_click}>
        Log Out
    </button>
);

LogoutButtonTemplate.propTypes = {
    on_click: PropTypes.func.isRequired
};

function map_logout_state_to_props(state){
    let is_active = true;
    if (state.user.auth_status !== 'authenticated'){
        is_active = false;
    }

    let className;
    if(is_active){
        className = "btn btn-primary"
    } else {
        className = "btn btn-primary disabled"
    }

    return({
        className: className
    })
}

function map_logout_dispatch_to_props(dispatch){
    return({
        on_click: (event) => (dispatch(logout()))
    })
}

export const LogoutButton = connect(
    map_logout_state_to_props, map_logout_dispatch_to_props
)(LogoutButtonTemplate);

const USER_LOGOUT = "USER_LOGOUT";

function logout(){
    return({
        type: USER_LOGOUT
    })
}

function logout_reducer(state, action){
    if (action.type === USER_LOGOUT){
        let new_state = clone(state);
        new_state.user = {
            username: undefined,
            password: undefined,
            auth_status: "not_authenticated",
            token_expiry_date: undefined
        };

        delete new_state.omicron_api.headers["Authorization"];

        return new_state;
    } else {
        return state;
    }
}

Reducer.register(logout_reducer);


export {UserNameBox, PasswordBox, SignInButton, SignUpButton, SignInSpinner};
