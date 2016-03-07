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

import '../../static/css/components/login_form.css';

/**
 * Generic component for an input box. This is subclassed by other components
 * in the Login Form in order to render the username and password entries.
 */
export class InputBox extends React.Component {
    /**
     * Constructs an instance of InputBox
     * @param {Object} props The input box's static properties.
     */
    constructor(props) {
        super(props);
        this.props = props;
    }

    /**
     * Render the component into React's virtual DOM.
     *
     * @returns {XML} The blueprint for an input box, with given properties
     */
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
                       autoComplete="off"
                       autoCorrect="off"
                       autoCapitalize="off"
                />
            </div>
        )
    }
}

/**
 * Renders a username box
 */
class UserNameBox extends InputBox {
    constructor(props){
        super(props);
        this.box_name = 'Username';
        this.box_id = 'username-entry';
        this.input_type = 'text';
    }
}

/**
 * Renders a password box with masked input characters.
 */
class PasswordBox extends InputBox {
    constructor(props){
        super(props);
        this.box_name = 'Password';
        this.box_id = 'password-entry';
        this.input_type = 'password';
    }
}

/**
 * Constructs and renders a button enabling the user to sign in
 */
class SignInButton extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.get_class_name = this.get_class_name.bind(this);
    }

    /**
     * Returns the appropriate name of the element class to which this
     * button belongs. The "is_active" flag in the Props states whether this
     * component should be grayed out or not. If the button is to be grayed
     * out, the class of this button is changed to "disabled".
     *
     * @returns {String} The className of the button
     */
    get_class_name() {
        let className;
        if (this.props.is_active) {
            className = "btn btn-primary"
        } else {
            className = 'btn btn-primary disabled'
        }
        return (className);
    }

    /**
     * Render the component into the DOM.
     *
     * @returns {XML}
     */
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
                <img src={this.props.source} id="loading_spinner"/>
            )
        } else {
            return (
                <div className="col-md-1 hidden">
                    <img src={this.props.source} id="loading_spinner"/>
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

export function map_logout_state_to_props(state){
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

export function logout(){
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
