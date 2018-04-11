const express = require('express');
const cookieSession = require('cookie-session');

const { createMockPassport } = require('../src');
const app = express();

app.use(
    cookieSession({ maxAge: 2592000000, keys: ['alskfhlsahrtjklal345uwrw'] })
);

const mockPassport = createMockPassport(app);

app.get('/auth/mock', mockPassport.authenticate('mock'), (req, res) => {
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

module.exports = app;
