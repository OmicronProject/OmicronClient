/**
 * Created by Michal on 2015-11-19.
 */
'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import HelloForm from '../HelloForm';

describe('Tests the methods of HelloForm', () => {
    it('should pass properties to the superclass constructor in its ' +
        'constructor', () => {
        var constructor_call_args = [];

        React.Component.constructor = (props) => {
            constructor_call_args.push(props)
        };

        var props = {name: 'foo'};

        new HelloForm(props);
    });

    it('Should set its name to "world" on construction', () => {
        var props = {name: 'foo'};
        var form = new HelloForm(props);

        expect(form.state.name).toEqual('world');
    });

    it('Should render without problems', () => {
        var root = TestUtils.renderIntoDocument(<HelloForm />);
        expect(root).toExist();
    });
});