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

    /** @test {App#constructor} */
    it('Should set its props and state to {} if no props are supplied', () => {
        let app = new App(undefined, undefined);
        expect(app.props).toEqual({});
        expect(app.state).toEqual({});
    });

    it('Should set its props to the object given', () => {
        let test_props = {property: 'value'};
        let app = new App(test_props, undefined);

        expect(app.props).toEqual(test_props);
    });

    it('Should set its state to the state given', () => {
        let test_state = {state: 'value'};
        let app = new App(undefined, test_state);

        expect(app.state).toEqual(test_state);
    });

    it('Should render successfully', () => {
        let app = new App(undefined, undefined);
        let root = TestUtils.renderIntoDocument(<app />);

        expect(root).toExist();
    })
});