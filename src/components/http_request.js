/**
 * Created by Michal on 2016-02-07.
 * Contains a component responsible for making HTTP Requests to a web api
 */
'use strict';
import React from 'react';
import axios from 'axios';
import log from 'loglevel';
import dispatcher from '../dispatcher/Dispatcher';
import {HTTPSuccessAction, HTTPFailureAction} from '../actions/http_request';
/**
 * Run a cross-domain HTTP Request to another server.
 */
class HTTPRequest extends React.Component{
    /**
     * @param {Object} props The static properties of this request. This object
     * takes in a "url" property with the url to be accessed, a "method"
     * argument with the HTTP method to be used for making the request, and a
     * "headers" argument with the required headers to make the request.
     *
     * @example
     *  {
     *      url: "https://api.github.com",
     *      method: "GET",
     *      headers: {
     *          content-type: "application/json"
     *      }
     *  }
     */
    constructor(props) {
        super(props);
        this.props = props;
        this._validate_props(props);

        this.handle_success.bind(this);
        this.handle_failure.bind(this);
        this.create_axios_instance.bind(this);

        this.state = {
            request: this.create_axios_instance().then(this.handle_success)
                .catch(this.handle_failure)
        };
    }

    /**
     * Create an instance of the axios HTTP client, and set parameters to
     * default values. If no value for headers is provided, the header is set
     * to {} by default. If no value for the method is provided, then the
     * method defaults to "GET". If no value for data is set, then the value is
     * set to {}.
     */
    create_axios_instance(){
        let headers = this.props.headers;
        if (headers === undefined) {
            headers = {'content-type': 'application/json'};
            log.debug(
                'No headers provided to request url ' + this.props.url +
                    ' Using default value of {content-type: application/json}'
            );
        }

        let method = this.props.method;
        if (method === undefined) {
            log.debug(
                'No method provided to request with url ' + this.props.url +
                    'Using default value of "GET".'
            );
            method = "GET";
        }

        let data = this.props.data;
        if (data === undefined) {
            log.debug(
                'No data provided to request with url ' + this.props.url +
                    'Using default value of {}'
            );
            data = {}
        }

        return axios({
            url: this.props.url,
            method: method,
            headers: headers,
            data: data
        })
    }

    /**
     * Callback called if the HTTP request completed successfully.
     * Emits an action
     *
     * @param {Object} response The response to the request
     * @param {Dispatcher} dispatcher The dispatcher to which the action
     *  should be dispatched. the type of this action is "HTTP_REQUEST_SUCCESS"
     */
    handle_success(response, dispatcher=dispatcher){
        this.setState({response: response});
        let action = new HTTPSuccessAction(
            {
                url: this.props.url,
                method: this.props.method,
                headers: this.props.headers,
                response: response
            }
        );

        dispatcher.dispatch(action);
    }

    /**
     * Creates a new action for a failed HTTP request
     * @param error
     * @param dispatcher
     */
    handle_failure(error, dispatcher=dispatcher){
        this.setState({response: error, error: true});
        let action = new HTTPFailureAction(
            {
                url: this.props.url,
                method: this.props.method,
                headers: this.props.headers,
                response: error
            }
        );

        dispatcher.dispatch(action);
    }

     _validate_props(){
        if (this.props.url === undefined){
            throw new Error('Attempted to initialize HTTP Request without a url');
        }
        if (this.props.method === undefined){
            log.debug('Attempted to initialize a store without a method, using' +
                'default method of GET instead'
            );
            this.props.method = 'GET';
        }
    }
}


export default HTTPRequest;