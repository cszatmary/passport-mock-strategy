const mockStorage = require('../../src/mock-storage')();

describe('Mock storage tests', () => {
  it('should add a user to the storage and return a promise that resolves the user', () => {
    const user = { id: '1234', name: 'Foo' };
    return expect(mockStorage.saveUser(user)).resolves.toEqual(user);
  });

  it('should return the user with a matching id', () => {
    return expect(mockStorage.fetchUser('1234')).resolves.toEqual({
      id: '1234',
      name: 'Foo',
    });
  });
});
