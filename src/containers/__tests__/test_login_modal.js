/**
 * Created by Michal on 2016-03-15.
 */
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {LoginFormTemplate} from '../login_modal';

describe("LoginFormTemplate", () => {
    let is_visible;
    let on_hide;

    beforeEach(() => {
        is_visible = true;
        on_hide = () => {};
    });

    it("Should render into the DOM", () => {
        let template = ReactTestUtils.renderIntoDocument(
            <LoginFormTemplate is_visible={is_visible} on_hide={on_hide}/>
        );
        expect(template).toExist();
    })
});
