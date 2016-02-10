/*
 * Contains a model class for an action
 */
class Action extends Object {
    constructor(type, payload){
        super();
        this.type = type;
        this.payload = payload;
        this.error = false;
    }
}

class Error extends Action {
    constructor(payload){
        super(payload);
        this.error = true;
    }
}

export default Action;