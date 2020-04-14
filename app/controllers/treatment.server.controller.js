// Load the module dependencies
const Treatment = require('mongoose').model('Treatment');
const Patient = require('mongoose').model('User');

exports.create = function (req, res, next) {
    var treatment = new Treatment(req.body);
    treatment.save(function (err) {
        if (err) {
			console.log("error");
            return next(err);
        } else {
			console.log(req.body);
            res.json(treatment);
        }
    });
};

exports.list = function (req, res, next) {
    Treatment.find({}, function (err, symptoms) {
        if (err) {
            return next(err);
        } else {
			console.log(symptoms);
            res.json(symptoms);
        }
	});
};

exports.listOnlySymptoms = function (req, res, next) {
    Treatment.find({symptom:{$exists:true}}, {symptom:1}, function (err, symptoms) {
        if (err) {
            return next(err);
        } else {
			console.log(symptoms);
            res.json(symptoms);
        }
	});
};

exports.getTreatment = function (req, res) {
    Treatment.find( {$or: [ { symptom: "Cough" }, { symptom: "Runny/Stuffy Nose" } ]}, function (err, symptoms) {
        if (err) {
            return next(err);
        } else {
			console.log(symptoms.possibleList);
			console.log(symptoms.possibleTreatment);
            res.json(symptoms);
        }
	});
};

exports.findId = function (req, res, givenSymptom) {
    Treatment.find({symptom: givenSymptom}, function (err, symptoms) {
        if (err) {
			console.log("error");
            return next(err);
        } else {
			console.log(symptoms._id);
            res.json(symptoms._id);
        }
	});
};

// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';
	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'Code already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	// Return the message error
	return message;
};
