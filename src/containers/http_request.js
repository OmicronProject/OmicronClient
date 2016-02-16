/**
 * Created by Michal on 2016-02-16.
 * Contains a window meant to work as a demonstration of asynchronous
 * XHR, as well as the capability of the react-redux architecture to handle
 * Asynchronicity. Hopefully, this code can serve as a design pattern for
 * designing code involving asynchronous thunk execution.
 */
import React from 'react';
import {PropTypes} from 'react';
import Header from './header';
import clone from '../object_cloning';
import reducer from '../reducer';
import axios from 'axios';
import {connect} from 'react-redux';
import store from '../store';

/**
 *
 * @param on_url_change
 * @param on_button_click
 * @param http_test_result
 * @param url_value
 * @constructor
 */
const HTTPTestTemplate = ({
    on_url_change, on_button_click, http_test_result, url_value
    }) => (
    <div className="container container-fluid">
        <Header />
        <input type="text" placeholder="URL To contact" value={url_value}
               onChange={on_url_change} />
        <br/>

        <button className="btn btn-default"
                onClick={on_button_click}>
            Run Request
        </button> <br/>
        URL {url_value}
        <br/>
        Result of test: <br/>
        {JSON.stringify(http_test_result)}
    </div>
);

HTTPTestTemplate.propTypes = {
    on_url_change: PropTypes.func.isRequired,
    on_button_click: PropTypes.func.isRequired
};

function map_state_to_props(state) {
    return ({
        http_test_result: state.http_test.reactjs.data,
        url_value: state.http_test.url
    })
}

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
 * This action is synchronous
 */
export const RUN_TEST = "RUN_TEST";
export function run_test() {
    return ({
        type: RUN_TEST
    })
}

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