const Agent = require('supertest').agent;
const Passport = require('passport').Passport;

const createApp = require('../app');
const {
  MockStrategy,
  createMockStorage,
  setupSerializeAndDeserialize,
} = require('../../src');

const storage = createMockStorage();
const passport = new Passport();

setupSerializeAndDeserialize(passport, null, (id, done) =>
  storage.fetchUser(id).then(user => done(null, user)),
);

passport.use(
  new MockStrategy({ name: 'custom-callback-mock' }, async (user, done) => {
    const existingUser = await storage.fetchUser({ id: user.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = await storage.saveUser({ id: user.id });
    done(null, newUser);
  }),
);

describe('Tests for customized mock strategy', () => {
  const app = createApp(passport, 'custom-callback-mock');
  let agent;

  beforeEach(() => {
    agent = Agent(app);
  });

  it('should authenticate the user', () => {
    return agent.get('/auth/mock').expect(200, { status: 'ok' });
  });

  describe('Test authenticated rotues', () => {
    beforeEach(() => {
      return agent.get('/auth/mock');
    });

    it('should return the current user', () => {
      return agent.get('/current-user').expect(200, { id: '1234' });
    });

    it('should logout the user', () => {
      return agent.get('/logout').then(() => {
        agent.get('/current-user').expect(200, {});
      });
    });
  });
});
