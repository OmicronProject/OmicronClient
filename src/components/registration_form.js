/**
 * Created by Michal on 2016-02-16.
 * Contains components to work with the registration form
 */
import React from 'react';

const UsernameBox = ({on_change, value, input_status}) => {
    let className;
    let default_className = 'form-group';
    switch (input_status.toUpperCase()){
        case "SUCCESS":
            className = default_className + ' has-success';
            break;
        case "WARNING":
            className = default_className + ' has-warning';
            break;
        case "ERROR":
            className = default_className + ' has-error';
            break;
        default:
            className = default_className;
            break;
    }

    return(
    <div id="registration_uname_box" className={className}>
        <label className="control-label" for="reg_uname_input">Username</label>
        <input id="reg_uname_input" type="text" onchange={on_change}
               className="form-control" placeholder="Username" value={value}
        />
    </div>
    )
};

const PasswordBox = ({on_change, value, input_status}) => {
    let className;
    let default_className = 'form-group';
    switch (input_status.toUpperCase()){
        case "SUCCESS":
            className = default_className + ' has-success';
            break;
        case "WARNING":
            className = default_className + ' has-warning';
            break;
        case "ERROR":
            className = default_className + ' has-error';
            break;
        default:
            className = default_className;
            break;
    }

    return(
        <div id="registration_password_box" className={className}>
            <label className="control-label" for="reg_password_input">Password
            </label>
            <input id="reg_password_input" type="password" onchange={on_change}
                   className="form-control" placeholder="Password"
                   value={value}
            />
        </div>
    )
};

export {UsernameBox, PasswordBox};