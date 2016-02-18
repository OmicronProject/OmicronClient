/**
 * Contains tests for the "./src" directory
 */
'use strict';

import expect from 'expect';
import App from '../app';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

/** @test {App} */
describe('Test the App', () => {

    it('Should set its props to the object given', () => {
        let test_props = {property: 'value'};
        let app = new App(test_props);

        expect(app.props).toEqual(test_props);
    });

    it('Should render successfully', () => {
        let app = new App({});
        let root = TestUtils.renderIntoDocument(<app />);

        expect(root).toExist();
    })
});