/**
 * Created by Michal on 2016-02-11.
 * Contains unit tests for the header
 */
'use strict';
import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import HeaderBar from '../header';
import {Link} from 'react-router';
import {Provider} from 'react-redux';
import store from '../../store';
import {Header, map_header_state_to_props} from '../header';

describe("map_header_state_to_props", () => {
    let state;

    beforeEach(() => {
        state = {
            main_menu: {buttons: "This is where an array of buttons would go"},
            user: {auth_status: "authenticated", username: "username"}
        }
    });

    it('Should return an object with buttons matching those of the state',
        () => {
            expect(map_header_state_to_props(state)).toEqual(
                {
                    buttons: state.main_menu.buttons,
                    is_user_authenticated: true,
                    username: state.user.username
                }
            )
        }
    );

    it("Should return a false value if incorrect auth status", () => {
        let new_state = Object.assign(state);
        new_state.user.auth_status = 'not_authed';

        expect(map_header_state_to_props(state)).toEqual(
            {
                buttons: state.main_menu.buttons,
                is_user_authenticated: false,
                username: state.user.username
            }
        )
    })
});

describe("HeaderBar", () => {
    it('Should render into the DOM', () => {
        let root = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
                <HeaderBar buttons={[]}/>
            </Provider>
        );
        expect(root).toExist();
    })
});
