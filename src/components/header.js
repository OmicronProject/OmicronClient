/**
 * Created by Michal on 2016-02-01.
 */
import React from 'react';

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.make_button.bind(this);
    }

    make_button(button) {
        return(
            <li role="presentation">
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