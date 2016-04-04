/**
 * Created by Michal on 2016-04-04.
 */
import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import {CalendarHeaderTemplate} from '../welcome_calendar';

describe("Calendar Header Template", () => {
    let month;
    let year;
    let on_previous_button_click;
    let previous_button_click_counter;
    let on_next_button_click;
    let next_button_click_counter;

    beforeEach(() => {
        month = 'January';
        year = 2016;

        previous_button_click_counter = 0;
        next_button_click_counter = 0;

        on_previous_button_click = () => { previous_button_click_counter++ };;
        on_next_button_click = () => { next_button_click_counter++ };

    });

    it('Should render into the DOM', () => {
        let component = ReactTestUtils.renderIntoDocument(
            CalendarHeaderTemplate(month, year, on_previous_button_click,
            on_next_button_click)
        );

        expect(component).toExist();
    })
});