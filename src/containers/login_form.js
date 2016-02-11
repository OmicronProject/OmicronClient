/**
 * Created by Michal on 2016-02-11.
 */
import React from 'react';
import {UserNameBox, PasswordBox} from '../components/login_form';
import {connect} from 'react-redux';

const LOGIN_CHANGED = 'LOGIN_CHANGED';

const LoginForm = (
    on_username_change, on_password_change,
    uname_value, password_value
) => {
    console.log("uname change " + on_username_change);
    console.log("password change " + on_password_change);
    console.log('uname value ' + uname_value);
    console.log('password value ' + password_value);
    return(
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
        </form>
        username = {uname_value}
        password = {password_value}
    </div>
)};

const mapLoginStateToProps = (state) => (
    {
        uname_value: state.user.username,
        password_value: state.user.password
    }
);


const mapLoginDispatchToProps = (dispatch) => (
    {
        on_username_change: (event) => {
            dispatch({type: "USERNAME_CHANGED", username: event.target.value})
        },
        on_password_change: (event) => {
            dispatch({type: "PASSWORD_CHANGED", password: event.target.value})
        }
    }
);

const LoginBox = connect(mapLoginStateToProps, mapLoginDispatchToProps)
    (LoginForm);

// Reducers

let username_change_reducer = (state, action) => {
    if (action.type === "USERNAME_CHANGED") {
        let new_state = Object.assign({}, state);

        new_state.user.username = action.username;

        return(new_state);
    }
};

let password_change_reducer = (state, action) => {
    if (action.type === "PASSWORD_CHANGED") {
        let new_state = Object.assign({}, state);

        new_state.user.password = action.password;

        return(new_state);
    }
};

export default LoginBox;
export {username_change_reducer, password_change_reducer};