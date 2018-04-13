const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const Passport = require('passport').Passport;

function createApp(passport) {
    const app = express();

    app.use(
        cookieSession({
            maxAge: 2592000000,
            keys: ['alskfhlsahrtjklal345uwrw'],
        })
    );

    app.use(cookieParser());

    let passportInstance;

    if (passport instanceof Passport) {
        passportInstance = passport;
        app.use(passportInstance.initialize());
        app.use(passportInstance.session());
    } else if (typeof passport === 'function') {
        passportInstance = passport(app);
    } else {
        throw TypeError(
            'Must provide either a passport instance or a function that returns a passport instance.'
        );
    }

    app.get('/auth/mock', passportInstance.authenticate('mock'), (req, res) => {
        res.send({ status: 'ok' });
    });

    app.get('/', (req, res) => {
        res.send({ hello: 'world' });
    });

    app.get('/current-user', (req, res) => {
        res.send(req.user);
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/cookies', (req, res) => {
        res.send(req.cookies);
    });

    return app;
}

module.exports = createApp;
