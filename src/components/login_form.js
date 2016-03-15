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

import '../../static/css/components/login_form.css';
import spinner from '../../static/img/hourglass.svg';

export const UsernameBoxTemplate = ({value, on_change}) => (
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
