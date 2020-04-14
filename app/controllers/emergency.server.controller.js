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
exports.create = function (req, res, next, email) {
    Patient.findOne({email: email}, (err, patient) => {
        if(err) { return getErrorMessage(err);}
        req.email = patient.email;
        console.log(req.email);
    }).then(function () {
    // Create a new instance of the 'Emergency' Mongoose model
    var emergency = new Emergency(req.body); //get data from ejs page and attaches them to the model
    emergency.patientId = email
    console.log("body: " + req.body.emergencyCode);


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

exports.list = function (req, res, next) {

    Emergency.find({}, function (err, emergencies) {
        if (err) {
            return next(err);
        } else {
            res.json(emergencies);
        }
    });
};
//

exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.emergency);
};
//

exports.emergencyByID = function (req, res, next, id) {

	Emergency.findOne({
        _id: id
	}, (err, emergency) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {

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

exports.emergencyByPatient = function (req, res, next, email) {
    Patient.findOne({email: email}, (err, patient) => {
        if(err) { return getErrorMessage(err);}
        req.email = patient.email;
        console.log(req.email);
    }).then(function () {
        Emergency.find({
            patientId: req.email
        }, (err, emergencies) =>{
            if (err) { return getErrorMessage(err); }
            req.emergencies = emergencies;
            next();
        });
        });
}


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

exports.delete = function(req, res, next) {
    Emergency.findByIdAndRemove(req.emergency.id, req.body, function (err, emergency) {
      if (err) return next(err);
      res.json(emergency);
    });
};