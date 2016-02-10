/*
 * Contains a model class for an action
 */
class Action extends Object {
    constructor(payload){
        super();
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

export {Action, Error}
export default Action