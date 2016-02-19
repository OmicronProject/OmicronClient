/**
 * Created by Michal on 2016-02-11.
 * Contains a container for a form allowing a user to log in to the site
 */
import React, { PropTypes } from 'react';
import {UserNameBox, PasswordBox} from '../components/login_form';
import {SignInButton, SignUpButton} from '../components/login_form';
import {SignInSpinner} from '../components/login_form';
import {connect} from 'react-redux';
import clone from '../object_cloning';
import Header from './header';
import reducer from '../reducer';
import {auth_started, auth_success, auth_failure} from '../auth/actions';
import axios from 'axios';
import image_source from '../../static/img/spinner.gif';

/**
 *
 * Builds a login form
 *
 * @param {function} on_username_change The callback to execute when the
 *  value of the username field changes
 * @param {function} on_password_change The callback to execute when the value
 *  of the password field changes
 * @param {str} uname_value The value of the
 * @param password_value
 * @param on_submit
 * @returns {XML}
 * @constructor
 */
const LoginForm = (
    {on_username_change, on_password_change,
    uname_value, password_value, on_submit}
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
            </form>
            username = {uname_value} <br/>
            password = {password_value}
        </div>
    </div>
)};

LoginForm.propTypes = {
    on_username_change: PropTypes.func.isRequired,
    on_password_change: PropTypes.func.isRequired,
    on_submit: PropTypes.func.isRequired
};

const mapLoginStateToProps = (state) => {
    return ({
        uname_value: state.user.username,
        password_value: state.user.password
    })
};


const mapLoginDispatchToProps = (dispatch) => (
    {
        on_username_change: (event) => {
            dispatch({type: "USERNAME_CHANGED", username: event.target.value})
        },
        on_password_change: (event) => {
            dispatch({type: "PASSWORD_CHANGED", password: event.target.value})
        },
        on_submit: (event) => {
            dispatch({type: "USER_AUTHENTICATION_SUBMIT"})
        }
    }
);

const LoginBox = connect(mapLoginStateToProps, mapLoginDispatchToProps)
    (LoginForm);

// Reducers

function username_change_reducer(state, action){
    if (action.type === "USERNAME_CHANGED") {
        let new_state = clone(state);

        new_state.user.username = action.username;

        return(new_state);
    } else {
        return(state);
    }
}

function password_change_reducer(state, action){
    if (action.type === "PASSWORD_CHANGED") {
        let new_state = clone(state);
        new_state.user.password = action.password;

        return(new_state);
    } else {
        return(state);
    }
}

function submit_reducer(state, action){
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
 * @param {str} username The username of the user to authenticated
 * @param {str} password The password to authenticate
 */
function authenticate_user(username, password) {
    return function (dispatch) {
        dispatch(auth_started(username, password));
        let state = store.getState();

        let auth_header = {
            "Authorization": "Basic " + btoa(username + ":" + password)
        };

        let request = axios({
            url: state.omicron_api.url,
            headers: auth_header + state.omicron_api.headers,
            method: "POST"
        });

        request.then((response) => {dispatch(
            auth_success(response.data.token, response.data.expiration_date)
        )}).catch((error) => {dispatch(auth_failure(error.message))})
    }
}

