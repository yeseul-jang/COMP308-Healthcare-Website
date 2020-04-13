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
// Create a new 'create' controller method; adds a new user
exports.create = function (req, res, next, username) {
    Patient.findOne({username: username}, (err, patient) => {
        if(err) { return getErrorMessage(err);}
        req.username = patient.username;
        console.log(req.username);
    }).then(function () {
    // Create a new instance of the 'DailyRecord' Mongoose model
    var dailyRecord = new DailyRecord(req.body); //get data from ejs page and attaches them to the model
    dailyRecord.patientUsername = username
    console.log("body: " + req.body.patientUsername);

    // Use the 'User' instance's 'save' method to save a new user document
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


//
// Create a new 'list' controller method; returns all users
exports.list = function (req, res, next) {
    // Use the 'User' instance's 'find' method to retrieve a new user document
    DailyRecord.find({}, function (err, dailyRecords) {
        if (err) {
            return next(err);
        } else {
            res.json(dailyRecords);
        }
    });
};
//
//'read' controller method to display a user
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.dailyRecord);
};
//
// 'userByID' controller method to find a user by its id
exports.dailyRecordByID = function (req, res, next, id) {
	// Use the 'User' static 'findOne' method to retrieve a specific user
	DailyRecord.findOne({
        _id: id
	}, (err, dailyRecord) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.user' property
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

exports.dailyRecordsByPatient = function (req, res, next, username) {
    Patient.findOne({username: username}, (err, patient) => {
        if(err) { return getErrorMessage(err);}
        req.username = patient.username;
        console.log(req.username);
    }).then(function () {
        DailyRecord.find({
            patientUsername: req.username
        }, (err, dailyRecords) =>{
            if (err) { return getErrorMessage(err); }
            req.dailyRecords = dailyRecords;
            next();
        });
        });
}

//update a user by id
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
// delete a user by id
exports.delete = function(req, res, next) {
    DailyRecord.findByIdAndRemove(req.dailyRecord.id, req.body, function (err, dailyRecord) {
      if (err) return next(err);
      res.json(dailyRecord);
    });
};