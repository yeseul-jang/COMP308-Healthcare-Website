var treatment = require('../../app/controllers/treatment.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    
    app.get('/symptomsList', treatment.list); 
    app.route('/addTreatment').post(treatment.create);
    app.get('/allSymptoms', treatment.listOnlySymptoms);
    app.get('/findTreatment', treatment.getTreatment);
    app.get('/findSymptomID', treatment.findId);
}
