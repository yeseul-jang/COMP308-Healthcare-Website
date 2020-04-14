var tips = require('../../app/controllers/tip.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.post('/sendTip', tips.sendTip);
}

