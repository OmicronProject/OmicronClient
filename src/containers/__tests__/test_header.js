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

describe("HeaderBar", () => {
    let props;

    beforeEach(()=>{
        props = 'foo';
    });

    it('Should accept props into its constructor', () => {
        let props = 'foo';
        let bar = new HeaderBar(props);
        expect(bar.props).toEqual(props);
    });
    it('Should make a button to an internal link with react_router,' +
        'if required', () => {
        let button_key = 'button';
        let button_name = 'Button';
        let button_link = '#';

        let button = {key: button_key, link: button_link, name: button_name};

        let bar = new HeaderBar(props);

        expect(bar._make_internal(button)).toExist();
    });

    it('Should make a button to an external link', () => {
        let button_key = 'button';
        let button_name = 'Button';
        let button_link = '#';

        let button = {key: button_key, link: button_link, name: button_name};

        let bar = new HeaderBar(props);

        expect(bar._make_external(button)).toExist();
    });

    it('Should render into the DOM', () => {
        let root = ReactTestUtils.renderIntoDocument(
            <HeaderBar buttons={[]}/>
        );
        expect(root).toExist();
    })
});