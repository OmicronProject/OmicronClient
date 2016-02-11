/**
 * Created by Michal on 2016-02-07.
 */
'use strict';
import expect from 'expect';
import React from 'react';
import HTTPRequest from "../http_request";
import dispatcher from '../../dispatcher/Dispatcher';

describe('Test HTTP Request component', () => {
    let dispatch_spy;

    beforeEach(() => {
        dispatch_spy = expect.spyOn(dispatcher, 'dispatch');
    });

    afterEach(() => {
        dispatch_spy.restore();
    });

    it('Should construct with a valid URL', () => {
        let props = {
            url: 'https://api.github.com',
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        };

        let req = new HTTPRequest(props);

        expect(req).toExist();
        expect(req.props).toEqual(props);
        expect(req.state.request).toExist();
    });

    it('Should throw an error if a URL is not provided to the request', () => {
        expect(() => {new HTTPRequest({})}).toThrow();
    });

    it('Should default to GET if a method is not provided', ()=> {
        let props = {
            url: 'https://api.github.com'
        };

        let req = new HTTPRequest(props);

        expect(req.props.method).toEqual("GET")
    });

    it('Should create a default request', () => {
        let props = {
            url: 'https://api.github.com'
        };

        let req = new HTTPRequest(props);
        expect(req.state.request).toExist();
    });
});

describe('Test that HTTP Request successfully creates an axios instance', ()=>{
    let props = {url: 'https://api.github.com'};
    let req;
    let dispatcher;
    let dispatcher_callback_list = [];

    beforeEach(()=> {
        req = new HTTPRequest(props);
        dispatcher = {dispatch: (action) => {
            dispatcher_callback_list.push(action);
        }};
    });

    afterEach(()=>{
        dispatcher_callback_list = [];
    });

    it('Should set default arguments if no arguments are provided', () => {
        let instance = req.create_axios_instance();

        expect(instance).toExist();
    });

    it('Should handle a successful response', () => {
        let response = {data: 'returned data'};

        req.handle_success(response, dispatcher);
    });

    it('Should handle a failed response', () => {
        let response = {error: 'returned error'};

        req.handle_failure(response, dispatcher);
    });
});