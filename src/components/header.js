/**
 * Contains a class for making top-level navigation bars in the web page
 *
 * Created by Michal on 2016-02-01.
 */
import React from 'react';
import {Link} from 'react-router';

/**
 * Responsible for rendering the header bar, corresponding to the available
 * top-level navigation options. Can work inside the application space as well
 * if necessary. In that case, it is recommended to subclass it and apply
 * css appropriately
 */
class HeaderBar extends React.Component {
    /**
     * Constructs an instance of the bar
     * @param {object} props: The buttons to be rendered, passed in as an
     *  object of the form
     *      @example
     *          <HeaderBar buttons={
     *              [{name: "button", link: "#", key: "button1"}]
     *              }
     *          />
     *
     */
    constructor(props) {
        super(props);
        this.props = props;
        this._make_button = this._make_button.bind(this);
        this._make_internal = this._make_internal.bind(this);
        this._make_external = this._make_external.bind(this);
    }

    /**
     * Parses a subsection of the header's props, using them to build a
     * navigation button
     *
     * @param {Object} button: The button that is to be made, of the form
     *  @example
     *      { name: "Button name", link: "#", key: "Key1" }
     * @returns {XML} The JSX code responsible for creating the button
     */
    _make_button(button) {
        if ((button.type === undefined) || (button.type === 'internal')) {
            return (this._make_internal(button));
        } else {
            return (this._make_external(button));
        }
    }

    _make_internal(button) {
        return(
            <li key={button.key} role="presentation">
                <Link to={button.link}>{button.name}</Link>
            </li>
        )
    }

    _make_external(button) {
        return(
            <li key={button.key} role="presentation">
                <a href={button.link}>{button.name}</a>
            </li>
        )
    }

    /**
     * Write the navbar into the DOM
     * @returns {XML} JSX responsible for making the navbar
     */
    render() {
        return(
            <div>
                <ul className="nav nav-pills">
                    {this.props.buttons.map(this._make_button)}
                </ul>
            </div>
        )
    }
}

export default HeaderBar;