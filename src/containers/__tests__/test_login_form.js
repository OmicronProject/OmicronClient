/**
 * Created by Michal on 2016-02-11.
 */
import React from 'react';
import LoginBox from '../login_form';
import {username_change_reducer, password_change_reducer} from '../login_form';
import expect from 'expect';
import ReactTestUtils from 'react/lib/ReactTestUtils';

describe('LoginForm', () => {
    it('should render into the virtual DOM')
});

describe('Username Change Reducer', ()=>{
    it('Should change the username given a state and an action', () => {
        let old_username = 'foo';
        let old_state = {
            user: {
                username: old_username
            }
        };

        let new_username = 'bar';

        let new_state = {
            user: {
                username: new_username
            }
        };

        let action = {type: "USERNAME_CHANGED", username: new_username};

        expect(username_change_reducer(old_state, action)).toEqual(new_state);
    });

    it('Should not do anything if the action is not "USERNAME_CHANGED"', () => {
        let old_username=  'foo';
        let old_state = {
            user: {
                username: old_username
            }
        };

        let new_username = 'bar';

        let action = {type: "NOT_THE_RIGHT_ACTION", username: new_username};

        expect(username_change_reducer(old_state, action)).toEqual(old_state);
    })
});