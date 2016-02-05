/**
 * Created by Michal on 2016-01-13.
 */
import React from 'react';
import expect from 'expect';
import Action from '../action';
import TestUtils from 'react/lib/ReactTestUtils';

describe('Tests Action', () => {
    it('Should accept an action type as a name', () => {
        let payload = {value: 'payload'};
        let name = 'TEST_ACTION';
        let action = new Action(name, payload);

        expect(action.payload).toEqual(payload);
        expect(action.type).toEqual(name);
    })
});