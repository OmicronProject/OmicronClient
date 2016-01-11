/**
 * Created by Michal on 2016-01-11.
 *
 * Renders a logo on the front page
 */

import React from 'react';

class Logo extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        return(
            <img src={this.props.source}/>
        )
    }
}

export default Logo;
