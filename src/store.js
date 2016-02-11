/**
 * Created by Michal on 2016-02-10.
 */
import { createStore, combineReducers } from 'redux';
import {username_change_reducer, password_change_reducer} from './containers/login_form';

const initial_state = {
    user:
    {
        username: undefined,
        password: undefined,
        token: undefined,
        auth_status: "not_authenticated"
    },
    login_form:
    {
        button_clicked: "sign_in"
    }
};

let root_reducer = (state=initial_state, action) => {
    return (state);
};


let reducer = (state, action) => {
    switch (action.type){
        case "USERNAME_CHANGED":
            return(username_change_reducer(state, action));
            break;
        case "PASSWORD_CHANGED":
            return(password_change_reducer(state, action));
            break;
        default:
            return(root_reducer(state, action));
    }
};

let store = createStore(reducer, initial_state);

export default store;