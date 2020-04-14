// Load the module dependencies
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
var TipSchema = new Schema({
    dailytip: String,
    timestamp: {
        type : String, 
        timestamp: true
    },
    nurse: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


// Configure the 'TipSchema' to use getters and virtuals when transforming to JSON
TipSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Tip' model out of the 'TipSchema'
mongoose.model('Tip', TipSchema);
