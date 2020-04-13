// Load the module dependencies
const Emergency = require('mongoose').model('Emergency');
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
    // Create a new instance of the 'Emergency' Mongoose model
    var emergency = new Emergency(req.body); //get data from ejs page and attaches them to the model
    emergency.patientId = username
    console.log("body: " + req.body.emergencyCode);

    // Use the 'User' instance's 'save' method to save a new user document
    emergency.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(emergency);
            
        }
    });
})
};


//
// Create a new 'list' controller method; returns all users
exports.list = function (req, res, next) {
    // Use the 'User' instance's 'find' method to retrieve a new user document
    Emergency.find({}, function (err, emergencies) {
        if (err) {
            return next(err);
        } else {
            res.json(emergencies);
        }
    });
};
//
//'read' controller method to display a user
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.emergency);
};
//
// 'userByID' controller method to find a user by its id
exports.emergencyByID = function (req, res, next, id) {
	// Use the 'User' static 'findOne' method to retrieve a specific user
	Emergency.findOne({
        _id: id
	}, (err, emergency) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.user' property
            req.emergency = emergency;
            console.log(emergency);
			// Call the next middleware
			next();
		}
	});
};

exports.readEmergencies = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.emergencies);
};

exports.emergencyByPatient = function (req, res, next, username) {
    Patient.findOne({username: username}, (err, patient) => {
        if(err) { return getErrorMessage(err);}
        req.username = patient.username;
        console.log(req.username);
    }).then(function () {
        Emergency.find({
            patientId: req.username
        }, (err, emergencies) =>{
            if (err) { return getErrorMessage(err); }
            req.emergencies = emergencies;
            next();
        });
        });
}

//update a user by id
exports.update = function(req, res, next) {
    console.log(req.body);
    Emergency.findByIdAndUpdate(req.emergency.id, req.body, function (err, emergency) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(emergency);
    });
};
// delete a user by id
exports.delete = function(req, res, next) {
    Emergency.findByIdAndRemove(req.emergency.id, req.body, function (err, emergency) {
      if (err) return next(err);
      res.json(emergency);
    });
};
