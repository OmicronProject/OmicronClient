/**
 * Created by Michal on 2016-03-15.
 */
import React from 'react';
import {Panel} from 'react-bootstrap';
import Header from './header';
import Footer from './footer'

import '../../static/css/components/homepage.css';

const HomePage = () => (
    <div id="home_page">
        <Header />
        <div className="container container-fluid">
            <Panel id="homepage_text">
                Omicron Home Page
            </Panel>
        </div>
        <Footer />
    </div>
);

export default HomePage;