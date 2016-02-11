/**
 * Created by Michal on 2016-02-07.
 */
'use strict';
import expect from 'expect';
import React from 'react';
import HTTPRequest from "../http_request";

describe('Test HTTP Request component', () => {

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

    beforeEach(()=> {
        req = new HTTPRequest(props);
    });

    it('Should set default arguments if no arguments are provided', () => {
        let instance = req.create_axios_instance();

        expect(instance).toExist();
    });

    it('Should handle a successful response', () => {
        let response = {data: 'returned data'};

        req.handle_success(response);
    });

    it('Should handle a failed response', () => {
        let response = {error: 'returned error'};

        req.handle_failure(response);
    });
});