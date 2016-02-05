/*
 * Contains a model class for an action
 */
class Action extends Object {
    constructor(type, payload){
        super();
        if (type === undefined) {
            throw new Error('Attempted to launch action without a name for action type')
        }
        this.type = type;
        this.payload = payload;
        this.error = false;
    }
}

export default Action;