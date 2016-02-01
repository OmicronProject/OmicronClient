/**
 * Created by Michal on 2016-01-16.
 * Contains a store for User Data, including username, authentication token,
 */

'use strict';

import React from 'react';
import dispatcher from '../dispatcher/Dispatcher';

export default class UserData extends React.Component {
    constructor(dispatch=dispatcher) {
        this.dispatch = dispatch;
    }
}