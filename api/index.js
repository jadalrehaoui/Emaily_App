const app = require('express')();
const userAPI = require('./user');
const authAPI = require('./auth');
const stripeAPI = require('./stripe');
const middlewares = require('../middlewares');
app.use('/user', userAPI);
app.use('/auth', authAPI);
app.use('/stripe', middlewares.isAuthenticated, stripeAPI);
app.use('/*', middlewares.m404);
module.exports = app;
