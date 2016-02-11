/**
 * Created by Michal on 2016-02-08.
 */
import React from 'react';
import HTTPRequest from './http_request';
import axios from 'axios';

class HTTPTest extends React.Component {
    constructor(props) {
        super(props);

        this.handle_success = this.handle_success.bind(this);
        this.handle_error = this.handle_error.bind(this);

        this.state = {
            request: axios({
                url: 'http://omicronserver.herokuapp.com/',
                method: "GET",
                headers: {
                    'content-type': "application/json"
                },
                timeout: 15000
            }).then(this.handle_success).catch(this.handle_error),
            response: 'No response yet'
        }
    }

    handle_success(response){
        this.setState({response: response});
    }

    handle_error(error){
        this.setState({response: error});
    }

    render() {
        return(
            <div className="container">
                status: {this.state.response.status} {this.state.response.statusText};
            </div>
        )
    }
}

export default HTTPTest;