var users = require('../../app/controllers/user.server.controller');
var vitals = require('../../app/controllers/vital.server.controller');

module.exports = function (app) {
    app.route('/savePatientVital')
        .post(users.requiresLogin, vitals.insertVitalSigns)

    //
    app.route('/detailPatientInfo/:patient')
        .get(vitals.readVitalInfo);

    app.param('patient', vitals.vitalByPatientId);
}

