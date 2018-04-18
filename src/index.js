// @flow

const MockStrategy = require('./passport-mock-strategy');
const {
    setupSerializeAndDeserialize,
    connectPassport,
} = require('./mock-utilities');

/**
 * Export MockStrategy.
 */
exports = module.exports = MockStrategy;

exports.MockStrategy = MockStrategy;
exports.Strategy = MockStrategy;

/**
 * Export other modules.
 */
exports.mockUser = require('./mock-user');
exports.setupSerializeAndDeserialize = setupSerializeAndDeserialize;
exports.connectPassport = connectPassport;
exports.createMockPassport = require('./create-mock-passport');
exports.createMockStorage = require('./mock-storage');

/**
 * Export flow types
 */
export type { User } from './mock-user';
export type {
    MockStrategyOptions,
    DoneCallback,
    VerifyFunction,
} from './passport-mock-strategy';
