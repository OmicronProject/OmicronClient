/**
 * Created by Michal on 2016-03-15
 *
 * Unit tests for LoginForm components
 *
 */
'use strict';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {UsernameBoxTemplate, UsernameBox} from '../login_form';
import store from '../../store';
import {Provider} from 'react-redux';

describe("UsernameBox", () => {
    it("Should render", () => {
        let box = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
                <UsernameBox />
            </Provider>
        );
        expect(box).toExist();
    })
});