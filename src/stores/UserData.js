/**
 * Created by Michal on 2016-01-16.
 * Contains a store for User Data, including username, authentication token,
 */

'use strict';

import React from 'react';
import dispatcher from '../dispatcher/Dispatcher';
import http_request from '../components/http_request';
import Action from '../actions/Action';

export default class UserData extends React.Component {
    constructor(dispatch=dispatcher) {
        this.dispatch = dispatch;
        this.set_login_credentials = this.set_login_credentials.bind(this);

        this.dispatch.register(this.set_login_credentials);

        this.state = {status: "not authenticated"};
    }

    destructor(){
        this.dispatch.unregister(this.set_login_credentials);
    }

    /**
     * Listen for login credentials, and update the dispatcher appropriately
     * @param action
     */
    set_login_credentials(action){
        if (action.type === "SET_LOGIN_CREDENTIALS"){
            this._get_auth_token_from_server();
        }
    }

    _get_auth_token_from_server(request=http_request){
        this.setState({status: "authenticating"});

    }

    get_status() {
        return (this.state.status)
    }
}