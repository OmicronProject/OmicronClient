/**
 * Created by Michal on 2016-04-04.
 */
import React, {PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';

export const CalendarTemplate = ({month, year}) => (
    <div>
    `<CalendarHeader />

    </div>
);


let calendar_header_button_classname =
    "col-xs-1 col-sm-2 col-md-2 col-lg-2 calendar-header-bar";

export const CalendarHeaderTemplate = (
    {month, year, on_previous_button_click, on_next_button_click}
) => (
    <div className="row">
        <div className={calendar_header_button_classname}
             id="PreviousButton">
            <button onClick={on_previous_button_click}
                    type="button" id="previous_button">
                <Glyphicon glyph="arrow-left"/>
            </button>
        </div>
        <div className="col-xs-10 col-sm-8 col-md-8 col-lg-8
                calendar-header-bar"
             id="month_year_tab">
            {month}, {year}
         </div>
        <div className={calendar_header_button_classname}
             id="NextButton">
            <Glyphicon glyph="arrow-right"/>
        </div>
    </div>
);

CalendarHeaderTemplate.propTypes = {
    month: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    on_previous_button_click: PropTypes.func.isRequired,
    on_next_button_click: PropTypes.func.isRequired
};