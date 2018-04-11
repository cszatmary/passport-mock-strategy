const request = require('supertest');

const app = require('../app');
const { mockUser } = require('../../src');

const agent = request.agent(app);

describe('Test the default mock strategy created by createMockPassport()', () => {
    it('should authenticate the user', () => {
        return agent.get('/auth/mock').expect(200, { status: 'ok' });
    });

    it('should return an empty object since the user is not logged in', () => {
        return agent.get('/current-user').expect(200, {});
    });

    describe('Test authenticated routes', () => {
        beforeEach(done => {
            agent.get('/auth/mock').end(() => done());
        });

        it('should return the current user', () => {
            return agent.get('/current-user').expect(200, mockUser);
        });
    });
});
