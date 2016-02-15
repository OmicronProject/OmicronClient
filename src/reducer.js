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

    register(callback){
        this._callback_list.push(callback);
    }

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
     * @param {Object} state: The
     * @param action
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
            }
        }

        return new_state;
    }
}

var reducer = new Reducer();

export default reducer;

export {Reducer};