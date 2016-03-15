/**
 * Created by Michal on 2016-03-15.
 */
import React, { PropTypes } from 'react';
import {UsernameBox, PasswordBox} from '../components/login_form';
import SignInButton from '../components/user_control_button';
import Reducer, {reducer_factory} from '../reducer';
import {connect} from 'react-redux';

import { Modal } from 'react-bootstrap';

const LoginFormTemplate = ({is_visible, on_hide}) => (
    <Modal show={is_visible} onHide={on_hide}>
        <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <form>
                    <UsernameBox />
                    <PasswordBox />
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <SignInButton />
        </Modal.Footer>
    </Modal>
);

LoginFormTemplate.PropTypes = {
    is_visible: PropTypes.bool.isRequired,
    on_hide: PropTypes.func.isRequired
};

const map_state_to_login_modal_props = (state) => ({
    is_visible: state.login_form.is_visible
});

const map_dispatch_to_login_modal_props = (dispatch) => ({
    on_hide: () => {dispatch(hide_login_form())}
});

const HIDE_LOGIN_FORM = "HIDE_LOGIN_FORM";

const hide_login_form = () => ({type: HIDE_LOGIN_FORM});

const hide_login_form_reducer = (state) => {
    state.login_form.is_visible = false;
};

Reducer.register(reducer_factory(HIDE_LOGIN_FORM)(hide_login_form_reducer));

const LoginForm = connect(map_state_to_login_modal_props,
    map_dispatch_to_login_modal_props)(LoginFormTemplate);

export default LoginForm;

const SHOW_LOGIN_FORM = 'SHOW_LOGIN_FORM';

export const show_login_form = () => ({type: SHOW_LOGIN_FORM});

const show_login_form_reducer = (state) => {
    state.login_form.is_visible = true;
};

Reducer.register(reducer_factory(SHOW_LOGIN_FORM)(show_login_form_reducer));