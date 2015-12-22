/**
 * Created by Michal on 2015-12-22.
 */
import expect from 'expect'
import App from '../App'
import React from 'react';

describe('App', () => {
    it("Should render an h1 tag in the DOM", () => {
        let app_result = App.render();
        expect(app_result).toEqual(<h1>This is the app</h1>);
    })
});