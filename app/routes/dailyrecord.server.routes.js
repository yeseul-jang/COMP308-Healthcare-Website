// Load the 'emergencies' controller
var dailyrecords = require('../../app/controllers/dailyrecord.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /emergencies path
    // and list emergencies when /emergencies link is selected
    app.get("/dailyrecords",dailyrecords.list); //go to http://localhost:3000/emergencies to see the list
    //handle a post request made to root path
    // app.post('/emergency/:id', emergencies.create);

    app.route('/dailyrecord/:username')
    .post(dailyrecords.create)

    app.param('username', dailyrecords.create);
    //
    // Set up the 'emergencies' parameterized routes 
	app.route('/dailyrecords/:dailyrecordId')
    .get(dailyrecords.read)
    .put(dailyrecords.update)
    .delete(dailyrecords.delete)

    app.param('dailyrecordId', dailyrecords.dailyRecordByID);

    app.route('/dailyrecords/:patientUsername')
    .get(dailyrecords.readDailyRecords)
    // Set up the 'emergencyId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('patientUsername', dailyrecords.dailyRecordsByPatient);
    
};