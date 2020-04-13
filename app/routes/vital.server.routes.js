var users = require('../../app/controllers/user.server.controller');
var vitals = require('../../app/controllers/vital.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.route('/savePatientVital')
        .post(users.requiresLogin, vitals.insertVitalSigns)

    //
    app.route('/detailPatientInfo/:patient')
    .get(vitals.list)

    app.param('patient',vitals.vitalByPatientId);
}

