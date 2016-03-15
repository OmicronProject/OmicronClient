/**
 * Created by Michal on 2016-03-15.
 */
'use strict';

import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import store, { initial_state } from '../../store';
import {Glyphicon} from 'react-bootstrap';
import {Provider} from 'react-redux';

import {SignInButtonTemplate} from '../user_control_button';
import {login_button_clicked} from '../user_control_button';
import {map_state_to_signin_button_props} from '../user_control_button';
import {loading_spinner} from '../user_control_button';
import {map_dispatch_to_signin_button_props} from '../user_control_button';
import SignInButton from '../user_control_button';

import login_user from '../../auth/login';
import logout_user from '../../auth/logout';

describe("SignInButtonTemplate", () => {
    let on_click;
    let className;
    let content;

    beforeEach(() => {
        on_click = () => {};
        className = 'Test Button';
        content = 'Log In';
    });

    it("Should render into the DOM", () => {
        expect(SignInButtonTemplate(on_click, className, content)).toExist()
    });
});

describe("login_button_clicked", () => {
    let state;
    let dispatch;

    let dispatched_actions;

    beforeEach(() => {
        dispatched_actions = [];
        dispatch = (action) => {
            dispatched_actions.push(action)
        };
        state = Object.assign({}, initial_state);
    });

    it("should return a thunk", () => {
        expect(login_button_clicked()).toBeA("function");
    });

    describe("login_button_clicked thunk", () => {
        let thunk;
        let logger_spy;

        beforeEach(() => {
            thunk = login_button_clicked(state);
            logger_spy = expect.spyOn(console, 'log');
        });

        it('Should log if the button is clicked while authenticating', ()=>{
            state.auth.front_end.is_authenticating = true;

            thunk(dispatch);
            expect(dispatched_actions).toEqual([]);
            expect(logger_spy).toHaveBeenCalled();
        });

        it('Should log if the button is clicked while sign_out', () => {
            state.auth.front_end.is_logging_out = true;

            thunk(dispatch);
            expect(dispatched_actions).toEqual([]);
            expect(logger_spy).toHaveBeenCalled();
        });

        it('Should dispatch the login action when appropriate', () => {
            state.auth.front_end.has_authenticated = false;
            state.auth.front_end.is_authenticating = false;

            thunk(dispatch);
            expect(dispatched_actions).toEqual([login_user()]);
        });

        it('Should dispatch the logout action when appropriate', () => {
            state.auth.front_end.has_authenticated = true;
            state.auth.front_end.is_logging_out = false;

            thunk(dispatch);
            expect(dispatched_actions).toEqual([logout_user()]);
        });
    })
});

describe("map_state_to_signin_button_props", () => {
    let state;

    beforeEach(() => {
        state = Object.assign({}, store.getState());
    });

    it('Should be disabled, and show a loading spinner', () => {
        state.auth.front_end.is_authenticating = true;
        expect(map_state_to_signin_button_props(state)).toEqual({
            className: 'disabled',
            content: "Logging In " + loading_spinner
        });
    });

    it('Should offer a Logout button if user is logged in', () => {
        state.auth.front_end.is_authenticating = false;
        state.auth.front_end.has_authenticated = true;

        expect(map_state_to_signin_button_props(state)).toEqual({
            className: '',
            content: 'Sign Out ' + <Glyphicon glyph="log-out"/>
        });
    });

    it('Should disable the button if logout', () => {
        state.auth.front_end.is_authenticating = false;
        state.auth.front_end.has_authenticated = false;
        state.auth.front_end.is_logging_out = true;

        expect(map_state_to_signin_button_props(state)).toEqual({
            className: 'disabled',
            content: 'Logging Out ' + loading_spinner
        });
    });

    it('Should offer a sign in button', () => {
        state.auth.front_end.is_authenticating = false;
        state.auth.front_end.has_authenticated = false;
        state.auth.front_end.is_logging_out = false;
        state.auth.front_end.has_logged_out = true;

        expect(map_state_to_signin_button_props(state)).toEqual({
            className: '',
            content: 'Sign In ' + <Glyphicon glyph="log-in"/>
        });
    });

    it('Should be a sign in button on initial state load', () => {
        expect(map_state_to_signin_button_props(state)).toEqual({
            className: '',
            content: 'Sign In ' + <Glyphicon glyph="log-in"/>
        });
    });
});

describe("map_dispatch_to_signin_button_props", () => {
    let dispatch;
    let dispatched_actions;

    beforeEach(() => {
        dispatch = (action) => {dispatched_actions.push(action)};
    });

    it('Should dispatch appropriately', () => {
        expect(map_dispatch_to_signin_button_props(dispatch).on_click).toBeA(
            "function"
        )
    })
});

describe("SignInButton", () => {
    it("Should render into the DOM", () => {
        let button = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
                <SignInButton />
            </Provider>
        );
        expect(button).toExist();
    })
});