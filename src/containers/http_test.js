/**
 * Created by Michal on 2016-02-16.
 */
import React from 'react';
import Header from './header';
import clone from '../object_cloning';
import Reducer from '../reducer';
import axios from 'axios';

const HTTPTest = ({http_test_result, on_button_click, url_value,
    on_url_change}) => (
    <div className="container container-fluid">
        <Header />
        <input type="text" placeholder="URL To contact" value={url_value}
               onchange={on_url_change} />
        Result of test: <br/>
        {http_test_result}

        <button className="btn btn-default"
                onclick={on_button_click}>
            Run Request
        </button>
    </div>
);

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

export function url_changed_reducer(state, action) {
    if (action.type === URL_CHANGED) {
        let new_state = clone(state);
        new_state.http_test.url = action.new_url;
        return new_state
    } else {
        return state
    }
}

Reducer.register(url_changed_reducer);


export const TEST_STARTED = 'TEST_STARTED';
export const TEST_SUCCEES = 'TEST_SUCCESS';
export const TEST_FAILED = 'TEST_FAILED';

/**
 * This action is synchronous
 */
export const RUN_TEST = "RUN_TEST";
export function run_test(url) {
    return ({
        type: RUN_TEST,
        url: url
    })
}

export function run_test_reducer(state, action) => {
    if (action.type === RUN_TEST) {
        let new_state = clone(state);
        new_state.http_test.frontend.is_fetching = true;
    } else {
        return state;
    }
}

Reducer.register(run_test_reducer);

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

export function get_data_from_url_reducer(state, action) => {
    if (action.type === GET_DATA_FROM_URL) {
        let new_state = clone(state);
        new_state.http_test.reactjs.is_fetching = true;
    }
}


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

/**
 * Thunk action to fetch the data from the URL.
 * This is used just like any other action
 * creator
 * @param url
 * @returns {Function}
 */
export function fetch_data(url) {
    return function(dispatch) {
        /**
         * Dispatch the action stating that the back end is getting data
         */
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