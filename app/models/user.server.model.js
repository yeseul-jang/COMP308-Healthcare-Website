// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Define a new 'UserSchema'
var UserSchema = new Schema({
    usertype: String,
	password: String,
	firstname:String,
	lastname: String,
	dateOfbirth: String,
	email: {
		type: String,
        // Set an email index
        index: true,        
        unique: true,
        required: 'Email address is required',
        // Validate the email format match: /.+\@.+\..+/
        validate: [validateEmail, 'Please fill a valid email address'],
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
    password:String,
	address:String,
	city:String,
	postalCode:String,
	phoneNumber:String,

});


// Use a pre-save middleware to hash the password
// before saving it into database
UserSchema.pre('save', function(next){
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the user enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);
