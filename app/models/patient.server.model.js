// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//define a new CommentSchema
const PatientInfoSchema = new Schema({
    //
    bodytemp: String,
    heartrate: String,
    bloodpressure: String,
    respiratoryrate: String,
    visitdate:String,

    userList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
//
mongoose.model('PatientRecord', PatientInfoSchema);