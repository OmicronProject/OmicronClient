/*
 * Contains a model class for an action
 */
class Action extends Object {
    constructor(name, callback, payload){
        super();
        this.name = name;
        this.callback = callback;
        this.payload = payload;
    }
}