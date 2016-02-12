/**
 * Contains the base class of the front end.
 */
'use strict';

import React from 'react';
import Logo from './components/logo';
import LoginForm from './containers/login_form';
import HTTPTest from './components/http_cors_test';
import HeaderBar from './containers/header';
import {Router, Route, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Basic template for the application that is responsible for rendering
 * pages, and keeping these pages synchronized with React-Router.
 * The app is composed of a main menu bar that displays navigation buttons, and
 * and the pages to be loaded.
 *
 * Each page is a React component with a unique path, and a key given by the
 * string 'page_<path>'
 *
 * @param {Object} pages: The pages to load. This is taken from the application
 *  state in the method ```map_state_to_app_props```.
 * @param {Object} menu_buttons: The buttons to load in the main menu.
 */

const routes = (pages) => (
    pages.map(make_page)
);

const AppTemplate = ({pages, menu_buttons}) => (
    <Router history={browserHistory}>
        <HeaderBar buttons={menu_buttons}/>
        <div className="container container-fluid">
            {routes(pages)}
        </div>
    </Router>
);

/**
 * Helper method responsible for creating a page. If the page
 * has a sub_pages property, then the function is called recursively on
 * the pages.
 *
 * @param {Object} page the page to load
 * @returns {XML} A route with the component rendered inside
 */
function make_page(page){
    if (page.sub_pages === undefined) {
        return (
            <Route path={page.path} key={"page_" + page.path}
                   component={page.component_to_load}/>
        )
    } else {
        return(
            <Route path={page.path} key={"page_" + page.path}
                   component={page.component_to_load}>
                make_page(page.sub_pages)
            </Route>
        )
    }
}

/**
 * Takes in the current state of the application, and returns an object
 * matching the required props to be passed into the AppTemplate.
 *
 * @param {Object} state The current state of the application
 *
 * @returns {{pages: (*|Array), menu_buttons: Array}}
 */
function map_state_to_app_props(state) {
    return ({
        pages: state.pages,
        menu_buttons: state.main_menu.buttons
    });
}

/**
 * Connect the app to the store
 */
const App = connect(map_state_to_app_props)(AppTemplate);

export default App;