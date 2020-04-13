const mongoose = require('mongoose');
const User = require('mongoose').model('User');
const Vital = require('mongoose').model('Vital');


exports.insertVitalSigns = function(req, res) {
    const vital = new Vital();

    vital.bodytemperature = req.body.bodytemperature;
    vital.heartrate = req.body.heartrate;
    vital.bloodpressure = req.body.bloodpressure;
    vital.respiratoryrate = req.body.respiratoryrate;
    vital.visitedDate = req.body.visitedDate;
  
    console.log(">>>insert In"+ req.body )
    
    /*
        I've used user._id instead of username because of unique.
        however, i will change it. Just keep in mind
    */
    User.findOne({ _id: req.body.patientUsername }, (err, user) => {

        if (err) { return getErrorMessage(err); }
        //
        req.id = user._id;
        console.log('user._id', req.id);

    }).then(function () {
        vital.patient = req.id
        console.log('req.user(Patient)._id', req.id);

        vital.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(vital);
            }
        });

    });
};

exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.vital);
};

exports.list = function (req, res, next) {
    // Use the 'Student' instance's 'find' method to retrieve a new student document
    console.log(">>>test Id>>>"+ req._id)
    Vital.find({}, function (err, vitals) {
        if (err) {
            return next(err);
        } else {
            res.json(vitals);
        }
    });
};


exports.vitalByPatientId = function(res,req,next,patient) {
    console.log(">>>>>>> vitalByPatientId>> patientId: ", patient);
    Vital.findOne({
        patient: patient
	}, (err, vital) => {
		if (err) {
			return next(err);
		} else {
            req.vital = vital;
            console.log("vital >>>", vital);
			next();
		}
	});
};
