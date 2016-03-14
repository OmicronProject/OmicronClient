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
import HeaderBar from './header';
import reducer from '../reducer';
import {login_user} from '../auth/login';
import axios from 'axios';
import sign_in_spinner from '../../static/img/hourglass.svg';
import store from '../store';
import Footer from '../components/footer';

/**
 *
 * Builds the Login Form component
 *
 * @param {function} on_username_change The callback to execute when the
 *  value of the username field changes
 * @param {function} on_password_change The callback to execute when the value
 *  of the password field changes
 * @param {string} uname_value The current value of the username. This value is
 *  displayed in the Username box on the form.
 * @param {string} password_value The password with which the user wishes to
 *  authenticate. This value is needed in order for the Password box to
 *  calculate how many masked characters need to be rendered. The user's
 *  password is cleared at the start of authentication. Clearing and
 *  maintaining the password is not the responsibility of this component.
 * @param {function} on_submit The function to be executed when the user
 *  clicks the submit button.
 * @param {bool} is_spinner_visible: If true, A spinner will be shown to the
 *  user, indicating that authentication is in progress
 * @returns {XML} The template for the login form
 * @constructor
 */
export const LoginForm = (
    {on_username_change, on_password_change,
    uname_value, password_value, on_submit,
    is_spinner_visible
    }
) => {
    return(
    <div>
        <HeaderBar />
        <div className="container-fluid" id="login_page">
            <div className="row">
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
        </div>
        <Footer />
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
 * @returns {Object} An object containing the required properties extracted
 *  from the application state.
 */
export const mapLoginStateToProps = (state) => {
    return ({
        uname_value: state.auth.front_end.username,
        password_value: state.auth.front_end.password,
        is_spinner_visible: state.auth.front_end.is_authenticating
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
            dispatch(login_user())
        }
    }
);

const LoginBox = connect(mapLoginStateToProps, mapLoginDispatchToProps)
    (LoginForm);

// Reducers

export function username_change_reducer(state, action){
    if (action.type === "USERNAME_CHANGED") {
        let new_state = Object.assign(state);

        new_state.auth.front_end.username = action.username;

        return(new_state);
    } else {
        return(state);
    }
}

export function password_change_reducer(state, action){
    if (action.type === "PASSWORD_CHANGED") {
        let new_state = Object.assign(state);
        new_state.auth.front_end.password = action.password;

        return(new_state);
    } else {
        return(state);
    }
}

export function submit_reducer(state, action){
    if (action.type === "USER_AUTHENTICATION_SUBMIT"){
        let new_state = Object.assign(state);
        new_state.auth.front_end.is_authenticating = true;
        return(new_state);
    } else {
        return(state);
    }
}

export default LoginBox;
reducer.register(username_change_reducer);
reducer.register(password_change_reducer);
reducer.register(submit_reducer);
