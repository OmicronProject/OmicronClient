/**
 * Contains the application dispatcher. This object registers
 * all Flux actions, and sends them out to action handlers.
 *
 * Created by Michal on 2015-12-09.
 */
'use strict';
import Promise from 'promise';

class Dispatcher {

    constructor() {
        this._callbacks = [];
    }

    register(callback) {
        this._callbacks.push(callback);
    }

    get_number_of_callbacks(){
        return this._callbacks.length;
    }

    dispatch(payload) {
        let resolves = [];
        let rejects = [];

        this._callbacks.map((_, index) => {
                return new Promise((resolve, reject) => {
                    resolves[index] = resolve;
                    rejects[index] = reject;
                });
        });

        this._callbacks.forEach((callback, i) => {
            Promise.resolve(callback(payload)).then(
                () => {resolves[i](payload)},
                () => {rejects[i](new Error('Dispatcher callback fail'));}
            );
        });
    }
}

export default Dispatcher;