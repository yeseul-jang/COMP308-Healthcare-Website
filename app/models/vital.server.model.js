// Load the module dependencies
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
var VitalSchema = new Schema({
    bodytemperature: String,
	heartrate: String,
	bloodpressure:String,
	respiratoryrate: String,
    visitedDate:String,
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Vital', VitalSchema);
