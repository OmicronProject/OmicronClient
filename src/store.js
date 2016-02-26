/**
 * Created by Michal on 2016-02-10.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import Reducer from './reducer';
import LoginBox from './containers/login_form';
import thunkMiddleware from 'redux-thunk';
import {api_url} from '../master_config';


const initial_state = {
    main_menu: {
        buttons:
        [
            {name: "Home", link: "#", key: "header_button1"},
            {name: "Dashboard", link: "#", key: "header_button2"},
            {name: "Login", link: "#", key: "header_button3"},
            {name: "HTTP Test", link: "/http_test", key:"header_button4",
                type:"internal"}
        ]
    },
    authenticator:
    {
        username: undefined,
        password: undefined,
        is_authenticating: false,
        authentication_failed: false,
        error_message: undefined
    },
    user:
    {
        username: undefined,
        password: undefined,
        auth_status: "not_authenticated",
        token_expiry_date: undefined
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