/**
 * Created by Michal on 2016-04-15.
 */
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {CarouselTemplate} from '../welcome_carousel';

describe("CarouselTemplate", () => {
    let active_index;
    let items_to_display;
    let direction;
    let on_select_direction;

    beforeEach(() => {
        active_index = 0;
        items_to_display = [{content: 'foo', caption: 'bar', key: 'foobar'}];
        direction = 'next';
        on_select_direction = () => {};
    });

    it("should render into the DOM", () => {
        let root = ReactTestUtils.renderIntoDocument(
            CarouselTemplate({active_index, items_to_display, direction, on_select_direction})
        );

        expect(root).toExist();
    })
});