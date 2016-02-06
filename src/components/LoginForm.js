/**
 * Created by Michal on 2016-01-12.
 *
 * Contains the login form for the user
 */
'use strict';
import React from 'react';

/**
 * Controller-view for a simple login form for the user. Most code apart from
 * the menu refresher is boilerplate.
 */
class LoginForm extends React.Component {
    /**
     * Initializes the object's state to contain a username and a password
     */
    constructor() {
        super();
        this.name = 'LoginForm';

        this.state = {username: undefined, password: undefined};

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Will eventually initialize an action to submit login credentials to
     */
    handleSubmit(){

    }

    /**
     * Sets the username to the value that was entered into the username input
     * on the login form
     *
     * @param {SyntheticEvent} event cross-browser event wrapper over the
     *  Change event emitted by writing into the username field
     */
    handleUsernameChange(event) {
        this.setState(
            {username: event.target.value}
        )
    }

    /**
     * Sets the password to the new value
     * @param event
     */
    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    /**
     * Render into the DOM
     * @returns {XML} The JSX login form to be rendered
     */
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
