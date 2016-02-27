/**
 * Created by Michal on 2016-02-26.
 *
 * Contains unit tests for the login form container
 */
'use strict';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {LoginForm, mapLoginStateToProps} from '../login_form';
import {mapLoginDispatchToProps} from '../login_form';
import {username_change_reducer, password_change_reducer} from '../login_form';
import {submit_reducer, authenticate_user} from '../login_form';
import {Provider} from 'react-redux';
import store from '../../store';

describe('login_form', () => {
    let on_username_change;
    let on_password_change;
    let uname_value;
    let password_value;
    let on_submit;
    let authed_username;
    let auth_status;
    let is_spinner_visible;

    beforeEach(() => {
        on_username_change = (x) => (x);
        on_password_change = (x) => (x);
        uname_value = 'username';
        password_value = 'password';
        on_submit = (x) => (x);
        authed_username = 'authenticated_username';
        auth_status = 'not_authenticated';
        is_spinner_visible = true;

    });

    describe('LoginForm', () => {

        it('Should render successfully into a virtual DOM', () => {
            let template = ReactTestUtils.renderIntoDocument(
                <Provider store={store}>
                <LoginForm on_username_change={on_username_change}
                           on_password_change={on_password_change}
                           uname_value={uname_value}
                           on_submit={on_submit}
                           authed_username={authed_username}
                           auth_status={auth_status}
                           is_spinner_visible={is_spinner_visible}
                />
                </Provider>
            );

            expect(template).toExist();
        });
    });

    describe("mapLoginStateToProps", () => {
        let state;
        beforeEach(() => {
            state = {
                user: {
                    username: uname_value,
                    password: password_value,
                    auth_status: auth_status
                },
                authenticator: {
                    is_authenticating: is_spinner_visible
                }
            }
        });

        it("Should map the state to the required properties", () => {
            auth_status = 'authenticated';
            state.user.auth_status = 'authenticated';

            expect(mapLoginStateToProps(state)).toEqual(
                {
                    uname_value: uname_value,
                    password_value: password_value,
                    authed_username: uname_value,
                    auth_status: auth_status,
                    is_spinner_visible: is_spinner_visible
                }
            );
        });
        it("Should set the authed_username to undefined if user is" +
            "not authenticated", () => {
            auth_status = 'not_authenticated';
            let mapped_props = mapLoginStateToProps(state);

            expect(mapped_props.authed_username).toEqual(undefined);
        });
    });

    describe("mapLoginDispatchToProps", () => {
        let dispatch_method;
        let dispatch_method_callbacks;

        beforeEach(() => {
            dispatch_method_callbacks = [];

            dispatch_method = (callback) => {
                dispatch_method_callbacks.push(callback);
            };
        });

        it("should take in a dispatch method and return three callbacks",
            () => {
                let callbacks = mapLoginDispatchToProps(dispatch_method);

                expect(callbacks.on_username_change).toBeA("function");
                expect(callbacks.on_password_change).toBeA("function");
                expect(callbacks.on_submit).toBeA("function");
            })
    })
});

describe("username_change_reducer", () => {
    let state;
    let username;

    beforeEach(() => {
        state = {user: {username: "old_username"}};
        username = "new_username";
    });

    it("should return the old state if the action is of the wrong type",
        () => {
            let action = {type: "INVALID_ACTION_TYPE"};
            expect(username_change_reducer(state, action)).toBe(state);
    });

    it("should return a changed state if the action is correct", () => {
        let action = {type: "USERNAME_CHANGED", username: username};

        let new_state = username_change_reducer(state, action);

        expect(new_state.user.username).toEqual(username);
    });
});

describe("password_change_reducer", () => {
    let state;
    let password;

    beforeEach(() => {
        state = {user: {password: "old_password"}};
        password = "new_password";
    });

    it("Should return the old state if an incorrect action is provided",
        () => {
            let action = {type: "INVALID_ACTION_TYPE"};
            expect(password_change_reducer(state,action)).toBe(state);
    });

    it("Should change the password if the correct action is provided", () => {
        let action = {type: "PASSWORD_CHANGED", password: password};

        expect(
            password_change_reducer(state, action).user.password
        ).toEqual(password);
    })
});

describe("submit_reducer", () => {
    let state;

    beforeEach(() => {
        state = {user: {auth_status: "not_authenticated"}};
    });

    it("Should return the old state if wrong action", () => {
        let action = {type: "INVALID"};
        expect(submit_reducer(state, action)).toEqual(state);
    });

    it("Should appropriately change the state if correct action", () => {
        let action = {type: "USER_AUTHENTICATION_SUBMIT"};
        expect(
            submit_reducer(state, action).user.auth_status
        ).toEqual("authenticating");
    });
});

describe("authenticate_user", () => {
    it("Should return a function", () => {
        expect(authenticate_user()).toBeA("function");
    });
});
