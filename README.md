# passport-mock-strategy

Mock passport strategy for testing a Node.js application.

This module allows you to create and authenticate a fake user in a Node application to allow for easy testing of routes. Authenticated routes can then be tested for their functionality with the assumption that the user has been authenticated.

## Install

Install using `yarn`:

```bash
$ yarn add passport-mock-strategy --dev
```

Or use `npm` if you wish:

```bash
$ npm install passport-mock-strategy --save-dev
```

## Usage

To get started you can import `MockStrategy` and create a new instance.

```javascript
const MockStrategy = require('passport-mock-strategy');
...
passport.use(new MockStrategy());
```

You can configure and customize mock strategy by passing options and/or a callback:

```javascript
passport.use(new MockStrategy({
	name: 'my-mock',
	user: customUserObject
}, (user, done) => {
	// Perform actions on user, call done once finished
}));

```

You can then use `passport.authenticate()` specifying the strategy name to authenticate requests. By default the strategy name is `mock`.

```javascript
app.get('/auth/mock', passport.authenticate('mock'));
```

### Quick Setup
`passport-mock-strategy` exports various convenience functions that can be used to quickly and easily setup a mock passport instance.

You can use `createMockPassport()` to setup an instance of passport that uses `MockStrategy` and connect it to your Node app.

```javascript
createMockPassport(app);
```
### Serializate and Deserializate User

`setupSerializeAndDeserialize` provides an easily way to setup the `serializeUser` and `deserializeUser` methods for passport. You can pass null to use the default.

```javascript
setupSerializeAndDeserialize(passport, null, (id, done) => {
	// custom deserializeUser function
});
```
Here a custom `deserializeUser` function is passed, whereas null is passed for `serializeUser` which means the default will be used.

### Connect Passport to app
The `connectPassport` function initializes a given passport instance and connects it to the given app.

```javascript
connectPassport(app, passport);
// Calls passport.initialize() and passport.session() internally
```

### Mock User and Storage
`mockUser` is exported which is the default user that `MockStrategy` uses internally. `createMockStorage()` is also exported which creates a mock storage that saves and fetches users asynchronously to mimic fetching from a database.

## How it works
MockStrategy always authenticates a mock user when called. This user is either the default exported from mock-user.js or a custom user object that can be passed as an option when initializing a new instance of `MockStrategy`. Calling passport.authenticate('mock') will then authenticate this mock user. Additionally it will store the user in the app's session which can then be retreived through the use of either [express-session](https://github.com/expressjs/session) or [cookie-session](https://github.com/expressjs/cookie-session).

This method makes it easy to test the functionality of authenticated routes with the assumption that the user has already been authenticated.

## Type Checking
This package is written in [typescript](https://www.typescriptlang.org/). All type declarations are published with the package and can be used as needed.

Type definitions are also provided for [flow](https://flow.org/). They can be imported for use.

Example:

```javascript
// @flow

import type { MockStrategyOptions } from 'passport-mock-strategy';

const options: MockStrategyOptions = { name: 'my-mock' };
```

## Important Note
This package is for testing purposes only! Please do not use this for actual authentication as it provides no security whatsoever!

## License
passport-mock-strategy is available under the [MIT License](https://github.com/cszatma/passport-mock-strategy/tree/master/LICENSE).

## Contributing
Contributions are welcome. Feel free to open an issue or submit a pull request.
