/**
 * Created by Michal on 2016-02-10.
 */
import { createStore, applyMiddleware } from 'redux';
import Reducer from './reducer';
import LoginBox from './containers/login_form';
import thunkMiddleware from 'redux-thunk';


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
    user:
    {
        username: undefined,
        password: undefined,
        token: undefined,
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
            is_fetching: true,
            did_invalidate: false,
            data: {}
        },
        reactjs: {
            is_fetching: false,
            did_invalidate: false,
            last_updated: Date.now(),
            data: {}
        }
    }
};

let store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(Reducer.application_reducer, initial_state);

export default store;