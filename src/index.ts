import createMockPassport = require('./create-mock-passport');
import createMockStorage = require('./mock-storage');
import mockUser = require('./mock-user');
import { User } from './mock-user';
import {
  connectPassport,
  setupSerializeAndDeserialize,
} from './mock-utilities';
import Strategy = require('./passport-mock-strategy');

/**
 * Export MockStrategy.
 */
declare namespace MockStrategy {
  export type Export = typeof Strategy & {
    MockStrategy: typeof Strategy;
    Strategy: typeof Strategy;
    mockUser: User;
    setupSerializeAndDeserialize: typeof setupSerializeAndDeserialize;
    connectPassport: typeof connectPassport;
    createMockPassport: typeof createMockPassport;
    createMockStorage: typeof createMockStorage;
  };
}

const exportModule: any = Strategy;
exportModule.MockStrategy = Strategy;
exportModule.Strategy = Strategy;
exportModule.mockUser = mockUser;
exportModule.setupSerializeAndDeserialize = setupSerializeAndDeserialize;
exportModule.connectPassport = connectPassport;
exportModule.createMockPassport = createMockPassport;
exportModule.createMockStorage = createMockStorage;
export = exportModule as MockStrategy.Export;
