/**
 * Created by Michal on 2016-04-04.
 */
import React from 'react';
import {Glyphicon, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Reducer, {reducer_factory} from '../reducer';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/less/styles.less';
import '../../static/css/home_page/home_page.css';

BigCalendar.momentLocalizer(moment);

export const CalendarTemplate = ({date, view, events, on_select_event}) => (
    <Panel className="homepage_calendar">
        <BigCalendar defaultDate={date}
                     defaultView={view}
                     onSelectEvent={on_select_event}
                     events={events}
        />
    </Panel>
);

CalendarTemplate.propTypes = {
    date: React.PropTypes.instanceOf(Date).isRequired,
    view: React.PropTypes.oneOf(['day', 'month', 'week', 'agenda']),
    events: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            allDay: React.PropTypes.bool.isRequired,
            start: React.PropTypes.instanceOf(Date).isRequired,
            end: React.PropTypes.instanceOf(Date).isRequired
        })
    ).isRequired,
    on_select_event: React.PropTypes.func.isRequired
};

export const map_calendar_state_to_props = (state) => {
    let events_from_state = state.home_page.events;

    for(let i = 0; i < events_from_state.length; i++){
        events_from_state[i].start = new Date(events_from_state[i].start);
        events_from_state[i].end = new Date(events_from_state[i].end);
    }

    return(
    {
        date: new Date(state.home_page.selected_date),
        view: state.home_page.calendar_mode,
        events: events_from_state
    }
)};

export const map_dispatch_to_props = (dispatch) => ({
    on_select_event: (event) => {dispatch(event_selected(event))}

});


export const EVENT_SELECTED = "EVENT_SELECTED";

export const event_selected = (event) => ({
    type: EVENT_SELECTED,
    event: event
});

export const event_selected_reducer = (state, action) => {
    state.home_page.selected_event = action.event;
};

Reducer.register(reducer_factory(EVENT_SELECTED)(event_selected_reducer));


const Calendar = connect(map_calendar_state_to_props, map_dispatch_to_props)(
    CalendarTemplate);

export default Calendar;