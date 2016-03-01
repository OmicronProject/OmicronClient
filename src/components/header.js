/**
 * Created by Michal on 2016-03-01.
 */
import React from 'react';
import { Link } from 'react-router';

export const HeaderNavBar = ({buttons}) => (
    <ul className="nav navbar nav-pills">
        {buttons.map(_make_button)}
    </ul>
);

export const HelloBox = ({username, on_logout_button_click}) => (
    <ul className="nav navbar nav-pills">
        <li key="Username" className="username-header-text">
            Hello {username}
        </li>
        <li key="LogoutButton" role="presentation">
            <a onClick={on_logout_button_click}>
                Logout
            </a>
        </li>
    </ul>
);

export const LoginButton = () => (
    <ul className="nav navbar nav-pills">
        <li key="Login" role="presentation">
            <Link to='/'>Login</Link>
        </li>
    </ul>
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
        <li key={button.key} role="presentation">
            <Link to={button.link}>{button.name}</Link>
        </li>
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
        <li key={button.key} role="presentation">
            <a href={button.link}>{button.name}</a>
        </li>
    )
}