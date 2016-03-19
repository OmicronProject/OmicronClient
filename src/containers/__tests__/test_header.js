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
            auth: {front_end: {has_authenticated: true, username: "foo"}}
        }
    });

    it('Should return an object with buttons matching those of the state',
        () => {
            expect(map_header_state_to_props(state)).toEqual(
                {
                    buttons: state.main_menu.buttons,
                    is_user_authenticated: true,
                    username: state.auth.front_end.username
                }
            )
        }
    );
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
