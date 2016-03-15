/**
 * Created by Michal on 2016-02-10.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import Reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import {api_url} from '../master_config';


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
