/**
 * Created by Michal on 2016-02-10.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import React from 'react';
import Reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import {api_url} from '../master_config';

import github_image from '../static/img/GitHub-Mark-64px.png';
import waffle_image from '../static/img/waffle-yellow-on-blue.png';

export const initial_state = {
    main_menu: {
        buttons:
        [
            {name: "Home", link: "#", key: "header_button1"},
            {name: "Dashboard", link: "#", key: "header_button2"},
            {name: "HTTP Test", link: "/http_test", key:"header_button4",
                type:"internal"}
        ]
    },
    auth: {
        front_end: {
            username: undefined,
            password: undefined,
            is_authenticating: false,
            has_authenticated: false,
            error_message: undefined,
            is_logging_out: false,
            has_logged_out: false
        },
        back_end: {
            username: undefined,
            password: undefined,
            is_authenticating: false,
            error_message: undefined,
            auth_token: undefined,
            token_expiry_date: undefined,
            is_logging_out: false
        }
    },
    login_form: {
        is_visible: false
    },
    registration_form:
    {
        username: undefined,
        password: undefined,
        re_entered_password: undefined,
        is_submitted: false
    },
    http_test: {
        url: undefined,
        frontend: {
            is_fetching: false,
            did_invalidate: false,
            data: {}
        },
        reactjs: {
            is_fetching: false,
            did_invalidate: false,
            last_updated: Date.now(),
            data: {}
        }
    },
    home_page: {
        calendar_mode: "month",
        selected_date: new Date(Date.now()),
        events: [{
                title: "All day event",
                allDay: true,
                start: new Date(2016, 4, 11),
                end: new Date(2016, 4, 11)
            },
            {
                title: "Another event",
                allDay: false,
                start: new Date(2016, 4, 11, 9, 52, 0),
                end: new Date(2016, 4, 11, 10, 52, 0)
            }
        ],
        selected_event: undefined,
        carousel: {
            selected_item: 0,
            direction: 'next',
            items_to_display: [
                {
                    content: <img src={github_image}/>,
                    caption: <div><h3>The GitHub Octocat</h3></div>,
                    key: 'octocat'
                },
                {
                    content: <img src={waffle_image} style={{height: 64 +'px'}}/>,
                    caption: <div><h3>The Waffle Logo</h3></div>,
                    key: 'waffle'
                }
            ]
        }
    },
    projects: {
        frontend: {
            is_fetching_projects: false,
            did_invalidate: false,
            projects: [
                {
                    "name": "test_project",
                    "description": "Delete this before checkin",
                    "date_created": 1457022439084,
                    "owner": "timmy"
                },
                {
                    "name": "test_project2",
                    "description": "This makes it a list",
                    "date_created": 1457022488535,
                    "owner": "timmy"
                }
            ]
        },
        reactjs: {
            is_fetching: false,
            cache_last_updated: 1457022488545,
            projects: [
                {
                    "name": "test_project",
                    "description": "Delete this before checkin",
                    "date_created": 1457022439084,
                    "owner": "timmy"
                },
                {
                    "name": "test_project2",
                    "description": "This makes it a list",
                    "date_created": 1457022488535,
                    "owner": "timmy"
                }
            ]
        }
    },
    omicron_api: {
        url: api_url,
        headers: {
            "content-type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    }
};

function configureStore(initialState) {
    return createStore(
        Reducer.application_reducer, initialState, compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
}

let store;
if (process.env.NODE_ENV === "development"){
    store = configureStore(initial_state);
} else {
    store = createStore(Reducer.application_reducer, initial_state,
        applyMiddleware(thunkMiddleware)
    );
}

export default store;
