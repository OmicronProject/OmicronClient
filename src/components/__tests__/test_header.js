/**
 * Created by Michal on 2016-02-01.
 */
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import HeaderBar from '../header';
import React from 'react';

describe('Test header bar', () => {
    it('should take in props in its constructor', () => {
        let props = {buttons:[{name: 'foo', link: "#"}]};

        let bar = new HeaderBar(props);

        expect(bar.props).toEqual(props);
    });

    it('Should make a JSX button', () => {
        let props = {buttons:[{name: 'foo', link: "#"}]};
        let bar = new HeaderBar(props);

        let button = bar.make_button(props.buttons[0]);

        let button_name = props.buttons[0].name;
        let button_link = props.buttons[0].link;

        expect(button).toEqual(<a href={button_link}>{button_name}</a>);
    });

    it('Should render into the DOM', () => {
        let props = [{name: 'foo', link: "#"}];
        let root = TestUtils.renderIntoDocument(
            <HeaderBar buttons={props} />
        );

        expect(root).toExist();
    })
});