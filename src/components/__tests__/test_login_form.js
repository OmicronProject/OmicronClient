/**
 * Created by Michal on 2016-02-17.
 * Contains unit tests for the login form components
 */
'use strict';
import expect from 'expect';
import {UserNameBox, PasswordBox, SignInButton} from '../login_form';
import {SignInSpinner, InputBox} from '../login_form';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

describe("InputBox", () => {
    let props;
    let change_callback_list;
    let change_callback;
    let value;

    beforeEach(() => {
        value = 'test_value';
        change_callback_list = [];
        change_callback = (change) => {change_callback_list.push(change)};

        props = {
            box_name: "TestBox", input_type: "text",
            box_id: "box", change_callback: change_callback,
            value: value
        }
    });

    it('should add props to its constructor', () => {
        let box = new InputBox(props);
        expect(box.props).toEqual(props);
    });
});

describe("UsernameBox", () => {
    let props;

    beforeEach(() => {
        props = {change_callback: (x) => (x), value: "foo"};
    });

    it("Should add default parameters to the InputBox", () => {
        let box = new UserNameBox();

        expect(box.box_name).toEqual("Username");
        expect(box.box_id).toEqual('username-entry');
    });

    it("Should render", () => {
        let box = ReactTestUtils.renderIntoDocument(
            <UserNameBox change_callback={props.change_callback}
                         value={props.value}
            />);

        expect(box).toExist();
    })
});

describe("PasswordBox", () => {
    let props;

    beforeEach(() => {
        props = {
            data: "foo"
        }
    });

    it("Should fill in default parameters", () => {
        let box = new PasswordBox();
        expect(box.box_name).toEqual("Password");
        expect(box.box_id).toEqual("password-entry");
        expect(box.input_type).toEqual("password");
    })
});
