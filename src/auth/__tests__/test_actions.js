/**
 * Created by Michal on 2016-02-22.
 * Contains unit tests for the authenticator
 */
import expect from 'expect';
import {START_LOGIN, start_login, start_login_reducer} from '../actions';
import {REQUEST_TOKEN, request_token, request_token_reducer} from '../actions';
import {RECEIVE_TOKEN, receive_token, receive_token_reducer} from '../actions';

describe(START_LOGIN, () => {
    describe("action_creator", () => {
        it("should return the correct action", () => {
            expect(start_login()).toEqual({type: START_LOGIN});
        });
    });

    describe("reducer", () => {
        let state;
        beforeEach(() => {
            state = {
                auth: {
                    front_end: {
                        is_authenticating: false,
                        has_authenticated: true
                    }
                }
            }
        });

        it("Should flip the two variables in the state", () => {
            start_login_reducer(state);
            expect(state.auth.front_end.is_authenticating).toEqual(true);
            expect(state.auth.front_end.has_authenticated).toEqual(false);
        })
    });
});

describe(REQUEST_TOKEN, () => {
    let username;
    let password;

    beforeEach(() => {
        username = "user";
        password = "password";
    });

    describe("action creator", () => {

        it("should create a basic auth header", () => {
            expect(request_token(username, password)).toEqual(
                {
                    type: REQUEST_TOKEN,
                    username: username,
                    password: password,
                    auth_header: "Basic " + btoa(username + ":" + password)
                }
            )
        })
    });

    describe("reducer", () => {
        let state;
        let action;

        beforeEach(() => {
            state = {
                auth: {
                    back_end: {
                        username: undefined,
                        password: undefined,
                        is_authenticating: false
                    }
                },
                omicron_api: {
                    headers: {}
                }
            };

            action = request_token(username, password)
        });

        it("Should set the appropriate variables", () => {
            request_token_reducer(state, action);
            expect(state.auth.back_end).toEqual(
                {
                    username: username,
                    password: password,
                    is_authenticating: true
                }
            );
            expect(state.omicron_api.headers).toEqual({
                "Authorization": action.auth_header
            });
        });
    })
});

describe(RECEIVE_TOKEN, () => {
    let token;
    let expiry_date;

    beforeEach(() => {
        token = "8cfd50e6-e4ae-11e5-9b7f-0ac61c3535b4";
        expiry_date = Date.now();
    });

    describe("action creator", () => {
        it("should accept a token and expiration date", () => {
            expect(receive_token(token, expiry_date)).toEqual(
                {
                    type: RECEIVE_TOKEN,
                    token: token,
                    expiry_date: expiry_date
                }
            )
        });
    });

    describe("reducer", () => {
        let state;
        let action;
        beforeEach(() => {
            state = {
                auth: {
                    back_end: {
                        auth_token: undefined,
                        password: "I logged in with this password",
                        token_expiry_date: undefined,
                        is_authenticating: true
                    }
                }
            };

            action = receive_token(token, expiry_date);
        });

        it("should reduce", () => {
            receive_token_reducer(state, action);
            expect(state.auth.back_end).toEqual({
                auth_token: action.token,
                password: undefined,
                token_expiry_date: expiry_date,
                is_authenticating: false
            })
        })
    })
});