/**
 * Created by Michal on 2016-02-22.
 * Contains unit tests for the authenticator
 */
import expect from 'expect';
import {START_LOGIN, start_login, start_login_reducer} from '../login';
import {REQUEST_TOKEN, request_token, request_token_reducer} from '../login';
import {RECEIVE_TOKEN, receive_token, receive_token_reducer} from '../login';
import {FINISH_AUTH, finish_auth, finish_auth_reducer} from '../login';
import {RECEIVE_TOKEN_ERROR, receive_token_error} from '../login';
import {receive_token_error_reducer} from '../login';
import {CLEANUP_AUTH, cleanup_auth, cleanup_auth_reducer} from '../login';
import login_user from '../login';

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

        it("should create a basic login header", () => {
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

describe(FINISH_AUTH, () => {
    let username;
    let token;

    beforeEach(() => {
        username = "username";
        token = "8cfd50e6-e4ae-11e5-9b7f-0ac61c3535b4";
    });

    describe("action_creator", () => {
        it("should create the action", () => {
            expect(finish_auth(username, token)).toEqual(
                {
                    type: FINISH_AUTH,
                    username: username,
                    token: token,
                    auth_header: "Basic " + btoa(token + ":"),
                    project_button: undefined
                }
            )
        })
    });

    describe("finish_auth_reducer", () => {
        let state;
        let action;

        beforeEach(() => {
            action = finish_auth(username, token);
            state = {
                auth: {
                    front_end: {
                        username: undefined,
                        password: 'a password',
                        is_authenticating: true,
                        has_authenticated: false,
                        error_message: "I've loved all I needed to love."
                    }
                },
                omicron_api: {
                    headers: {
                        "Authorization": "Sordid details following"
                    }
                },
                main_menu: {
                    buttons: []
                }
            }
        });

        it("should reduce", () => {
            finish_auth_reducer(state, action);
            expect(state.auth.front_end).toEqual({
                username: action.username,
                password: undefined,
                is_authenticating: false,
                has_authenticated: true,
                error_message: undefined
            });

            expect(state.omicron_api.headers["Authorization"]).toEqual(
                action.auth_header
            );
        });
    });
});

describe(RECEIVE_TOKEN_ERROR, () => {
    let error_message;

    beforeEach(() => {
        error_message = "I'll send an SOS to the world.";
    });

    describe("action creator", () => {
        it("Should create an action", () => {
            expect(receive_token_error(error_message)).toEqual({
                type: RECEIVE_TOKEN_ERROR,
                message: error_message
            })
        });
    });

    describe("reducer", () => {
        let state;
        let action;

        beforeEach(() => {
            state = {auth: {back_end: {
                username: "username",
                password: "password",
                is_authenticating: true,
                error_message: undefined,
                auth_token: "token",
                token_expiry_date: "This is an expiry date"
            }}};

            action = receive_token_error(error_message);
        });

        it("Should reduce", () => {
            receive_token_error_reducer(state, action);

            expect(state).toEqual({auth: {back_end: {
                username: undefined,
                password: undefined,
                is_authenticating: false,
                error_message: error_message,
                auth_token: undefined,
                token_expiry_date: undefined
            }}});
        });
    });
});

describe(CLEANUP_AUTH, () => {
    let error_message;

    beforeEach(() => {
        error_message = "They got a message for the action man";
    });

    describe("action creator", () => {
        it("Should create an action", () => {
            expect(cleanup_auth(error_message)).toEqual(
                {type: CLEANUP_AUTH, message: error_message}
            );
        });
    });

    describe("reducer", () => {
        let state;
        let action;

        beforeEach(() => {
            state = { auth: { front_end: {
                username: "username",
                password: "password",
                is_authenticating: true,
                has_authenticated: true,
                error_message: undefined
            }}};

            action = cleanup_auth(error_message);
        });

        it("Should reduce", () => {
            cleanup_auth_reducer(state, action);

            expect(state.auth.front_end).toEqual({
                username: undefined,
                password: undefined,
                is_authenticating: false,
                has_authenticated: false,
                error_message: error_message
            })
        })
    })
});

describe("login_user", () => {
    let dispatch;
    let dispatched_actions;

    beforeEach(() => {
        dispatch = (action) => {dispatched_actions.push(action)};
        dispatched_actions = [];
    });

    it("should return a function", () => {
        expect(login_user()).toBeA("function");
    });
});
