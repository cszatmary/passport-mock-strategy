// @flow

import type { User } from './mock-user';
import type { PassportStrategy } from './passport-mock-strategy';

const mockUser = require('./mock-user');

export type SerializeFn = (
    user: User,
    done: (error: any, id: string) => void
) => void;
export type DeserializeFn = (
    id: string,
    done: (error: any, user?: User) => void
) => void;

export interface NodeApp {
    use(middleware: any): NodeApp;
}

export interface PassportInstance {
    use(strategy: PassportStrategy): PassportInstance;
    serializeUser(fn: SerializeFn): void;
    deserializeUser(fn: DeserializeFn): void;
    initialize(options?: any): any;
    session(options?: any): any;
}

const defaultSerialize = (user: User, done: (error: any, id: string) => void) =>
    done(null, user.id);

const defaultDeserialize = (
    id: string,
    done: (error: any, user?: User) => void
) => {
    if (id === mockUser.id) {
        done(null, mockUser);
    } else {
        done(new Error(`No such user with id ${id}`));
    }
};

/**
 * Sets up user serialization and deserialization for a given passport instance.
 * @param {Passport} passport The passport instance to use.
 * @param {Function} deserializeFn A custom deserialization function, otherwise the default will be used.
 * @param {Function} serializeFn A custom serialization function, otherwise the default will be used.
 */
function setupDeserializeAndSerialize(
    passport: PassportInstance,
    deserializeFn: DeserializeFn = defaultDeserialize,
    serializeFn: SerializeFn = defaultSerialize
) {
    passport.serializeUser(serializeFn);
    passport.deserializeUser(deserializeFn);
}

/**
 * Initializes the passport instance and connects it to the given node app.
 * @param {Object} app A node app to connect the passport instance to.
 * @param {Passport} passport The passport instance.
 */
function connectPassport(app: NodeApp, passport: PassportInstance) {
    app.use(passport.initialize());
    app.use(passport.session());
}

exports.setupDeserializeAndSerialize = setupDeserializeAndSerialize;
exports.connectPassport = connectPassport;
