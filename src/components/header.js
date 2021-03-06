/**
 * Created by Michal on 2016-03-01.
 */
import React from 'react';
import { NavItem, NavDropdown, MenuItem, Navbar } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoginForm from '../containers/login_modal';

export const HeaderNavBar = ({buttons}) => (
    <ul className="nav navbar-fixed-top">
        {buttons.map(_make_button)}
    </ul>
);

export const HelloBox = ({username, on_logout_button_click}) => (
    <NavDropdown id="user_options" title={"Signed in as " + username}>
        <MenuItem eventKey={"user_options_1"}
                  onClick={on_logout_button_click}>
            Logout <Glyphicon glyph="log-out"/>
        </MenuItem>
        <LoginForm />
    </NavDropdown>
);

export const LoginButton = ({on_login_button_click}) => (
    <NavItem eventKey={"login_button"} onClick={on_login_button_click}>
        Login
        <LoginForm />
    </NavItem>
);

/**
* Factory for creating a button in the menu. Differentiates between buttons
* pointing to internal links in the single-page application and external
* links to other websites. External links could include a potential Wordpress
* blog for a spin physics wiki authenticated through OAuth 2 (nudge nudge
* wink wink :))
*
* @param {Object} button The button to be made
* @private
*/
export function _make_button(button) {
    if (button.type === "internal"){
        return _make_internal(button);
    } else {
        return _make_external(button);
    }
}

/**
 * Make an internal link to another page in the Omicron Client's SPA, using the
 * Link element provided by react-router.
 *
 * @param {Object} button The button to make
 * @returns {XML} The JSX representation of the link
 * @private
 */
export function _make_internal(button){
    return(
        <LinkContainer key={button.key} to={{pathname: button.link}}>
            <NavItem eventKey={button.key}>
                {button.name}
            </NavItem>
        </LinkContainer>
    )
}

/**
 * Make an external link using React's <a/> tag to do so
 * @param {Object} button The button to make
 * @returns {XML} The JSX representation of the external link
 * @private
 */
export function _make_external(button){
    return(
        <NavItem eventKey={button.key} key={button.key} href={button.link}>
            {button.name}
        </NavItem>
    )
}