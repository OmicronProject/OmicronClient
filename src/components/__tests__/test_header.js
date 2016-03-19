/**
 * Created by Michal on 2016-03-01.
 */
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import { _make_button } from '../header';
import { NavItem, NavDropdown, MenuItem, Navbar } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
            <LinkContainer key={internal_button.key} to={{pathname: internal_button.link}}>
                <NavItem eventKey={internal_button.key}>
                    {internal_button.name}
                </NavItem>
            </LinkContainer>
        );
    });

    it("Should make an external link if the button is external", () => {
        expect(_make_button(external_button)).toEqual(
            <NavItem eventKey={external_button.key}
                     key={external_button.key}
                     href={external_button.link}>
                {external_button.name}
            </NavItem>
        )
    })
});