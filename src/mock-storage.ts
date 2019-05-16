import { Promise } from 'es6-promise';
import { User } from './mock-user';

export interface MockStorage {
  fetchUser: (id: string) => Promise<User>;
  saveUser: (user: User) => Promise<User>;
}

/**
 * Creates and returns a mock storage object.
 */
export default function createMockStorage(): MockStorage {
  const storage: { [id: string]: User } = {};

  /**
   * Fetches a user with the given id from the storage.
   * @param {String} id - The id of the user to fetch.
   * @returns {Promise} A promise that resolve to a user.
   */
  function fetchUser(id: string): Promise<User> {
    return new Promise(resolve => resolve(storage[id] || null));
  }

  /**
   * Saves a user to a storage and then returns the user.
   * @param user - The user to save to the storage.
   * @returns {Promise<User>} A promise that resolves to a user.
   */
  function saveUser(user: User): Promise<User> {
    return new Promise(resolve => {
      storage[user.id] = { ...user };
      return resolve(user);
    });
  }

  return { fetchUser, saveUser };
}
