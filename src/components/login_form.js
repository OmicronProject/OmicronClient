/**
 * Created by Michal on 2016-01-12.
 *
 * Contains the login form for the user. Intended to be used as a test bed for
 * React's form handling
 */
'use strict';
import React, { PropTypes } from 'react';
import Reducer, { reducer_factory } from '../reducer';
import clone from '../object_cloning';
import {connect} from 'react-redux';
import {Input, Glyphicon} from 'react-bootstrap';
import store from '../store';

import login_user from '../auth/login';
import logout_user from '../auth/logout';

import '../../static/css/components/login_form.css';
import spinner from '../../static/img/hourglass.svg';

const UsernameBoxTemplate = ({value, on_change}) => (
    <Input type="text"
           value={value}
           onChange={on_change}
           placeholder="Username"
           autoCapitalize="off"
           autoComplete="off"
           autoCorrect="off"
           label="Username"
    />
);

UsernameBoxTemplate.PropTypes = {
    value: PropTypes.string,
    on_change: PropTypes.func.isRequired
};

const map_state_to_username_props = (state) => ({
    value: state.auth.front_end.username
});

const map_dispatch_to_username_props = (dispatch) => ({
    on_change: (event) => {dispatch(username_changed(event.target.value))}
});

const USERNAME_CHANGED = "USERNAME_CHANGED";

const username_changed = (new_username) => (
    {type: USERNAME_CHANGED, username: new_username}
);

const username_changed_reducer = (state, action) => {
    state.auth.front_end.username = action.username
};

Reducer.register(reducer_factory(USERNAME_CHANGED)(username_changed_reducer));

export const UsernameBox = connect(
    map_state_to_username_props, map_dispatch_to_username_props
)(UsernameBoxTemplate);

const PasswordBoxTemplate = ({value, on_change}) => (
    <Input type="password"
           value={value}
           label="Password"
           onChange={on_change}
    />
);

PasswordBoxTemplate.PropTypes = {
    value: PropTypes.string,
    on_change: PropTypes.func.isRequired
};

const PASSWORD_CHANGED = "PASSWORD_CHANGED";

const password_changed = (new_password) => (
    {type: PASSWORD_CHANGED, password: new_password}
);

const password_changed_reducer = (state, action) => {
    state.auth.front_end.password = action.password
};

Reducer.register(reducer_factory(PASSWORD_CHANGED)(password_changed_reducer));

const map_state_to_password_props = (state) => (
    {value: state.auth.front_end.password}
);

const map_dispatch_to_password_props = (dispatch) => ({
    on_change: (event) => {dispatch(password_changed(event.target.value))}
});

export const PasswordBox = connect(map_state_to_password_props,
    map_dispatch_to_password_props)(PasswordBoxTemplate);

export const SignInButtonTemplate = ({on_click, className, content}) => (
    <button type="button"
            className={"btn btn-primary " + className}
            id="SignInButton"
            onClick={on_click}
    >
        {content}
    </button>
);

SignInButtonTemplate.PropTypes = {
    on_click: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};


const login_button_clicked = () => (dispatch) => {
    let state = store.getState();

    let is_authenticating = state.auth.front_end.is_authenticating;
    let is_logging_out = state.auth.front_end.is_logging_out;

    let has_authenticated = state.auth.front_end.has_authenticated;

    if (is_authenticating){
        console.log('Attempted to click login button while logging in');
    }

    if(is_logging_out){
        console.log('Attempted to click login button while logging out');
    }

    if(!has_authenticated && !is_authenticating){
        dispatch(login_user());
    }

    if(has_authenticated && !is_logging_out){
        dispatch(logout_user());
    }
};

const map_state_to_signin_button_props = (state) => {
    let className;
    let content;

    let is_authenticating = state.auth.front_end.is_authenticating;
    let has_authenticated = state.auth.front_end.has_authenticated;
    let is_logging_out = state.auth.front_end.is_logging_out;
    let has_logged_out = state.auth.front_end.has_logged_out;

    let loading_spinner = <img src={spinner}
                               alt="Loading Spinner"
                               id="loading_spinner"
                           />;

    className = '';
    content = 'Sign In';

    if(is_authenticating){
        className = 'disabled';
        content = 'Logging In ' + loading_spinner;
    }

    if(has_authenticated){
        className = '';
        content = 'Sign Out ' + <Glyphicon glyph="log-out" />;
    }

    if(is_logging_out){
        className = 'disabled';
        content = 'Logging Out ' + loading_spinner;
    }

    if(has_logged_out){
        className = '';
        content = 'Sign In ' + <Glyphicon glyph="log-in" />;
    }

    return({className: className, content: content});
};

const map_dispatch_to_signin_button_props = (dispatch) => ({
    on_click: () => {dispatch(login_button_clicked())}
});

export const SignInButton = connect(map_state_to_signin_button_props, map_dispatch_to_signin_button_props)(SignInButtonTemplate);