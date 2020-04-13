// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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



// Create an instance method for authenticating user
VitalSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the user enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
VitalSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Vital', VitalSchema);
