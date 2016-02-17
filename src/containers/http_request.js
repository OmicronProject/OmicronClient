/**
 * Created by Michal on 2016-02-16.
 * Contains a window meant to work as a demonstration of asynchronous
 * XHR, as well as the capability of the react-redux architecture to handle
 * Asynchronicity. Hopefully, this code can serve as a design pattern for
 * designing code involving asynchronous thunk execution.
 */
import React, { PropTypes } from 'react';
import Header from './header';
import clone from '../object_cloning';
import reducer from '../reducer';
import axios from 'axios';
import {connect} from 'react-redux';
import store from '../store';

/**
 * Template for running the asynchronous HTTP request test.
 *
 * @param {function} on_url_change The callback to execute when the url typed
 *  into the input box is changed
 * @param {function} on_button_click The callback to execute when the submit
 *  button is clicked, signifying that the user wants to access the site.
 * @param {Object} http_test_result The result of the JSON API call. This will
 *  get stringified and displayed
 * @param {string} url_value The URL of the resource to access.
 */
export const HTTPTestTemplate = ({
    on_url_change, on_button_click, http_test_result, url_value
    }) => (
    <div className="container container-fluid">
    <div className="row">
        <div className="col-md-8">
            <Header />
        </div>
        <div className="col-md-8">
            <form>
                <div className="form-group">
                    <label>JSON Resource URL</label>
                    <input type="text" className="form-control"
                           placeholder="URL To contact"
                           value={url_value} onChange={on_url_change} />
                </div>
                <div className="form-group">
                    <button className="btn btn-default"
                            onClick={on_button_click}>
                        Run Request
                    </button>
                </div>
            </form>
        </div>
        <div className="col-md-8">
        <p>URL {url_value}</p>
        </div>
        <div className="col-md-8">
            <p>Result of test: <br/></p>
            <p>{JSON.stringify(http_test_result)}</p>
        </div>
    </div>
    </div>
);

HTTPTestTemplate.propTypes = {
    on_url_change: PropTypes.func.isRequired,
    on_button_click: PropTypes.func.isRequired
};

/**
 * Takes in the current application state, and returns an object with the
 * required properties to render the HTTP Request form. Used in the connect
 * decorator to link up the application's state with the template props.
 *
 * @param {Object} state The current application state.
 * @returns {{http_test_result: (initial_state.http_test.reactjs.data|{}), url_value: *}}
 */
export function map_state_to_props(state) {
    return ({
        http_test_result: state.http_test.reactjs.data,
        url_value: state.http_test.url
    })
}

/**
 * Maps the required action creators to the callback properties required to
 * render the HTTP Request form
 * @param {function} dispatch The dispatch method for the application's store.
 *  This function is the method to which actions will be dispatched for the
 *  store's reducers to process.
 */
const map_dispatch_to_props = (dispatch) => (
    {
        on_url_change: (event) => {
            dispatch(url_changed(event.target.value))
        },
        on_button_click: () => {
            dispatch(fetch_data())
        }
    }
);

/**
 * Connect the HTTP template and the template's mappers to the application
 * state, and export it.
 */
const HTTPTest = connect(map_state_to_props, map_dispatch_to_props)(
    HTTPTestTemplate
);

export default HTTPTest;


export const URL_CHANGED = 'URL_CHANGED';

/**
 * Action creator for the URL_CHANGED action
 * @param new_url
 * @returns {{type: string, new_url: *}}
 */
export function url_changed(new_url) {
    return({
        type: URL_CHANGED,
        new_url: new_url
    })
}

/**
 * If the action is of the "URL_CHANGED" type, copies the current application
 * state, alters the url to be the new url, and returns the new state
 *
 * @param {Object} state The initial application state
 * @param {Object} action The action that is to change the state
 * @returns {*} The new application state
 */
export function url_changed_reducer(state, action) {
    if (action.type === URL_CHANGED) {
        let new_state = clone(state);
        new_state.http_test.url = action.new_url;
        return new_state;
    } else {
        return state;
    }
}

reducer.register(url_changed_reducer);

/**
 * Toggle the fetching flag on the front end, in order to let the UI know that
 * the appropriate loading graphics (i.e. spinners) should be loaded.
 */
export const RUN_TEST = "RUN_TEST";

/**
 * Create the test action
 *
 * @returns {{type: string}}
 */
export function run_test() {
    return ({
        type: RUN_TEST
    })
}

/**
 * Toggle the fetching flag to "true"
 *
 * @param {Object} state The initial application state
 * @param {Object} action The action that is to change the state
 * @returns {*} The new application state
 */
export function run_test_reducer(state, action) {
    if (action.type === RUN_TEST) {
        let new_state = clone(state);
        new_state.http_test.frontend.is_fetching = true;
        return new_state;
    } else {
        return state;
    }
}

reducer.register(run_test_reducer);

/**
 * Now that it's time to get a request, we dispatch the request action.
 * A separate action is done for this, in order to decouple the UI's
 * "RUN_TEST" action from the actual request.
 */
export const GET_DATA_FROM_URL = 'GET_DATA_FROM_URL';

export function get_data_from_url(url){
    return {
        type: GET_DATA_FROM_URL,
        url: url
    }
}

export function get_data_from_url_reducer(state, action) {
    if (action.type === GET_DATA_FROM_URL) {
        let new_state = clone(state);
        new_state.http_test.reactjs.is_fetching = true;
        return new_state;
    } else {
        return state;
    }
}

reducer.register(get_data_from_url_reducer);

/**
 * This action is called when the request is recieved by the UX.
 * It will write the data into the state
 */
export const RECIEVE_DATA_FROM_URL = 'RECIEVE_DATA_FROM_URL';

export function recieve_data_from_url(url, recieved_json) {
    return {
        type: RECIEVE_DATA_FROM_URL,
        url: url,
        recieved_at: Date.now(),
        data: recieved_json
    }
}

export function recieve_data_from_url_reducer(state, action) {
    if (action.type === RECIEVE_DATA_FROM_URL){
        let new_state = clone(state);

        new_state.http_test.reactjs.is_fetching = false;
        new_state.http_test.reactjs.last_updated = action.recieved_at;
        new_state.http_test.reactjs.data = action.data;

        new_state.http_test.frontend.is_fetching = false;
        new_state.http_test.frontend.data = action.data;

        return new_state;
    } else {
        return state;
    }
}

reducer.register(recieve_data_from_url_reducer);

/**
 * Thunk action to fetch the data from the URL.
 * This is used just like any other action
 * creator.
 * @returns {Function}
 */
export function fetch_data() {
    return function(dispatch) {
        /**
         * Dispatch the action stating that the back end is getting data
         */
        let url = store.getState().http_test.url;
        dispatch(run_test());
        dispatch(get_data_from_url(url));

        let request = axios({
            url: url,
            method: "GET",
            headers: {"content-type": "application/json"}
        });

        let success_handler = (response) => (
            dispatch(recieve_data_from_url(url, response.data))
        );

        return request.then(success_handler)
    }
}