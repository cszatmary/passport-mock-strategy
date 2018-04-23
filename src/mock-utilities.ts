import { Application } from 'express';
import * as passportModule from 'passport';

import { User } from './mock-user';
import mockUser = require('./mock-user');

export type SerializeFn = (
    user: User,
    done: (error: any, id: string) => void
) => void;
export type DeserializeFn = (
    id: string,
    done: (error: any, user?: User) => void
) => void;

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
export function setupSerializeAndDeserialize(
    passport: passportModule.Authenticator,
    serializeFn?: SerializeFn,
    deserializeFn?: DeserializeFn
) {
    passport.serializeUser(serializeFn || defaultSerialize);
    passport.deserializeUser(deserializeFn || defaultDeserialize);
}

/**
 * Initializes the passport instance and connects it to the given node app.
 * @param {Object} app A node app to connect the passport instance to.
 * @param {Passport} passport The passport instance.
 */
export function connectPassport(
    app: Application,
    passport: passportModule.Authenticator
) {
    app.use(passport.initialize());
    app.use(passport.session());
}
