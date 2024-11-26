const { main } = require('../src/index');

describe('Main entry point', () => {
    test('main function exists', () => {
        expect(typeof main).toBe('function');
    });
}); 