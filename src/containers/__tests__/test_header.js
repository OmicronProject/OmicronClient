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