/**
 * Created by Michal on 2016-02-22.
 * Contains unit tests for the authenticator
 */
import expect from 'expect';
import {START_LOGIN, start_login, start_login_reducer} from '../actions';

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
    })
});
