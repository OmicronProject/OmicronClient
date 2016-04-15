/**
 * Created by Michal on 2016-04-04.
 */
import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import {CalendarTemplate} from '../welcome_calendar';

describe("Calendar Header Template", () => {
    let date;
    let on_previous_button_click;
    let previous_button_click_counter;
    let on_next_button_click;
    let next_button_click_counter;

    beforeEach(() => {
        date = new Date("2016-01-01T12:00:00Z");

        previous_button_click_counter = 0;
        next_button_click_counter = 0;

        on_previous_button_click = () => { previous_button_click_counter++ };
        on_next_button_click = () => { next_button_click_counter++ };

    });

    it('Should render into the DOM', () => {
        let component = ReactTestUtils.renderIntoDocument(
            CalendarTemplate({date, on_previous_button_click,
            on_next_button_click})
        );

        expect(component).toExist();
    })
});