/**
 * Created by Michal on 2016-03-14.
 */
'use strict';
import React from 'react';
import expect from 'expect';

import {LOGOUT_STARTED, logout_started, logout_started_reducer} from '../logout';
import {SEND_LOGOUT_REQUEST, send_logout_request} from '../logout';
import {send_logout_request_reducer} from '../logout';


import {FINISH_LOGOUT, finish_logout, finish_logout_reducer} from '../logout';


describe(LOGOUT_STARTED, () => {
    describe('action creator', () => {
        it('Should create the action', () => {
            expect(logout_started()).toEqual({type: LOGOUT_STARTED});
        });
    });

    describe('reducer', () => {
        let state;

        beforeEach(() => {
            state = {
                auth: {
                    front_end: {
                        is_logging_out: false,
                        has_logged_out: true
                    }
                }
            };
        });

        it("Should execute its reducing side-effect", () => {
            logout_started_reducer(state);
            expect(state.auth.front_end).toEqual(
                {is_logging_out: true, has_logged_out: false}
            )
        });
    });
});

describe(SEND_LOGOUT_REQUEST, () => {
    describe("action creator", () => {
        it("Should create the action", () => {
            expect(send_logout_request()).toEqual(
                {type: SEND_LOGOUT_REQUEST}
            )
        })
    });

    describe("reducer", () => {
        let state;
        beforeEach(() => {
            state = {auth: {back_end: {is_logging_out: false}}}
        });

        it("should reduce", () => {
            send_logout_request_reducer(state);
            expect(state.auth.back_end.is_logging_out).toEqual(
                true
            )
        })
    })
});

describe(FINISH_LOGOUT, () => {
    describe("action creator", () => {
        it("Should create the action", () => {
            expect(finish_logout()).toEqual({type: FINISH_LOGOUT});
        })
    });

    describe("reducer", () => {
        let state;
        let username;
        let password;
        let error_message;

        beforeEach(() => {
            username = 'SterlingArcher';
            password = "duchess";
            error_message = 'I told you! The pen cap falls off for no reason!';
            state = {
                auth: {
                    back_end: {
                        error_message: undefined,
                        username: username,
                        password: password,
                        is_authenticating: true,
                        has_authenticated: true,
                        is_logging_out: true,
                        has_logged_out: true
                    }
                }
            }
        });

        it("Should make the appropriate changes to the state", () => {
            finish_logout_reducer(state);
            expect(state.auth.front_end).toEqual({
                username: username,
                password: undefined,
                is_authenticating: false,
                has_authenticated: false,
                error_message: undefined,
                is_logging_out: false,
                has_logged_out: true
            })
        });

        it("Should handle the error appropriately", () => {
            state.auth.back_end.error_message = error_message;
            finish_logout_reducer(state);
            expect(state.auth.front_end).toEqual({
                username: username,
                password: undefined,
                is_authenticating: false,
                has_authenticated: false,
                error_message: error_message,
                is_logging_out: false,
                has_logged_out: false
            })
        })
    })
});