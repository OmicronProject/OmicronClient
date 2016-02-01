/**
 * Created by Michal on 2016-01-12.
 *
 * Contains the login form for the user
 */
'use strict';
import React from 'react';

class LoginForm extends React.Component {
    constructor() {
        super();
        this.name = 'LoginForm';

        this.state = {username:undefined, password:undefined};

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){

    }

    handleUsernameChange(event) {
        this.setState(
            {username: event.target.value}
        )
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return(
            <div className="container">
            <form>
                <div id={this.name} className="loginForm">
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"
                               className="form-control"
                               id="username_entry"
                               onChange={this.handleUsernameChange}
                               placeholder="Username"
                               value={this.state.username}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                               className="form-control"
                               id="password_entry"
                               onChange={this.handlePasswordChange}
                               placeholder="Password"
                               value={this.state.password}
                       />
                    </div>
                    <button type="submit" className="btn btn-default" onclick={this.handleSubmit}>Submit</button>
                </div>
                <div>username={this.state.username}, password={this.state.password}</div>
            </form>
            </div>
        )
    }
}

export default LoginForm;
