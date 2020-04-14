// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreatmentSchema = new Schema({
    symptom: String,
    possibleList: String,
    possibleTreatment: String
});

mongoose.model('Treatment', TreatmentSchema);