/**
 * Tests that the dispatcher is able to launch
 * Created by Michal on 2015-12-09.
 */
'use strict';

import Dispatcher from '../dispatcher';
import expect from 'expect';

describe('Test Dispatcher', () => {
    it('Should push a callback to the register list', () => {
        var callback = () => {};

        var dispatch = new Dispatcher();

        expect(dispatch.get_number_of_callbacks()).toEqual(0);

        dispatch.register(callback);

        expect(dispatch.get_number_of_callbacks()).toEqual(1);

    });

    it('Should get the number of callbacks currently on ' +
        'the _callbacks list', () => {
        let callback = () => {};

        let dispatch = new Dispatcher();

        let number_of_callbacks = 10;

        for(let i=0; i < number_of_callbacks; i++){
            dispatch.register(callback);
        }

        expect(dispatch.get_number_of_callbacks()).toEqual(number_of_callbacks);
    });

    it('Should resolve callbacks registered to the dispatcher', () => {
        let number_to_increment = 1;
        let callback = () => { number_to_increment++ };

        let dispatch = new Dispatcher();

        dispatch.register(callback);

        dispatch.dispatch(2);

        expect(number_to_increment).toEqual(2);
    })
});