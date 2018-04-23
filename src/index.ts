import createMockPassport = require('./create-mock-passport');
import createMockStorage = require('./mock-storage');
import mockUser = require('./mock-user');
import {
    connectPassport,
    setupSerializeAndDeserialize,
} from './mock-utilities';
import MockStrategy = require('./passport-mock-strategy');

/**
 * Export MockStrategy.
 */
const exportModule: any = MockStrategy;
exportModule.MockStrategy = MockStrategy;
exportModule.Strategy = MockStrategy;
exportModule.mockUser = mockUser;
exportModule.setupSerializeAndDeserialize = setupSerializeAndDeserialize;
exportModule.connectPassport = connectPassport;
exportModule.createMockPassport = createMockPassport;
exportModule.createMockStorage = createMockStorage;
export = exportModule;
