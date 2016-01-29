/**
 * Created by Michal on 2016-01-29.
 */
'use strict';

import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import HTTPStore from '../HTTPRequest';
import React from 'react';
import dispatch from '../../dispatcher/Dispatcher';

describe('Tests the HTTP Store', ()=>{
    it('Should pass relevant parameters to the constructor', () => {
        let initial_state = {
            url: 'http://www.google.com',
            http_method: 'GET',
            headers: {},
            body: {}
        };
        let store = new HTTPStore(dispatch, initial_state);

        let expected_state = {
            url: initial_state.url,
            http_method: initial_state.http_method,
            headers: initial_state.headers,
            body: initial_state.body,
            response: {}
        };

        expect(store.state).toEqual(expected_state);
    });

    it('Should send the request to ajax', () => {
        let initial_state = {
            url: 'http://www.google.com',
            http_method: 'GET',
            headers: {},
            body: {}
        };

        let mock_jquery = {
            call_count: 0,
            call_args: [],
            ajax: (url, settings) => {this.call_args.push([url, settings])}
        };

        let store = new HTTPStore(dispatch, initial_state, mock_jquery);
        store.send_request();

        let settings = {
            headers: store.state.headers,
            url: store.state.url,
            type: store.state.http_method,
            data: JSON.stringify(store.state.body),
            success: store.handle_response
        };

        expect(mock_jquery.call_count).toEqual(1);
        expect(mock_jquery.call_args).toEqual([[initial_state.url, settings]]);
    })
});