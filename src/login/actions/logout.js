/**
 * Created by Michal on 2016-03-07.
 */
import Reducer, {reducer_factory} from '../../reducer';
import axios from 'axios';
import store from '../../store';

/**
 * Inform the UI that logout has started
 * @type {string}
 */
export const LOGOUT_STARTED = "LOGOUT_STARTED";

export const logout_started = () => ({type: LOGOUT_STARTED});

export const logout_started_reducer = (state) => {
    state.auth.front_end.is_logging_out = true;
    state.auth.front_end.has_logged_out = false;
};

Reducer.register(reducer_factory(LOGOUT_STARTED)(logout_started_reducer));

export const SEND_LOGOUT_REQUEST = "SEND_LOGOUT_REQUEST";

export const send_logout_request = () => ({type: SEND_LOGOUT_REQUEST});

export const send_logout_request_reducer = (state) => {
    state.auth.back_end.is_logging_out = true;
};

Reducer.register(
    reducer_factory(SEND_LOGOUT_REQUEST)(send_logout_request_reducer)
);

export const LOGOUT_REQUEST_SUCCESS = "LOGOUT_REQUEST_SUCCESS";

export const logout_request_success = () => ({type: LOGOUT_REQUEST_SUCCESS});

export const logout_request_success_reducer = (state) => {
    state.auth.back_end = {
        username: undefined,
        password: undefined,
        is_authenticating: false,
        has_authenticated: false,
        error_message: undefined,
        is_logging_out: false
    };
};

Reducer.register(reducer_factory(LOGOUT_REQUEST_SUCCESS)(
    logout_request_success_reducer)
);

export const LOGOUT_REQUEST_FAILURE = "LOGOUT_REQUEST_FAILURE";

export const logout_request_failure = (
    error
) => ({type: LOGOUT_REQUEST_FAILURE, error: error});

export const logout_request_failure_reducer = (state, action) => {
    let error_message;
    if (action.error.data !== undefined){
        error_message = JSON.stringify(action.error.data);
    } else {
        error_message = action.error;
    }

    state.auth.back_end = {
        username: undefined,
        password: undefined,
        is_authenticating: false,
        has_authenticated: false,
        error_message: error_message,
        is_logging_out: false,
        has_logged_out: false
    }
};

Reducer.register(
    reducer_factory(LOGOUT_REQUEST_FAILURE)(logout_request_failure_reducer)
);

export const FINISH_LOGOUT = "FINISH_LOGOUT";

export const finish_logout = () => ({type: FINISH_LOGOUT});

export const finish_logout_reducer = (state) => {
    if (state.auth.back_end.error_message === undefined){
        state.auth.front_end = {
            username: state.auth.back_end.username,
            password: undefined,
            is_authenticating: false,
            has_authenticated: false,
            error_message: undefined,
            is_logging_out: false,
            has_logged_out: true
        }
    } else {
        state.auth.front_end = {
            username: state.auth.back_end.username,
            password: undefined,
            is_authenticating: false,
            has_authenticated: false,
            error_message: state.auth.back_end.error_message,
            is_logging_out: false,
            has_logged_out: false
        }
    }
};

Reducer.register(reducer_factory(FINISH_LOGOUT)(finish_logout_reducer));


export function logout_user(){
    return function(dispatch){
        let state;

        dispatch(logout_started());
        dispatch(send_logout_request());

        state = store.getState();

        axios({
            url: state.omicron_api.url + '/tokens',
            method: "DELETE",
            headers: state.omicron_api.headers
        }).then(
            (response) => {
                if (response.status == 200){
                    dispatch(logout_request_success());
                } else {
                    dispatch(logout_request_failure(
                        JSON.stringify(response.data)
                    ));
                }
                dispatch(finish_logout());
            }
        ).catch(
            (error) => {
                console.log(error);
                dispatch(logout_request_failure(error));
                dispatch(finish_logout());
            }
        )
    }
}

export default logout_user;