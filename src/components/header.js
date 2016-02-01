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
        return(<a href={button.link}>{button.name}</a>)
    }

    render() {
        return(
            <div class="container">
                <nav className="navbar-fixed-top">
                    {this.props.buttons.map(this.make_button)}
                </nav>
            </div>
        )
    }
}

export default HeaderBar;