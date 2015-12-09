/**
 * Created by Michal on 2015-12-07.
 */
'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import LoginForm from '../registration';

describe('Test the LoginForm for the front page', () => {
    it('Should pass properties from the superclass constructor in its constructor',
        () => {
            var constructor_call_args = [];

            React.Component.constructor = (props) => {
                constructor_call_args.push(props)
            };

            let props = {name: 'foo'};

            let form = new LoginForm(props);

            expect(form.props).toEqual(props)
        });
});