/**
 * Created by Michal on 2016-04-04.
 */
import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import {CalendarTemplate} from '../welcome_calendar';

describe("Calendar Header Template", () => {
    let date;
    let on_select_event;
    let on_select_event_counter;
    let events;
    let view;

    beforeEach(() => {
        date = new Date("2016-01-01T12:00:00Z");

        on_select_event_counter = 0;

        on_select_event = () => { on_select_event_counter++ };
        events = [
            {
                title: "All Day",
                desc: "How long you ball?",
                allDay: true,
                start: new Date(2016, 4, 1),
                end: new Date(2016, 4, 1)
            }
        ];

        view = "month";


    });

    it('Should render into the DOM', () => {
        let component = ReactTestUtils.renderIntoDocument(
            CalendarTemplate({date, view, events, on_select_event})
        );

        expect(component).toExist();
    })
});