/**
 * Created by Michal on 2016-03-03.
 * Contains the website footer
 */
import React from 'react';
import github_logo from '../../static/img/GitHub-Mark-64px.png';
import {github_repo_url, waffle_url, esdoc_url} from '../../master_config';
import {Panel} from 'react-bootstrap';
import waffle_logo from "../../static/img/waffle-yellow-on-blue.png";

import '../../static/css/components/footer.css';

const Footer = ({}) => (
    <footer className="footer">
        <div className="container-fluid">
            <CollapsibleDeveloperLinks />
        </div>
    </footer>
);

class CollapsibleDeveloperLinks extends React.Component {
    constructor(...args){
        super(...args);
        this.state = {
            open: false
        };
    }

    render(){
        return(
            <div id="developer_resources_links">
                <button className="btn btn-default" onClick={
                    () => {this.setState({open: !this.state.open})}
                }>
                    Developer Resources
                </button>
                <Panel collapsible expanded={this.state.open}>
                    <div className="row">
                    <div className="col-sm-4 col-md-4" id="GitHub_box">
                        <a href={github_repo_url}>
                            <img src={github_logo} alt="GitHub Logo"
                                 id="footer_github_logo" />
                            <span id="footer_github_text" className="footer-text">
                                GitHub
                            </span>
                        </a>
                    </div>
                    <div className="col-sm-4 col-md-4" id="WaffleIO_box">
                        <a href={waffle_url}>
                            <img src={waffle_logo} alt="Waffle IO Logo"
                                 id="waffle_logo" />
                            <span id="footer_waffle_text"
                                  className="footer-text">
                                Waffle
                            </span>
                        </a>
                    </div>
                    <div className="col-sm-4 col-md-4" id="ESDoc_box">
                        <a href={esdoc_url}>
                            <span id="esdoc_logo">ESDoc</span>
                            <span id="esdoc_text" className="footer-text">
                                Documentation
                            </span>
                        </a>
                    </div>
                    </div>
                </Panel>
            </div>
        )
    }
}

export default Footer;