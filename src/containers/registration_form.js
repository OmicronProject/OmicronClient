/**
 * Created by Michal on 2016-02-16.
 */
import {UsernameBox} from '../components/registration_form';
import Reducer from '../reducer';

const RegistrationFormTemplate = (
    {on_username_change, username_value, username_status, password_status,
        password_value, on_password_change}
) => (
    <form>
        <UsernameBox on_change={on_username_change} value={username_value}
                     input_status={username_status} />
        <PasswordBox onchange={on_password_change} value={password_value}
                     input_status={password_status} />
    </form>
);

function map_state_to_props(state) {
    return(
    {
        username_value: state.registration_form.username,
        password_value: state.registration_form.password
    }
    )
}


