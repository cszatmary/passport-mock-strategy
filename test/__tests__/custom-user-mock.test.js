const Agent = require('jest-supertest-cookie-fix');
const Passport = require('passport').Passport;

const createApp = require('../app');
const { MockStrategy } = require('../../src');

const passport = new Passport();
const user = {
    id: 'abcd',
    name: { familyName: 'Doe', givenName: 'John' },
    age: 30,
    provider: 'custom-user-mock',
};

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    if (id === user.id) {
        done(null, user);
    } else {
        done(new Error(`No such user with id ${id}`));
    }
});

passport.use(
    new MockStrategy({
        name: 'custom-user-mock',
        user,
    })
);

describe('Test mock strategy with a custom user object', () => {
    const app = createApp(passport, 'custom-user-mock');
    let agent;

    beforeEach(() => {
        agent = Agent(app);
    });

    it('should authenticate the user', () => {
        return agent.get('/auth/mock').expect(200, { status: 'ok' });
    });

    describe('Test authenticated routes', () => {
        beforeEach(() => {
            return agent.get('/auth/mock');
        });

        it('should return the current user', () => {
            return agent.get('/current-user').expect(200, user);
        });

        it('should logout the user', () => {
            return agent.get('/logout').then(() => {
                agent.get('/current-user').expect(200, {});
            });
        });
    });
});
