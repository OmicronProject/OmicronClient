/**
 * Created by Michal on 2016-03-14.
 */
'use strict';
import React from 'react';
import expect from 'expect';

import {LOGOUT_STARTED, logout_started, logout_started_reducer} from '../logout';
import {SEND_LOGOUT_REQUEST, send_logout_request} from '../logout';
import {send_logout_request_reducer} from '../logout';

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