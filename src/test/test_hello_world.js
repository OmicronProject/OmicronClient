/**
 * Created by Michal on 2015-11-17.
 */

import HelloWorld from '../hello_world';
import Qunit from '../../node_modules/qunitjs/qunit/qunit';

Qunit.module('Test the Hello World element');

Qunit.test('This should work', assert => {

    const name = 'World';
    const props = {name: name};

    var module = HelloWorld(props);

    assert.equal(module.text, 'Hello, ' + name + '!')

});