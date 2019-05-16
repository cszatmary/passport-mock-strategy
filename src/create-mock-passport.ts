import { Application } from 'express';
import passport from 'passport';

import {
  connectPassport,
  setupSerializeAndDeserialize,
} from './mock-utilities';
import MockStrategy from './passport-mock-strategy';

/**
 * Sets up a basic passport configuration using the default MockPassport instance.
 * @param {Object} app - The express server or any other connect style node.js server.
 * @returns {Object} mockPassport - The mock passport instance.
 */
function createMockPassport(app: Application): passport.Authenticator {
  const mockPassport = new passport.Passport();

  setupSerializeAndDeserialize(mockPassport);
  mockPassport.use(new MockStrategy());
  connectPassport(app, mockPassport);

  return mockPassport;
}

export default createMockPassport;
