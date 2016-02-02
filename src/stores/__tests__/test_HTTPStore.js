/**
 * Created by Michal on 2016-02-02.
 */
import expect from 'expect';
import HTTPStore from '../HTTPStore';
import dispatcher from '../../dispatcher/Dispatcher';

describe('Tests that HTTPStore is able to process requests', () => {
    let initial_state;

    beforeEach(() => {
        initial_state = {
            url: 'test_url',
            method: 'get',
            timeout: 1000,
            headers: {content_type: "application/json"}
        };
    });

    it('Should accept a dispatcher into its constructor', () => {
        let expected_state = {
            parameters: initial_state,
            response: {}
        };
        let store = new HTTPStore(initial_state);

        expect(store.state).toEqual(expected_state);
    });
});