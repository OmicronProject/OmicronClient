/**
 * Created by Michal on 2016-02-11.
 * Contains unit tests for the header
 */
'use strict';
import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import HeaderBar from '../header';
import {Link} from 'react-router';
import {Provider} from 'react-redux';
import store from '../../store';
import {Header, _make_button, map_header_state_to_props} from '../header';

describe("Header", () => {
    it('Should map the make_button function to all the buttons', () => {
        let was_map_called = false;
        let map_callbacks = [];
        let buttons = {map: (callback) => {
            map_callbacks.push(callback); was_map_called=true
        }
        };

        let rendered_header = Header({buttons});

        expect(rendered_header).toExist();
        expect(was_map_called).toBe(true);
    })
});

describe("_make_button", () => {
    let internal_button;
    let external_button;

    beforeEach(() => {
        internal_button = {
            key: "test_key", name: "test button", link: "#", type: "internal"
        };
        external_button = {
            key: "test_key", name: "test button", link: "#", type: "external"
        };
    });

    it("Should make an internal link if the button is internal", () => {
        expect(_make_button(internal_button)).toEqual(
            <li key={internal_button.key} role="presentation">
                <Link to={internal_button.link}>{internal_button.name}</Link>
            </li>
        );
    });

    it("Should make an external link if the button is external", () => {
        expect(_make_button(external_button)).toEqual(
            <li key={external_button.key} role="presentation">
                <a href={external_button.link}>{external_button.name}</a>
            </li>
        )
    })
});

describe("map_header_state_to_props", () => {
    let state;

    beforeEach(() => {
        state = {
            main_menu: {buttons: "This is where an array of buttons would go"}
        }
    });

    it('Should return an object with buttons matching those of the state',
        () => {
            expect(map_header_state_to_props(state)).toEqual(
                {buttons: state.main_menu.buttons}
            )
        }
    )
});

describe("HeaderBar", () => {
    it('Should render into the DOM', () => {
        let root = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
                <HeaderBar buttons={[]}/>
            </Provider>
        );
        expect(root).toExist();
    })
});
