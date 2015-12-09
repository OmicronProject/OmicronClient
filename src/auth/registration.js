import React from 'react';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="loginForm">
                <UsernameField />
                <PasswordField />
                <EmailField />
                <LoginButton />
            </div>
        )
    }
}

class UsernameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: ''};
    }

    render() {
        return (
            <input type="text" onChange={this.onChange} placeholder="username"/>
        )
    }

    onChange(event) {
        this.setState({username: event.target.value});
    }
}

export default LoginForm;