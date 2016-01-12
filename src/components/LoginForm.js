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
    }

    static getInitialState(){
        return {username: 'Username', password: 'Password'}
    }

    handleSubmit(){
        console.log(String(this.state.username) + String(this.state.password))
    }

    render() {
        return(
            <form>
                <div id={this.name} className="loginForm">
                    <div className="form-group">
                        <label for="username_entry">Username</label>
                        <input type="text"
                               className="form-control"
                               id="username_entry"
                               value={this.state.username}
                        />
                    </div>
                    <div className="form-group">
                        <label for="password_entry">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password_entry"
                               placeholder="Password"
                               value={this.state.password}
                       />
                    </div>
                    <button type="submit" className="btn btn-default" onclick={this.handleSubmit}>Submit</button>
                </div>
            </form>
        )
    }
}

export default LoginForm;
