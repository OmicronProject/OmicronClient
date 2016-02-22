/**
 * Created by Michal on 2016-02-22.
 */
import expect from 'expect'
import {AUTH_STARTED, auth_started, auth_started_reducer} from '../actions';

describe("auth_started", () => {
    let username;
    let password;

    beforeEach(() => {
        username = 'username';
        password = 'password';
    });

    it("Should accept a username and password into the action creator", () => {
        let action = auth_started(username, password);
        expect(action.type).toEqual(AUTH_STARTED);
        expect(action.username).toEqual(username);
        expect(action.password).toEqual(password);
    });
});

describe("auth_started_reducer", () => {
    let username;
    let password;
    let action;

    let state;

    beforeEach(() => {
        username = 'username';
        password = 'password';
        action = auth_started(username, password);

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

        expect(auth_started_reducer(state, bad_action)).toEqual(state);
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

        expect(auth_started_reducer(state, action)).toEqual(new_state);
    })
});