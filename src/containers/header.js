/**
 * Contains a component for creating navigation menus in the app
 *
 * Created by Michal on 2016-02-01.
 */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

/**
 * Templates a navigation header bar that can be updated from the application
 * state
 *
 * @param buttons The buttons to place in the header bar
 * @constructor
 */
export const Header = ({buttons}) => (
    <div id="header_bar" className="container container-fluid">
        <ul className="nav nav-pills">
            {buttons.map(_make_button)}
        </ul>
    </div>
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

export function _make_external(button){
    return(
        <li key={button.key} role="presentation">
            <a href={button.link}>{button.name}</a>
        </li>
    )
}

export function map_header_state_to_props(state){
    return(
        {
            buttons: state.main_menu.buttons
        }
    )
}

const HeaderBar =  connect(map_header_state_to_props)(Header);

export default HeaderBar;