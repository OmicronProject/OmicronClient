/**
 * Contains unit tests for HTTP Box components
 * Created by Michal on 2016-02-26.
 */
import React from 'react';
import expect from 'expect';
import {URLEntryForm, ResultsBox} from '../http_request';

/** @test {URLEntryForm} */
describe("URLEntryForm", () => {
    let on_url_change;
    let on_button_click;
    let url_value;

    beforeEach(() => {
        on_url_change = (x) => (x);
        on_button_click = (x) => (x);
        url_value = "http://some_url.com";
    });

    it('Should return a React Component', () => {
        let form = new URLEntryForm({
            url_value: url_value,
            on_url_change: on_url_change,
            on_button_click: on_button_click
        });

        expect(form).toExist();
        expect(form).toNotEqual(undefined);
    })
});

/** @test {ResultsBox} */
describe("ResultsBox", () => {
    let url_value;
    let http_result;

    beforeEach(() => {
        url_value = "http://here_is_another_url.com";
        http_result = {"This": "variable", "should": "be",
        "cast": "to", "JSON": 0};
    });

    it('Should render successfully', () => {
        let box = new ResultsBox({
            url_value: url_value, test_result: http_result
        });

        expect(box).toExist();
        expect(box).toNotEqual(undefined);
    })
});
