/**
 * Contains a component for creating navigation menus in the app
 *
 * Created by Michal on 2016-02-01.
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { HeaderNavBar, HelloBox } from '../components/header';
import { LoginButton } from '../components/header';
import { logout } from '../components/login_form';

import '../../static/css/components/header.css';

export const Header = ({
        buttons, is_user_authenticated,
        username, on_logout_button_click
    }) => {
    let login_component;
    if (is_user_authenticated){
        login_component = <HelloBox
            username={username}
            on_logout_button_click={on_logout_button_click}
            />;
    } else {
        login_component = <LoginButton/>;
    }

    return(
        <div className="container-fluid" id="header_bar">
            <div className="row">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <HeaderNavBar buttons={buttons}/>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    {login_component}
                </div>
            </div>
        </div>
    )
};

Header.propTypes = {
    on_logout_button_click: PropTypes.func.isRequired
};

/**
 * Takes the current application state, and returns an object containing
 * the buttons to render in the menu bar
 *
 * @param {Object} state The current application state
 * @returns {{buttons: string}} the buttons to render
 */
export function map_header_state_to_props(state){
    return(
        {
            buttons: state.main_menu.buttons,
            is_user_authenticated:
                (state.user.auth_status === "authenticated"),
            username: state.user.username
        }
    )
}

export function map_dispatch_to_props(dispatch){
    return ({
        on_logout_button_click: () => (dispatch(logout()))
    })
}

/**
 * Connect the header bar to the store using the state mapper and export it
 */
const HeaderBar = connect(
    map_header_state_to_props, map_dispatch_to_props
)(Header);

export default HeaderBar;
