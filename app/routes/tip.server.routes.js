var tips = require('../../app/controllers/tip.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.post('/sendTip', tips.sendTip);

    app.route('/getDailyTips/:patientId')
        .get(tips.read);

    app.param('patientId', tips.tipByPatientId);
}

