/**
 * Created by Michal on 2016-02-19.
 */
import reducer from '../reducer';
import clone from '../object_cloning';

/**
 * Inform the UI that the asynchronous authentication procedure has
 * started
 * @type {string}
 */
export const AUTH_STARTED = "AUTH_STARTED";

export function auth_started(username, password) {
    return {
        type: AUTH_STARTED,
        username: username,
        password: password
    }
}

/**
 * Process the asynchronous action indicating that authentication has
 * started. This action fills in the required parameters for
 * the authenticator to run the HTTP request for authentication, being
 * the username and password supplied for the authenticator attempt.
 *
 * @param {Object} state The current state of the application
 * @param {Object} action The action to execute on the state
 * @returns {*} The new state
 */
export function auth_started_reducer(state, action) {
    if (action.type === AUTH_STARTED) {
        let new_state = clone(state);
        new_state.authenticator = {
            username: action.username,
            password: action.password,
            is_authenticating: true,
            authentication_failed: false,
            error_message: undefined
        };
        return new_state;
    } else {
        return state;
    }
}
reducer.register(auth_started_reducer);


/**
 * Action that is thrown last, indicating that the authentication request
 * completed successfully
 * @type {string}
 */
export const AUTH_SUCCESS = "AUTH_SUCCESS";

/**
 * Action creator for the "AUTH_SUCCESS" action. Takes in the token and
 * expiration date
 *
 * @param {str} token The token supplied on authentication
 * @param {str} expiration_date The datetime of expiration of the current token
 */
export function auth_success(token, expiration_date){
    return {
        type: AUTH_SUCCESS,
        token: token,
        token_expiration_date: expiration_date
    }
}

/**
 * Clean up the authenticator, create and add an authorization header to
 * the omicron_api headers,
 * @param state
 * @param action
 */
export function auth_success_reducer(state, action) {
    if (action.type === AUTH_SUCCESS){
        let new_state = clone(state);
        new_state.omicron_api.headers.Authorization =
            "Basic " + btoa(action.token);

        new_state.authenticator = {
            username: undefined,
            password: undefined,
            is_authenticating: false,
            authentication_failed: false
        };

        new_state.user = {
            username: state.user.username,
            password: undefined,
            auth_status: "authenticated",
            token_expiry_date: action.token_expiration_date
        }
    } else {
        return state;
    }
}

reducer.register(auth_success_reducer);

export const AUTH_FAILURE = "AUTH_FAILURE";

/**
 * Create an action stating that the authentication failed
 *
 * @param {string} message The message to send to the
 * @returns {{type: string, message: *}}
 */
export function auth_failure(message){
    return {
        type: AUTH_FAILURE,
        message: message
    }
}

function auth_failure_reducer(state, action) {
    if (action.type === AUTH_FAILURE){
        let new_state = clone(state);
        new_state.authenticator.is_authenticating = false;
        new_state.authenticator.error_message = action.message;
        new_state.authentication_failed = true;
        new_state.user.auth_status = "authentication_failed";

        return(new_state);
    } else {
        return state;
    }
}
reducer.register(auth_failure_reducer);