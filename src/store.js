/**
 * Created by Michal on 2016-02-10.
 */
import { createStore, combineReducers } from 'redux';
import Reducer from './reducer';
import LoginBox from './containers/login_form';

const initial_state = {
    main_menu: {
        buttons:
        [
            {name: "Home", link: "#", key: "header_button1"},
            {name: "Dashboard", link: "#", key: "header_button2"},
            {name: "Login", link: "#", key: "header_button3"},
            {name: "HTTP Test", link: "/http_test", key:"header_button4"}
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
    login_form:
    {
        button_clicked: "sign_in"
    }
};

let store = createStore(Reducer.application_reducer, initial_state);

export default store;