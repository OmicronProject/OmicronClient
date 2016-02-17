/**
 * Created by Michal on 2016-02-14.
 */
import clone from './object_cloning';
import log from 'loglevel';

/**
 * Implements a registry for adding reducers, allowing them to be combined into
 * a single reducing function. This reducing function is different from redux's
 * combineReducers as it combines reducers recursively. Each reducer MUST be
 * a function that takes in the arguments of the state and the action, and the
 * reducer MUST return a valid state.
 *
 * This object lives in the app as a singleton.
 *
 * For testing purposes, The class that generates the singleton is exported.
 * This is so that multiple copies of the reducer can be generated, making the
 * unit tests independent of their execution order. In theory, this means that
 * a developer can import this singleton's generating class and make their own
 * reducer. Don't do this.
 */
class Reducer {
    /**
     * Initialize the reducer to be a simple function that takes in the current
     * state and returns this state.
     */
    constructor(){
        this._callback_list = [Reducer.root_reducer];
        this.register = this.register.bind(this);

        this.application_reducer = this.application_reducer.bind(this);

    }

    /**
     * Push a callback onto this reducer's callback list
     * @param {func} callback The callback to add to the reducer. This
     *  must be a function that takes in the state and the action as arguments.
     */
    register(callback){
        this._callback_list.push(callback);
    }

    /**
     * In order to ensure that the reducer is always performing some action on
     * the state, a function is added that simply returns the input state no
     * matter what action is supplied to it.
     *
     * @param {Object} state The initial state that the root reducer will
     *  modify (or rather, will not modify)
     * @param {Object} action A placeholder argument. Ordinarily, this would be
     *  an object containing all the necessary parameters to allow the
     *  application to change from the initial state to the intended final
     *  state. It does nothing in the root reducer, but an action must be
     *  passed in to preserve the (state, action) => (state) mapping.
     * @returns {Object} The state supplied to this reducer
     */
    static root_reducer(state, action){
        return(state);
    }

    /**
     * The main reducer for the entire object. This function is executed by
     * looping over all the callbacks in this object's callback list, and
     * executing each callback with its required arguments. The only thing that
     * should be calling this method is the reducer for the store when the
     * store is created
     *
     * @param {Object} state The initial state that the application reducer
     *  will modify as a result of the action supplied.
     * @param {Object} action An object containing a "type" property to signify
     *  what type of action it is, and which contains all the necessary
     *  parameters to effect the change from the initial state to the desired
     *  application state
     *
     */
    application_reducer(state, action){
        let new_state = clone(state);

        for (let index = 0; index < this._callback_list.length; index++){
            try {
                new_state = this._callback_list[index](new_state, action);
            }
            catch(error){
                log.error('The callback ' + this._callback_list[index] +
                ' produced error ' + error + '.');
                throw(error);
            }

            if (new_state === undefined){
                throw new Error('The callback ' + this._callback_list[index] +
                ' returned an undefined state.')
            }
        }

        return new_state;
    }
}

var reducer = new Reducer();

export default reducer;

export {Reducer};