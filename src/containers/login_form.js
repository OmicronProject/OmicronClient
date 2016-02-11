/**
 * Created by Michal on 2016-02-11.
 */
import React, { PropTypes } from 'react';
import {UserNameBox, PasswordBox} from '../components/login_form';
import {connect} from 'react-redux';
import clone from '../object_cloning';

const LOGIN_CHANGED = 'LOGIN_CHANGED';

const LoginForm = (
    {on_username_change, on_password_change,
    uname_value, password_value}
) => {
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
        username = {uname_value} <br/>
        password = {password_value}
    </div>
)};

LoginForm.propTypes = {
    on_username_change: PropTypes.func.isRequired,
    on_password_change: PropTypes.func.isRequired
};

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

export default LoginBox;
export {username_change_reducer, password_change_reducer};