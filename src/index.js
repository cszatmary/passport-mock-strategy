// @flow

const MockStrategy = require('./passport-mock-strategy');

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
exports.createMockPassport = require('./create-mock-passport');

/**
 * Export flow types
 */
export type { User } from './mock-user';
export type {
    MockStrategyOptions,
    DoneCallback,
    VerifyFunction,
} from './passport-mock-strategy';
