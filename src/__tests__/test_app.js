/**
 * Created by Michal on 2016-01-11.
 */
'use strict';

import expect from 'expect';
import App from '../app';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';


describe('Test the App', () => {
    it('Should render successfully', () => {
        let root = TestUtils.renderIntoDocument(<App />);
        expect(root).toExist();
        expect(root).toNotEqual(undefined);
    })
});