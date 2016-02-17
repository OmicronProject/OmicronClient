/**
 * Created by Michal on 2016-02-17.
 */
'use strict';

import expect from 'expect';
import React from 'react';
import {HTTPTestTemplate, map_state_to_props} from '../http_request';
import {map_dispatch_to_props} from '../http_request';
import Header from '../header';

describe("HTTPTestTemplate", () => {
    let on_url_change;
    let on_button_click;
    let http_test_result;
    let url_value;

    beforeEach(() => {
        on_url_change = () => {};
        on_button_click = () => {};

        http_test_result = {message: "Test Result"};
        url_value = "https://url.com";
    });

    it("Should provide a React JS template for rendering", () => {
        expect(HTTPTestTemplate({on_url_change, on_button_click,
        http_test_result, url_value})).toExist();
    })
});

describe("map_state_to_props", () => {
    let state;

    beforeEach(() => {
        state = {http_test:
        {reactjs:{data: "This is some returned data"}, url: "test_url"}}
    });

    it('Should map the state to the parameter object', () => {
        expect(map_state_to_props(state)).toEqual(
            {
                http_test_result: state.http_test.reactjs.data,
                url_value: state.http_test.url
            }
        )
    })
});

describe("map_dispatch_to_props", () => {
    let dispatch_list;
    let dispatch;

    beforeEach(() => {
        dispatch_list = [];
        dispatch = (input) => {dispatch_list.push(input)}
    });

    it("should give two callbacks for the callback functions in the container",
        () => {
            let result = map_dispatch_to_props(dispatch);

            expect(typeof result.on_url_change).toEqual("function");
            expect(typeof result.on_button_click).toEqual("function");
        })
});