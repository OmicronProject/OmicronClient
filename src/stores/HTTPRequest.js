/**
 * Contains a store capable of making an asynchronous HTTP request to a
 * server, and storing the response.
 */
import React from 'react';
import 'jquery';
import {Store} from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';


class HTTPStore extends Store {
    constructor(dispatcher:Dispatcher, initialState, jquery=$) {
        super(dispatcher);
        this.state = {
            url: initialState.url,
            http_method: initialState.http_method,
            headers: initialState.headers,
            body: initialState.body,
            response: {}
        };
        this.jquery = jquery;
        this.send_request.bind(this);
    }

    send_request() {
        return(
            this.jquery.ajax(this.state.url, {
                headers: this.state.headers,
                url: this.state.url,
                type: this.state.http_method,
                data: JSON.stringify(this.state.body),
                success: this.handle_response
            })
        )
    }

    handle_response() {

    }

    __onDispatch(action) {
        switch (action.action_type) {
            case 'EDIT_REQUEST':
                this.setState(action.data.new_parameters);
        }
    }
}

export default HTTPStore