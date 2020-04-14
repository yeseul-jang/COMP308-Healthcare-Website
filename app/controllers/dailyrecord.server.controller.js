// Load the module dependencies
const DailyRecord = require('mongoose').model('DailyRecord');
const Patient = require('mongoose').model('User');

//
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

exports.create = function (req, res, next, email) {
    Patient.findOne({email: email}, (err, patient) => {
        if(err) { return getErrorMessage(err);}
        req.email = patient.email;
        console.log(req.email);
    }).then(function () {
    // Create a new instance of the 'DailyRecord' Mongoose model
    var dailyRecord = new DailyRecord(req.body); //get data from ejs page and attaches them to the model
    dailyRecord.patientEmail = email
    console.log("body: " + req.body.patientEmail);


    dailyRecord.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(dailyRecord);
            
        }
    });
})
};


exports.list = function (req, res, next) {

    DailyRecord.find({}, function (err, dailyRecords) {
        if (err) {
            return next(err);
        } else {
            res.json(dailyRecords);
        }
    });
};
//

exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.dailyRecord);
};
//

exports.dailyRecordByID = function (req, res, next, id) {

	DailyRecord.findOne({
        _id: id
	}, (err, dailyRecord) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {

            req.dailyRecord = dailyRecord;
            console.log(dailyRecord);
			// Call the next middleware
			next();
		}
	});
};

exports.readDailyRecords = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.dailyRecords);
};

exports.dailyRecordsByPatient = function (req, res, next, email) {
    Patient.findOne({email: email}, (err, patient) => {
        if(err) { return getErrorMessage(err);}
        req.email = patient.email;
        console.log(req.email);
    }).then(function () {
        DailyRecord.find({
            patientEmail: req.email
        }, (err, dailyRecords) =>{
            if (err) { return getErrorMessage(err); }
            req.dailyRecords = dailyRecords;
            next();
        });
        });
}


exports.update = function(req, res, next) {
    console.log(req.body);
    DailyRecord.findByIdAndUpdate(req.dailyRecord.id, req.body, function (err, dailyRecord) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(dailyRecord);
    });
};

exports.delete = function(req, res, next) {
    DailyRecord.findByIdAndRemove(req.dailyRecord.id, req.body, function (err, dailyRecord) {
      if (err) return next(err);
      res.json(dailyRecord);
    });
};