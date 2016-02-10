/**
 * Created by Michal on 2016-02-10.
 */
import {Action, Error} from './action';

class HTTPSuccessAction extends Action {}

class HTTPFailureAction extends Error {}

export {HTTPSuccessAction, HTTPFailureAction}