/**
 * Contains methods for sending HTTP requests in React
 */
'use strict';
import React from 'react';
import FluxStore from 'flux/lib/FluxStore';
import Dispatcher from '../dispatcher/Dispatcher';
import axios from 'axios';

class HTTPStore extends FluxStore {
    constructor(initial_state, dispatcher=Dispatcher) {
        super(dispatcher);
        this.state = {
            parameters: initial_state,
            response: {}
        };

        this.create_axios_instance.bind(this);
        this.callback_token = dispatcher.register(this.change_state);
    }

    destructor(){
        this.__dispatcher.unregister(this.callback_token);
    }

    create_axios_instance(parameters) {
        if (parameters.method === undefined){
            parameters.method = "get";
        }
        if (parameters.timeout === undefined){
            parameters.timeout = 2000;
        }
        return axios.create({
            url: parameters.url,
            timeout: parameters.timeout,
            headers: parameters.headers,
            method: parameters.method
        });
    }

    change_state(action) {
        if (action.type === "UPDATE_STATE") {
            this.setState(action.payload);
        }
    }


}

export default HTTPStore;