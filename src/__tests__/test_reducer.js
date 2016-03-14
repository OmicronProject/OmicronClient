/**
 * Created by Michal on 2016-02-14.
 * Unit tests the main application reducer
 */
'use strict';
import expect from 'expect';
import clone from '../object_cloning';
import {Reducer, reducer_factory} from '../reducer';

describe('Reducer', () => {
    let reducer;

    beforeEach(()=>{
        reducer = new Reducer();
    });

    it('Should add the root reducer to the callback list on construction',
        ()=>{
            expect(reducer._callback_list).toEqual([Reducer.root_reducer]);
    });

    it("should accept a callback to register into the callback list", () => {
        let callback = (state, action) => ('Test completed successfully');

        reducer.register(callback);

        expect(reducer._callback_list).toEqual([Reducer.root_reducer, callback]);
    });
});

describe("Root reducer", () => {
    it('Should return the input state regardless of what is thrown in as' +
        'an action', () => {
        let state = {foo: "bar"};
        let new_state = Reducer.root_reducer(state, {action: 'this is an action'});

        expect(new_state).toEqual(state);
    });
});


describe("The reducer's application reducer", () => {{
    let test_reducer;
    let reducer_store;

    beforeEach(()=> {
        reducer_store = new Reducer();

        test_reducer = (state, action) => {
            if (action.type === "EXECUTE_TEST_ACTION") {
                let new_state = clone(state);
                new_state.added_property = "added string";

                console.log('new_state ' + new_state);
                return(new_state);
            }
        };
    });

    it('should accept a callback into the app reducer and execute it', () => {
        reducer_store.register(test_reducer);

        let state = {};
        let new_state = reducer_store.application_reducer(
            state, {type:"EXECUTE_TEST_ACTION"}
        );

        expect(new_state.added_property).toEqual(
            "added string"
        );
    });

    it('should log and rethrow an error if one occurs in a component reducer',
        () => {
            let state = {};
            let poisoned_reducer = () => {
                throw new Error("unable to finish")
            };

            let action = {
                type: "SHOULD_THROW_AN_ERROR"
            };

            reducer_store.register(poisoned_reducer);

            expect(() => {reducer_store.application_reducer(state, action)}).toThrow(
                Error
            );
        })
}});

describe("reducer_factory", () => {
    let state;
    let action_type;
    let action;
    let mutator;

    beforeEach(() => {
        state = {};
        action_type = "TEST_REDUCER_FACTORY";
        action = {type: action_type, data: "this is some new data"};
        mutator = (state, action) => {state.data = action.data};
    });

    it("Should decorate a mutator and return a function", () => {
        expect(reducer_factory(action_type)(mutator)).toBeA("function");
    });

    it("Should call the mutator if the action is of the correct type", () => {
        let confirm_message = "the mutator was called";

        let mutator = (state, action) => {state.message = confirm_message};

        expect(reducer_factory(action_type)(mutator)(state, action)).toEqual(
            {message: confirm_message}
        );
    });

    it("Should return the old state if the incorrect action type is supplied", () => {
        let bad_action = "INVALID_ACTION";
        let message = "The reducer was called";

        let mutator = (state, action) => {state.message = message};

        expect(reducer_factory(action_type)(mutator)(
            state, {type: bad_action})
        ).toEqual(state);
    });

    it("Should deep-copy the state", () => {
        let new_state = reducer_factory(action_type)(mutator)(state, action);
        expect(new_state).toNotEqual(state);
        expect(new_state.data).toEqual(action.data);
    })
});
