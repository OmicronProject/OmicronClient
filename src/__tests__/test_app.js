/**
 * Created by Michal on 2016-01-11.
 */
'use strict';

import expect from 'expect';
import App from '../app';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';


describe('Test the App', () => {

    it('Should set its props and state to {} if no props are supplied', () => {
        let app = new App('Test Class', undefined, undefined);
        expect(app.props).toEqual({});
        expect(app.state).toEqual({});
    });

    it('Should set its props to the object given', () => {
        let test_props = {property: 'value'};
        let app = new App('Test Class', test_props);

        expect(app.props).toEqual(test_props);
    });

    it('Should set its state to the state given', () => {
        let test_state = {state: 'value'};
        let app = new App('Test Class', undefined, test_state);

        expect(app.state).toEqual(test_state);
    });

    it('Should throw an error if no className is supplied', () => {
        expect(() => {new App();}).toThrow(
            'A Generic App object was instantiated without a className'
        );
    });

    it('Should render successfully', () => {
        let app = new App('Test Class', undefined, undefined);
        let root = TestUtils.renderIntoDocument(<app />);

        expect(root).toExist();
    })
});