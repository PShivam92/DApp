const sayHello = require('./main.js');

test('string returning hello there jest', () => {
   expect(sayHello()).toMatch('hello there jest');
});