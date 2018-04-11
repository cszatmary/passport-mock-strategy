const Passport = require('passport').Passport;

const MockStrategy = require('./passport-mock-strategy');
const mockUser = require('./mock-user');

/**
 * Sets up a basic passport configuration using the default MockPassport instance.
 * @param {Object} app - The express server or any other connect style node.js server.
 * @returns {Object} mockPassport - The mock passport instance.
 */
function createMockPassport(app) {
    const mockPassport = new Passport();

    mockPassport.serializeUser((user, done) => done(null, user.id));
    mockPassport.deserializeUser((id, done) => {
        if (id === mockUser.id) {
            done(null, mockUser);
        } else {
            done(new Error(`No such user with id ${id}`));
        }
    });

    mockPassport.use(new MockStrategy());

    app.use(mockPassport.initialize());
    app.use(mockPassport.session());

    return mockPassport;
}

module.exports = createMockPassport;
