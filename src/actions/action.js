/*
 * Contains a model class for an action
 */
class Action extends Object {
    constructor(action_type, payload){
        super();
        if (action_type === undefined) {
            throw Error('Attempted to launch action without a name for action type')
        }
        this.action_type = action_type;
        this.payload = payload;
    }
}

export default Action;