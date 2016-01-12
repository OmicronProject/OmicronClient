/**
 * Created by Michal on 2016-01-12.
 */
'use strict';

import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import LoginForm from '../LoginForm';
import React from 'react';

describe('Test Login Form', ()=> {
    it('should set the name for the component', () => {
        let form = new LoginForm();

        expect(form.name).toEqual('LoginForm')
    });

    it('should render into the DOM', () => {
        let form = new LoginForm();

        let root = TestUtils.renderIntoDocument(<form />);
        expect(root).toExist();
    })
});