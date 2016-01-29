/**
 * Created by Michal on 2016-01-29.
 *
 * Contains unit tests for the dispatcher
 */
'use strict';

import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import dispatch from '../Dispatcher';
import React from 'react';

describe('Test Dispatcher', () => {
    it('should accept a callback and register it', () => {
        let callback_list = [];
        let test_dispatcher = dispatch;

        let callback = () => {callback_list.push('hello')};

        test_dispatcher.register(callback);
        test_dispatcher.dispatch();

        expect(callback_list).toEqual(['hello']);
    })
});