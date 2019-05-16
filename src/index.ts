import MockStrategy from './passport-mock-strategy';

/**
 * Export everything.
 */
export { default as createMockPassport } from './create-mock-passport';
export { default as createMockStorage } from './mock-storage';
export { default as mockUser, User } from './mock-user';
export {
  connectPassport,
  setupSerializeAndDeserialize,
} from './mock-utilities';
export { MockStrategy, MockStrategy as Strategy };
export default MockStrategy;

/**
 * Assign to module.exports for commonjs compatibility
 */
module.exports = MockStrategy;
Object.assign(module.exports, exports);
