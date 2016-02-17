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
 */
export const Header = ({buttons}) => (
    <div id="header_bar" className="container container-fluid">
        <ul className="nav nav-pills">
            {buttons.map(_make_button)}
        </ul>
    </div>
);

export function _make_button(button) {
    if (button.type === "internal"){
        return _make_internal(button);
    } else {
        return _make_external(button);
    }
}

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