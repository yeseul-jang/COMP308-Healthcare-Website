// Load the 'emergencies' controller
var emergencies = require('../../app/controllers/emergency.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /emergencies path
    // and list emergencies when /emergencies link is selected
    app.get("/emergencies",emergencies.list); //go to http://localhost:3000/emergencies to see the list
    //handle a post request made to root path
    app.post('/emergency/:id', emergencies.create);
    //
    // Set up the 'emergencies' parameterized routes 
	app.route('/emergencies/:emergencyId')
    .get(emergencies.read)
    .put(emergencies.update)
    .delete(emergencies.delete)

    app.param('emergencyId', emergencies.emergencyByID);

    app.route('/emergencies/:patientId')
    .get(emergencies.readEmergencies)
    // Set up the 'emergencyId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('patientId', emergencies.emergencyByPatient);
    
};