/**
 * Created by Michal on 2016-03-01.
 */
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import { _make_button } from '../header';
import { Link } from 'react-router';

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