// @flow

import type { NodeApp, PassportInstance } from './mock-utilities';

const Passport = require('passport').Passport;

const MockStrategy = require('./passport-mock-strategy');
const {
    setupDeserializeAndSerialize,
    connectPassport,
} = require('./mock-utilities');

/**
 * Sets up a basic passport configuration using the default MockPassport instance.
 * @param {Object} app - The express server or any other connect style node.js server.
 * @returns {Object} mockPassport - The mock passport instance.
 */
function createMockPassport(app: NodeApp): PassportInstance {
    const mockPassport = new Passport();

    setupDeserializeAndSerialize(mockPassport);
    mockPassport.use(new MockStrategy());
    connectPassport(app, mockPassport);

    return mockPassport;
}

module.exports = createMockPassport;
