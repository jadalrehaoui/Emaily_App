const app = require('express')();
const userAPI = require('./user');
const middlewares = require('../middlewares');
app.use('/user', userAPI);
app.use('/*', middlewares.m404);
module.exports = app;
