// @flow

const Strategy = require('passport').Strategy;

import type { User } from './mock-user';

export type MockStrategyOptions = {
    name?: string,
    user?: User,
    passReqToCallback?: true,
};

export type DoneCallback = (error: ?Error, user?: User, info?: any) => void;

export type VerifyFunction =
    | ((req?: Object, user: User, done: DoneCallback) => void)
    | ((user: User, done: DoneCallback) => void);

export interface PassportStrategy {
    name?: string;
    authenticate(req?: Object): any;
}

/**
 * Mock Passport Strategy for testing purposes.
 * @extends Strategy
 */
class MockStrategy extends Strategy implements PassportStrategy {
    /**
     * The MockStrategy constructor.
     *
     * This allows you to test authenticated routes using a mock strategy.
     * It will automatically authenticate a mock user which then allows the
     * functionality of authenticated routes to be tested independent of
     * the authentication process.
     *
     * Note: This strategy is meant for testing purposes only.
     * It provides no actually security.
     *
     * Optionally an `options` object can be passed to custom configure the Strategy.
     * options = {
     *  name: String - The name of the strategy, defaults to 'mock'
     *  user: Object - The mock user to be authenticated, defaults to ./mock-user.js
     *  passReqToCallback: Boolean - When true `req` is the first argument to the
     *                                  verify callback, defaults to false
     * }
     *
     * A `verify` callback can also optionally passed which accepts `user`
     * which is the user that was authenticated and then calls the `done`
     * callback supplying a `user`. Optionally an error can be set as the
     * first argument in `done` if needed for testing.
     *
     * Calling the constructor with no parameters while create a default mock
     * strategy which a mock user exported from `./mock-user.js`.
     *
     *  @param {Object} options
     *  @param {Function} verify
     */
    constructor(
        options?: MockStrategyOptions | VerifyFunction,
        verify?: VerifyFunction
    ) {
        // Allows verify to be passed as the first parameter and options skipped
        if (typeof options === 'function') {
            verify = options;
            options = undefined;
        }

        options = options || {};

        super();
        this.name = options.name || 'mock';
        this._user = options.user || require('./mock-user');
        this._verify = verify;
        this._passReqToCallback = options.passReqToCallback || false;
    }

    /**
     * Authenticate request. Always authenticates successfully by default
     * unless instructed otherwise through `verify` callback that was
     * passed to the constructor.
     *
     * @param {Object} req
     */
    authenticate(req?: Object) {
        const self = this;

        // If no verify callback was specified automatically authenticate
        if (!self._verify) {
            return self.success(self._user, null);
        }

        function verified(error, user, info) {
            if (error) {
                return self.error(error);
            }

            if (!user) {
                return self.fail(info);
            }

            self.success(user, info);
        }

        try {
            if (self._passReqToCallback) {
                self._verify(req, self._user, verified);
            } else {
                self._verify(this._user, verified);
            }
        } catch (e) {
            return self.error(e);
        }
    }
}

module.exports = MockStrategy;
