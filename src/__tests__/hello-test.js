import expect from 'expect';

describe('hello', () => {
    it('logs hello to the console', () => {
        var logged_messages = [];
        console.log = function (msg) {
            logged_messages.push(msg);
        };

        require('../hello');

        expect(logged_messages).toEqual(['hello']);
    });
});
