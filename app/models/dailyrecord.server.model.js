// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyRecordSchema = new Schema({
    //
    pulseRate: Number,
    bloodPressure: Number,
    weight: Number,
    temperature: Number,
    respiratoryRate: Number,
    patientEmail: String,
    nurseUsername: String,
    creationTime: {type: Date, default: Date.now},
});
//
mongoose.model('DailyRecord', DailyRecordSchema);