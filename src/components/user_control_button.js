/**
 *
 * Contains a component for a multi-use button that is capable of sensing
 * whether the user is logged in or not. If the user is logged in, the button
 * displays a "Log Out" text and dispatches the appropriate action. If the user
 * has not yet logged in, the button displays the "Log In" text, and dispatches
 * a log in action on click. If the authenticator is busy, the button is
 * disabled, and a loading spinner is visible
 *
 * Created by Michal on 2016-03-15.
 */
'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Glyphicon} from 'react-bootstrap';
import store from '../store';
import login_user from '../auth/login';
import logout_user from '../auth/logout';

import spinner from '../../static/img/user_control_spinner.gif';

export const SignInButtonTemplate = ({on_click, className, content, icon}) => (
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


export const login_button_clicked = (state=store.getState()) => (dispatch) => {

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

export const loading_spinner =
    <img src={spinner} alt="Loading Spinner" id="loading_spinner"/>;

export const map_state_to_signin_button_props = (state) => {
    let className;
    let content;

    let is_authenticating = state.auth.front_end.is_authenticating;
    let has_authenticated = state.auth.front_end.has_authenticated;
    let is_logging_out = state.auth.front_end.is_logging_out;

    className = '';
    content = 'Sign In';

    if (is_authenticating){
        className = 'disabled';
        content = <span>Logging In {loading_spinner}</span>;
    } else if (has_authenticated){
        className = '';
        content = <span>Sign Out <Glyphicon glyph="log-out" /></span>;
    } else if (is_logging_out){
        className = 'disabled';
        content = <span>Logging Out {loading_spinner}</span>;
    } else {
        className = '';
        content = <span>Sign In <Glyphicon glyph="log-in" /></span>;
    }

    return({className: className, content: content});
};

export const map_dispatch_to_signin_button_props = (dispatch) => ({
    on_click: () => {dispatch(login_button_clicked())}
});

const SignInButton = connect(
    map_state_to_signin_button_props, map_dispatch_to_signin_button_props)(
    SignInButtonTemplate
);

export default SignInButton;
