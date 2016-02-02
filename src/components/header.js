/**
 * Created by Michal on 2016-02-01.
 */
import React from 'react';

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
        this.make_button.bind(this);
    }

    make_button(button) {
        return(
            <li key={button.key} role="presentation">
                <a href={button.link}>{button.name}</a>
            </li>
        )
    }

    render() {
        return(
            <ul className="nav nav-pills">
                {this.props.buttons.map(this.make_button)}
            </ul>
        )
    }
}

export default HeaderBar;