/**
 * Contains a component for creating navigation menus in the app
 *
 * Created by Michal on 2016-02-01.
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { HeaderNavBar, HelloBox } from '../components/header';
import { LoginButton } from '../components/header';
import { Link } from 'react-router';
import { _make_button } from '../components/header';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { show_login_form } from './login_modal';
import logout_user from '../login/logout';

import "../../static/css/components/header.css";

export const Header = ({
        buttons, is_user_authenticated,
        username, on_logout_button_click, on_login_button_click
    }) => {
    let login_component;
    if (is_user_authenticated){
        login_component = <HelloBox
            username={username}
            on_logout_button_click={on_logout_button_click}
            />;
    } else {
        login_component = <LoginButton
            on_login_button_click={on_login_button_click}
        />;
    }

    return(
        <Navbar inverse>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Omicron Labs</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    {buttons.map(_make_button)}
                </Nav>
                <Nav pullRight>
                    {login_component}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

Header.propTypes = {
    on_logout_button_click: PropTypes.func.isRequired,
    on_login_button_click: PropTypes.func.isRequired
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
            is_user_authenticated: state.auth.front_end.has_authenticated,
            username: state.auth.front_end.username
        }
    )
}

export function map_dispatch_to_props(dispatch){
    return ({
        on_logout_button_click: () => {dispatch(logout_user())},
        on_login_button_click: () => {dispatch(show_login_form())}
    })
}

/**
 * Connect the header bar to the store using the state mapper and export it
 */
const HeaderBar = connect(
    map_header_state_to_props, map_dispatch_to_props
)(Header);

export default HeaderBar;
