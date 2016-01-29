/**
 * Contains a store capable of making an asynchronous HTTP request to a
 * server, and storing the response.
 */
import React from 'react';
import 'jquery';
import Flux from 'flux';
import Dispatcher from '../dispatcher/Dispatcher';


class HTTPStore extends Flux.FluxStore {
    constructor(dispatcher:Dispatcher, initialState, live_update) {
        super(dispatcher);
        this.state = {
            url: initialState.url,
            http_method: initialState.http_method,
            headers: initialState.headers,
            body: initialState.body,
            response: {}
        };
        this.live_update = live_update;

        this.edit_request.bind(this);
    }

    send_request() {
        return(
            $.ajax({
                headers: this.state.headers,
                url: this.state.url,
                type: this.state.http_method,
                data: JSON.stringify(this.state.body),
                success: this.handle_response
            })
        )
    }

    __onDispatch(action) {
        switch (action.action_type) {
            case 'EDIT_REQUEST':
                this.setState(action.data.new_parameters);
        }
    }
}