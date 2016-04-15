/**
 * Created by Michal on 2016-03-15.
 */
import React, {PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import Header from './../containers/header';
import Footer from './../containers/footer';
import {show_login_form} from './../containers/login_modal';
import { connect } from 'react-redux';
import Calendar from './welcome_calendar';

import '../../static/css/components/homepage.css';

const LoginButtonTemplate = ({on_click}) => (
    <button type="button" className="btn btn-success"
            onClick={on_click}
    >Log In
    </button>
);

LoginButtonTemplate.PropTypes = {
    on_click: PropTypes.func.isRequired
};

const map_state_to_button_props = (state) => ({});

const map_dispatch_to_login_props = (dispatch) => ({
    on_click: () => {dispatch(show_login_form())}
});

const LoginButton = connect(map_state_to_button_props,
    map_dispatch_to_login_props)(
    LoginButtonTemplate
);

const HomePage = () => (
    <div id="home_page">
        <Header />
        <div className="container container-fluid">
            <Panel id="homepage_text">
                Omicron Home Page
            </Panel>
            <LoginButton />
            <Calendar />
        </div>
        <Footer />
    </div>
);

export default HomePage;
