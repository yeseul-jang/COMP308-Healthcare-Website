var users = require('../../app/controllers/student.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    //signIn / signOut
    app.post('/signin', users.authenticate);
    app.get('/read_cookie', users.isSignedIn);
    app.get('/signout', users.signout);
    app.get('/welcome', users.welcome);

    /*
    // Related to Student
    app.get('/users', users.requiresLogin, users.list);
    app.route('/users/:studentId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete)

    app.param('studentId', users.studentByID);
*/
    app.post('/', users.createUser);
}