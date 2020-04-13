// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//define a new CommentSchema
const EmergencySchema = new Schema({
//
emergencyCode: String,
emergencySubject: String,
description: String,
contactName: String,
contactNumber: String,
creationTime: {type: Date, default: Date.now},
patientId: String,
status: String
})
//
mongoose.model('Emergency', EmergencySchema);