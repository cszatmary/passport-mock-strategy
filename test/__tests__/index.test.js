const Agent = require('jest-supertest-cookie-fix');

const app = require('../app');
const { mockUser } = require('../../src');

describe('Test the default mock strategy created by createMockPassport()', () => {
    let agent;

    beforeEach(() => {
        agent = Agent(app);
    });

    it('should authenticate the user', () => {
        return agent.get('/auth/mock').expect(200, { status: 'ok' });
    });

    it('should return an empty object since the user is not logged in', () => {
        return agent.get('/current-user').expect(200, {});
    });

    describe('Test authenticated routes', () => {
        beforeEach(() => {
            return agent.get('/auth/mock');
        });

        it('should return the current user', () => {
            return agent.get('/current-user').expect(200, mockUser);
        });
    });
});
