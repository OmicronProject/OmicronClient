var expect = require('expect');

describe('hello', function(){
    it('logs hello to the console', function(){
        var logged_messages = [];
        console.log = function (msg) {
            logged_messages.push(msg);
        };

        require('../hello');

        expect(logged_messages).toEqual(['hello']);
    });
});
