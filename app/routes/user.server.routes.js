var users = require('../../app/controllers/user.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    //signIn / signOut
    app.post('/signin', users.authenticate);
    app.get('/read_cookie', users.isSignedIn);
    app.get('/signout', users.signout);
    app.get('/welcome', users.welcome);
    app.post('/', users.createUser);
}