/**
 * Created by Michal on 2016-02-22.
 */
import expect from 'expect'
import {LOGIN_STARTED, login_started, login_started_reducer} from '../actions';
import {LOGIN_SUCCESS, login_success, login_success_reducer} from '../actions';
import {LOGIN_FAILURE, login_failure, login_failure_reducer} from '../actions';

/**
 * Contains unit tests for the LOGIN_STARTED action creator and reducer
 *
 * @test {LOGIN_STARTED}
 */
describe("LOGIN_STARTED", () => {

    /**
     * Tests the auth started action creator
     * @test {login_started}
     */
    describe("login_started", () => {
        let username;
        let password;

        beforeEach(() => {
            username = 'username';
            password = 'password';
        });

        it("Should accept a username and password into the action creator", () => {
            let action = login_started(username, password);
            expect(action.type).toEqual(LOGIN_STARTED);
            expect(action.username).toEqual(username);
            expect(action.password).toEqual(password);
        });
    });

    /**
     * Tests the reducer for the LOGIN_STARTED action
     *
     * @test {login_started_reducer}
     */
    describe("login_started_reducer", () => {
        let username;
        let password;
        let action;

        let state;

        beforeEach(() => {
            username = 'username';
            password = 'password';
            action = login_started(username, password);

            state = {
                authenticator: {
                    username: undefined,
                    password: undefined,
                    is_authenticating: false,
                    authentication_failed: false,
                    error_message: undefined
                }
            }
        });

        it('Should return the old state if the action is of the wrong type', () => {
            let bad_action = {type: "not the correct action"};

            expect(login_started_reducer(state, bad_action)).toEqual(state);
        });

        it("Should create a new state when the correct action is passed in", () => {
            let new_state = {
                authenticator: {
                    username: username,
                    password: password,
                    is_authenticating: true,
                    authentication_failed: false,
                    error_message: undefined
                }
            };

            expect(login_started_reducer(state, action)).toEqual(new_state);
        })
    });
});

describe("LOGIN_SUCCESS", () => {
    let token;
    let expiration_date;
    let username;
    let password;

    beforeEach(() => {
        expiration_date = new Date();
        expiration_date.setMinutes(expiration_date.getMinutes() + 30);

        token = "56185e6b-5a48-4829-9447-9099a508549c";

        username = 'username';
        password = 'password';
    });

    describe("login_success", () => {
        it("should create the correct action", () => {
            let action = login_success(token, expiration_date);

            expect(action.type).toEqual(LOGIN_SUCCESS);
        })
    });

    describe("login_success_reducer", () => {
        let action;
        let state;

        beforeEach(() => {
            action = login_success(token, expiration_date);
            state = {
                authenticator: {
                    username: undefined,
                    password: undefined,
                    is_authenticating: false,
                    authentication_failed: false,
                    error_message: undefined
                },
                omicron_api: {
                    headers: {
                        "Authorization": undefined,
                        "content-type": "application/json"
                    },
                    url: 'http://localhost:5000'
                },
                user: {
                    username: username,
                    password: password,
                    auth_status: 'not_authenticated',
                    token_expiry_date: expiration_date
                }
            }
        });

        it("should return the old state if the wrong action is provided", () => {
            let new_action = {type: "invalid_action"};
            expect(login_success_reducer(state, new_action)).toEqual(state);
        });

        it("should change the state given the correct action", () => {
            let new_state = {
                authenticator:
                {
                    username: undefined,
                    password: undefined,
                    is_authenticating: false,
                    authentication_failed: false
                },
                user: {
                    username: username,
                    password: undefined,
                    auth_status: "authenticated",
                    token_expiry_date: expiration_date
                },
                omicron_api: {
                    headers: {
                        Authorization: "Basic " + btoa(token),
                        "content-type": "application/json"
                    },
                    url: "http://localhost:5000"
                }
            };

            expect(login_success_reducer(state, action)).toEqual(new_state);
        })
    })
});

describe("LOGIN_FAILURE", () => {
    let message;

    beforeEach(() => {
        message = "They've got a message for the action man.";
    });

    describe("login_failure action creator", () => {
        it("should create the correct action", () => {
            let action = login_failure(message);
            expect(action.type).toEqual(LOGIN_FAILURE);
            expect(action.message).toEqual(message);
        })
    });

    describe("login_failure reducer", () => {
        let state;
        let action;
        beforeEach(() => {
            state = {
                authenticator: {
                    is_authenticating: true,
                    error_message: undefined,
                    authentication_failed: false
                },
                user: {
                    auth_status: "authenticating"
                }
            };

            action = login_failure(message);
        });

        it("Should return the old state if wrong action", () => {
            let bad_action = {type: "INVALID_ACTION"};
            expect(login_failure_reducer(state, bad_action)).toEqual(state);
        });

        it("Should alter the state if correct action", () => {
            let new_state = {
                authenticator: {
                    is_authenticating: false,
                    error_message: message,
                    authentication_failed: true
                },
                user: {
                    auth_status: "authentication_failed"
                }
            };

            expect(login_failure_reducer(state, action)).toEqual(new_state);
        })
    })
});
