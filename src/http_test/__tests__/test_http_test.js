/**
 * Created by Michal on 2016-02-17.
 */
'use strict';

import expect from 'expect';
import React from 'react';
import {HTTPTestTemplate, map_state_to_props} from '../http_test';
import {map_dispatch_to_props} from '../http_test';
import {URL_CHANGED, url_changed, url_changed_reducer} from '../http_test';
import {RUN_TEST, run_test, run_test_reducer} from '../http_test';
import {GET_DATA_FROM_URL, get_data_from_url} from '../http_test';
import {get_data_from_url_reducer} from '../http_test';
import {RECEIVE_DATA_FROM_URL} from '../http_test';
import {receive_data_from_url} from '../http_test';
import {receive_data_from_url_reducer} from '../http_test';
import Header from '../../containers/header';
import {fetch_data} from '../http_test';
import store from '../../store';

describe("HTTPTestTemplate", () => {
    let on_url_change;
    let on_button_click;
    let http_test_result;
    let url_value;

    beforeEach(() => {
        on_url_change = () => {};
        on_button_click = () => {};

        http_test_result = {message: "Test Result"};
        url_value = "https://url.com";
    });

    it("Should provide a React JS template for rendering", () => {
        expect(HTTPTestTemplate({on_url_change, on_button_click,
        http_test_result, url_value})).toExist();
    })
});

describe("map_state_to_props", () => {
    let state;

    beforeEach(() => {
        state = {http_test:
        {reactjs:{data: "This is some returned data"}, url: "test_url"}}
    });

    it('Should map the state to the parameter object', () => {
        expect(map_state_to_props(state)).toEqual(
            {
                http_test_result: state.http_test.reactjs.data,
                url_value: state.http_test.url
            }
        )
    })
});

describe("map_dispatch_to_props", () => {
    let dispatch_list;
    let dispatch;

    beforeEach(() => {
        dispatch_list = [];
        dispatch = (input) => {dispatch_list.push(input)}
    });

    it("should give two callbacks for the callback functions in the container",
        () => {
            let result = map_dispatch_to_props(dispatch);

            expect(typeof result.on_url_change).toEqual("function");
            expect(typeof result.on_button_click).toEqual("function");
        })
});

describe("url_changed action creator", () => {
    let new_url;

    beforeEach(() => {
        new_url = 'foo'
    });

    it('should create an action of the URL_CHANGED type', () => {
        let action = url_changed(new_url);

        expect(action.type).toEqual(URL_CHANGED);
        expect(action.new_url).toEqual(new_url);
    })
});

describe("url_changed reducer", () => {
    let state;
    let action;
    let new_url;

    beforeEach(() => {
        new_url = 'https://api.github.com';
        action = url_changed(new_url);

        state = {http_test: {url: "https://api.google.com"}}
    });

    it("Should return the old state if the action is not URL_CHANGED", () => {
        let not_proper_action = {type: "GENERIC_ACTION", new_url: new_url};

        expect(not_proper_action.type).toNotEqual(URL_CHANGED);

        expect(url_changed_reducer(state, not_proper_action)).toEqual(state);
    });

    it("Should change the URL if the action is URL_CHANGED", () => {
        let new_state = {http_test: {url: new_url}};

        expect(url_changed_reducer(state, action)).toEqual(new_state);
    })
});

describe("run_test_action", () => {
    it("Should return the correct action", () => {
        expect(run_test()).toEqual({type: RUN_TEST});
    })
});

describe("run_test_reducer", () => {
    let action;
    let state;

    beforeEach(() => {
        action = run_test();
        state = {http_test: {frontend: {is_fetching: false}}};
    });

    it("Should return the old state if bad action is passed to it", () => {
        let not_valid_action = {type: "TAKE_NO_ACTION"};
        expect(not_valid_action.type).toNotEqual(action.type);

        expect(run_test_reducer(state, not_valid_action)).toEqual(state);
    });

    it("Should modify the state if the correct action is passed in", () => {
        let new_state = run_test_reducer(state, action);

        expect(new_state.http_test.frontend.is_fetching).toEqual(true);
    });
});

describe("get_data_from_url action", () => {
    let url;

    beforeEach(() => {
        url = "https://api.github.com";
    });

    it("Should return an action of the correct type", () => {
        expect(get_data_from_url(url)).toEqual(
            {type: GET_DATA_FROM_URL, url: url}
        )
    })
});

describe("get_data_from_url_reducer", () => {
    let state;
    let action;
    let url;

    beforeEach(() => {
        url = "https://api.github.com";

        state = {http_test: {reactjs: {is_fetching: false}}};
        action = get_data_from_url(url);
    });

    it("Should return the old state if the action is wrong", () => {
        let bad_action = {type: "NOT_A_VALID_ACTION"};
        expect(bad_action.type).toNotEqual(action.type);

        expect(get_data_from_url_reducer(state, bad_action)).toEqual(state);
    });

    it("Should flip the is_fetching flag when fetching begins", () => {
        let new_state = get_data_from_url_reducer(state, action);

        expect(new_state.http_test.reactjs.is_fetching).toEqual(true);
    })
});

describe("receive_data_from_url", () => {
    let url;
    let received_json;

    beforeEach(() => {
        url = 'https://api.github.com';
        received_json = {data: "data"};
    });

    it("Should create an action", () => {
        let action = receive_data_from_url(url, received_json);
        expect(action.type).toEqual(RECEIVE_DATA_FROM_URL);
        expect(action.data).toEqual(received_json);
        expect(action.received_at).toExist();
    })
});

describe("receive_data_from_url_reducer", () => {
    let url;
    let received_json;
    let action;
    let state;

    beforeEach(() => {
        url = 'https://api.github.com';
        received_json = {data: "data"};
        action = receive_data_from_url(url, received_json);

        state = {
            http_test: {
                reactjs: {
                    is_fetching: false,
                    data: {}
                },
                frontend: {
                    is_fetching: false,
                    data: {}
                }
            }
        }
    });

    it("Should return the old state if the action is bad", () => {
        let bad_action = {type: "TAKE NO ACTION"};
        expect(receive_data_from_url_reducer(state, bad_action)).toEqual(
            state
        );
    });

    it("Should make the required state manipulations", () => {
        let expected_new_state = {
            http_test: {
                reactjs: {
                    is_fetching: false,
                    last_updated: action.received_at,
                    data: received_json
                },
                frontend: {
                    is_fetching: false,
                    data: received_json
                }
            }
        };

        let new_state = receive_data_from_url_reducer(state, action);

        expect(expected_new_state).toEqual(new_state);
    })
});

describe("fetch data thunk", () => {
    let fetch_data_thunk;
    let get_state_spy;

    let initial_state;

    let mock_dispatch;
    let dispatched_actions;

    beforeEach(() => {
        initial_state = {
            http_test: {url: "https://api.github.com"}
        };

        get_state_spy = expect.spyOn(store, "getState").andCall(
            () => (initial_state)
        );

        dispatched_actions = [];
        mock_dispatch = (action) => {dispatched_actions.push(action)};

        fetch_data_thunk = fetch_data();
    });

    afterEach(() => {
        expect.restoreSpies();
    });

    it("Should return a function", () => {
        expect(typeof fetch_data()).toEqual("function");
    });

    it("Should run successfully", () => {
        fetch_data_thunk(mock_dispatch);
        expect(get_state_spy.calls.length).toEqual(1);
        expect(dispatched_actions.length).toNotEqual(0);
    })
});
