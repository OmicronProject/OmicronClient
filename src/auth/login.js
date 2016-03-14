/**
 *
 * Contains all actions for authentications, as well as their reducers
 *
 */
'use strict';
import Reducer, {reducer_factory} from '../reducer';
import store from '../store';

/**
 * Begins authentication on front end
 * @type {string}
 */
export const START_LOGIN = "START_LOGIN";

/**
 * Begin the login process. This clears the user credentials and lets the front
 * end know that it's time to show a spinner.
 */
export const start_login = () => (
    {
        type: START_LOGIN
    }
);

export const start_login_reducer = (state) => {
    state.auth.front_end.is_authenticating = true;
    state.auth.front_end.has_authenticated = false;
};

Reducer.register(reducer_factory(START_LOGIN)(start_login_reducer));

/**
 * Begin authentication on the back end
 *
 * @type {string}
 */
export const REQUEST_TOKEN = "REQUEST_TOKEN";

export const request_token = (username, password) => {
    return({
        type: REQUEST_TOKEN,
        username: username,
        password: password,
        auth_header: "Basic " + btoa(username + ":" + password)
    });
};

export const request_token_reducer = (state, action) => {
    state.auth.back_end.username = action.username;
    state.auth.back_end.password = action.password;
    state.auth.back_end.is_authenticating = true;

    state.omicron_api.headers["Authorization"] = action.auth_header;
};

Reducer.register(reducer_factory(REQUEST_TOKEN)(request_token_reducer));

/**
 * Successfully receive the token, and clean up the back end authenticator
 */
export const RECEIVE_TOKEN = "RECEIVE_TOKEN";

export const receive_token = (token, expiry_date) => ({
    type: RECEIVE_TOKEN,
    token: token,
    expiry_date: expiry_date
});

export const receive_token_reducer = (state, action) => {
    state.auth.back_end.auth_token = action.token;
    state.auth.back_end.password = undefined;
    state.auth.back_end.token_expiry_date = action.expiry_date;
    state.auth.back_end.is_authenticating = false;
};

Reducer.register(reducer_factory(RECEIVE_TOKEN)(receive_token_reducer));


/**
 * Let the front end know that the authentication has finished
 */
export const FINISH_AUTH = 'FINISH_AUTH';

export const finish_auth = (username, token) => ({
    type: FINISH_AUTH,
    username: username,
    token: token,
    auth_header: "Basic " + btoa(token + ":")
});

export const finish_auth_reducer = (state, action) => {
    state.auth.front_end = {
        username: action.username,
        password: undefined,
        is_authenticating: false,
        has_authenticated: true,
        error_message: undefined
    };

    state.omicron_api.headers["Authorization"] = action.auth_header;
};

Reducer.register(reducer_factory(FINISH_AUTH)(finish_auth_reducer));


/**
 * Communicate that token request returned an error on back end.
 * Clear all login credentials from the back end, and write the error
 * message to the back end. The error message not being "undefined" is
 * this authenticator's error state.
 */
export const RECEIVE_TOKEN_ERROR = "RECEIVE_TOKEN_ERROR";

export const receive_token_error = (message) => ({
    type: RECEIVE_TOKEN_ERROR,
    message: message
});

export const receive_token_error_reducer = (state, action) => {
    state.auth.back_end = {
        username: undefined,
        password: undefined,
        is_authenticating: false,
        error_message: action.message,
        auth_token: undefined,
        token_expiry_date: undefined
    };
};

Reducer.register(reducer_factory(RECEIVE_TOKEN_ERROR)(
    receive_token_error_reducer
));

/**
 * Clean up the faulty authentication on the front end
 */
export const CLEANUP_AUTH = "CLEANUP_AUTH";

export const cleanup_auth = (error_message) => ({
    type: CLEANUP_AUTH,
    message: error_message
});

export const cleanup_auth_reducer = (state, action) => {
    state.auth.front_end = {
        username: undefined,
        password: undefined,
        is_authenticating: false,
        has_authenticated: false,
        error_message: action.message
    }
};

Reducer.register(reducer_factory(CLEANUP_AUTH)(cleanup_auth_reducer));

/**
 *
 * Main authentication thunk that asynchronously initiates the authentication
 * when user presses the "Submit" button. This is what is dispatched by
 * the login form
 *
 */
export function login_user() {
    return function (dispatch) {
        let state = store.getState();
        dispatch(start_login());
        dispatch(request_token(
            state.auth.front_end.username,
            state.auth.front_end.password
        ));

        state = store.getState();

        axios({
            url:state.omicron_api.url + '/api/v1/token',
            method: "POST",
            headers: state.omicron_api.headers
        }).then(
            check_status(dispatch), handle_request_error(dispatch)
        ).then(
            handle_request_success(
                dispatch, state.auth.front_end.username
            ),
            handle_request_error(dispatch)
        )
    }
}

export function check_status(dispatch){
    return function (response) {
        let content_type = response.headers.get("Content-Type");
        if (response.status != 201){
            let error_message = "Unable to authenticate. " +
                "API request returned status " + response.status
                + " instead of 201.";
            dispatch(receive_token_error(error_message));
            dispatch(cleanup_auth(error_message));
        }
        if (content_type != 'application/json'){
            let error_message = "Unable to authenticate. " +
                "API request did not return JSON. Content-type is " +
                content_type + " instead.";
            dispatch(receive_token_error(error_message));
            dispatch(cleanup_auth(error_message));
        }

        return response;
    }
}

/**
 * This function is called if a failure occurs on making the request
 * before it is sent off to the API. This could be a preflight error, or
 * something more serious.
 * @param dispatch
 */
export function handle_request_error(dispatch){
    return function(error){
        dispatch(receive_token_error(error));
        dispatch(cleanup_auth(error));
    }
}

export function handle_request_success(dispatch, username){
    return function(response){
        response.then(
            (response) => {
                dispatch(receive_token(response.data.token, response.data.expiration_date));
                dispatch(finish_auth(username, response.data.token))
            }
        );
    }
}

export default login_user;