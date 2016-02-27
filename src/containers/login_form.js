/**
 * Created by Michal on 2016-02-11.
 * Contains a container for a form allowing a user to log in to the site
 */
'use strict';
import React, { PropTypes } from 'react';
import {UserNameBox, PasswordBox} from '../components/login_form';
import {SignInButton, SignUpButton} from '../components/login_form';
import {SignInSpinner, LogoutButton} from '../components/login_form';
import {connect} from 'react-redux';
import clone from '../object_cloning';
import Header from './header';
import reducer from '../reducer';
import {auth_started, auth_success, auth_failure} from '../auth/actions';
import axios from 'axios';
import sign_in_spinner from '../../static/img/spinner.gif';
import store from '../store';

/**
 *
 * Builds the Login Form component
 *
 * @param {function} on_username_change The callback to execute when the
 *  value of the username field changes
 * @param {function} on_password_change The callback to execute when the value
 *  of the password field changes
 * @param {str} uname_value The current value of the username. This value is
 *  displayed in the Username box on the form.
 * @param {str} password_value The password with which the user wishes to
 *  authenticate. This value is needed in order for the Password box to
 *  calculate how many masked characters need to be rendered. The user's
 *  password is cleared at the start of authentication. Clearing and
 *  maintaining the password is not the responsibility of this component.
 * @param {function} on_submit The function to be executed when the user
 *  clicks the submit button.
 * @param {str} authed_username: After authentication, this is the username
 *  after the user has authenticated
 * @param {str} auth_status: The current state of the authenticator. At the
 *  moment, this is used for debugging purposes.
 * @param {bool} is_spinner_visible: If true, A spinner will be shown to the
 *  user, indicating that authentication is in progress
 * @returns {XML} The template for the login form
 * @constructor
 */
export const LoginForm = (
    {on_username_change, on_password_change,
    uname_value, password_value, on_submit, authed_username, auth_status,
    is_spinner_visible
    }
) => {
    return(
    <div className="container-fluid" id="login_page">
        <Header />
        <div className="container">
            <form>
                <div id="loginForm" className="loginForm">
                    <UserNameBox
                        change_callback={on_username_change}
                        value={uname_value}
                    />
                    <PasswordBox
                        change_callback={on_password_change}
                        value={password_value}
                    />
                </div>
                <SignInButton is_active={true}
                              content="Sign In"
                              onClick={on_submit}/>
                <SignUpButton is_active={true}/>
                <LogoutButton />
                <SignInSpinner is_active={is_spinner_visible}
                    source={sign_in_spinner}
                />
            </form>
        </div>
        <div className="row">
            <div className="col-md-8">
                <h3>Authentication</h3>
            </div>
            <div className="col-md-8">
                Hello: {authed_username}
            </div>
            <div className="col-md-8">
                auth_status: {auth_status}
            </div>
        </div>
    </div>
)};

LoginForm.propTypes = {
    on_username_change: PropTypes.func.isRequired,
    on_password_change: PropTypes.func.isRequired,
    on_submit: PropTypes.func.isRequired
};

/**
 * Maps the application state to the required props in the LoginForm component.
 * This is called automatically by redux after the reducers have run.
 *
 * @param {Object} state The current state of the application, stored in the
 *  Redux store
 * @returns {
 *  {uname_value: *, password_value: *,
 *  authed_username: *,
 *  auth_status: (string|string), is_spinner_visible: boolean}
 *  } An object containing the required properties extracted from the
 *  application state.
 */
export const mapLoginStateToProps = (state) => {
    let authed_username = undefined;
    if (state.user.auth_status === 'authenticated') {
        authed_username = state.user.username;
    }
    return ({
        uname_value: state.user.username,
        password_value: state.user.password,
        authed_username: authed_username,
        auth_status: state.user.auth_status,
        is_spinner_visible: state.authenticator.is_authenticating
    })
};


export const mapLoginDispatchToProps = (dispatch) => (
    {
        on_username_change: (event) => {
            dispatch({type: "USERNAME_CHANGED", username: event.target.value})
        },
        on_password_change: (event) => {
            dispatch({type: "PASSWORD_CHANGED", password: event.target.value})
        },
        on_submit: (event) => {
            dispatch(authenticate_user())
        }
    }
);

const LoginBox = connect(mapLoginStateToProps, mapLoginDispatchToProps)
    (LoginForm);

// Reducers

export function username_change_reducer(state, action){
    if (action.type === "USERNAME_CHANGED") {
        let new_state = clone(state);

        new_state.user.username = action.username;

        return(new_state);
    } else {
        return(state);
    }
}

export function password_change_reducer(state, action){
    if (action.type === "PASSWORD_CHANGED") {
        let new_state = clone(state);
        new_state.user.password = action.password;

        return(new_state);
    } else {
        return(state);
    }
}

export function submit_reducer(state, action){
    if (action.type === "USER_AUTHENTICATION_SUBMIT"){
        let new_state = clone(state);
        new_state.user.auth_status = "authenticating";
        

        return(new_state);
    } else {
        return(state);
    }
}

export default LoginBox;
reducer.register(username_change_reducer);
reducer.register(password_change_reducer);
reducer.register(submit_reducer);

/**
 * Dispatch a thunk to authenticate the user given a username and password
 *
 * @returns {function} A callback taking in the action dispatcher as a
 *  callback. This callback is evaluated by ReduxThunkMiddleware
 *  asynchronously.
 */
export function authenticate_user() {
    return function (dispatch) {
        let state = store.getState();

        let username = state.user.username;
        let password = state.user.password;

        dispatch(auth_started(username, password));

        let auth_header = {
            "Authorization": "Basic " + btoa(username + ":" + password)
        };

        let request = axios({
            url: state.omicron_api.url + '/api/v1/token',
            headers: Object.assign(auth_header, state.omicron_api.headers),
            method: "POST"
        });

        request.then((response) => {dispatch(
            auth_success(response.data.token, response.data.expiration_date)
        )}).catch((error) => {dispatch(auth_failure(error.message))})
    }
}

