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
        req.email = email;
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
        req.email = email;
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





exports.dailyRecordsByPatient2 = function (req, res, next, email) {

    console.log("dailyRecordsByPatient 222222 IN >>>>> ", email);

    Patient.findOne({email: email}, (err, patient) => {
        if(err) { return getErrorMessage(err);}
        req.email = email;
        console.log(req.email);
    }).then(function () {
        DailyRecord.find({
            patientEmail: req.email
        }, (err, dailyRecords) =>{
            if (err) { return getErrorMessage(err); }
            req.dailyRecords = dailyRecords;
            next();
        }).sort({creationTime: -1});
    });
}




//
exports.trainAndPredict = function (req, res) {
    console.log("================= trainAndPredict req.dailyRecords >>>> ", req.dailyRecords);



    const tf = require('@tensorflow/tfjs');
    require('@tensorflow/tfjs-node');
    //load iris training and testing data
    const record = require('../../record_train.json');
    // const recordTesting = require('../../record_test.json');
    // console.log(recordTesting)
    //
    //

    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    const trainingData = tf.tensor2d(record.map(item => [
        item.body_temperature,
        item.heart_rate,
        item.systolic_pressure,
        item.diastolic_pressure,
        item.respiratory_rate
    ]))
    // console.log('trainingData >>> ', trainingData);
    //
    //tensor of output for training data
    console.log("trainingData >>>>> ", trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // status 1:       1,0
    // status 2:       0,1
    const outputData = tf.tensor2d(record.map(item => [
        item.status === 1 ? 1 : 0,
        item.status === 2 ? 1 : 0
    ]))
    console.log("outputData >>>> ", outputData.dataSync())

    //
    //tensor of features for testing data
    const testingData = tf.tensor2d(req.dailyRecords.map(item => [
        item.temperature,
        item.pulseRate,
        item.systolicPressure,
        item.diastolicPressure,
        item.respiratoryRate
    ]))
    console.log("testingData.dataSync() >>>> ", testingData.dataSync())

    testingData.array().then(array => {
        console.log("array >>>> ", array)
    })

    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [5], // 19 input neurons (features)
        activation: "sigmoid",
        units: 30, //dimension of output space (first hidden layer)
    }))
    //add the first hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 15, //dimension of final output (die or live)
    }))
    //add the first hidden layer
    model.add(tf.layers.dense({
        inputShape: [15], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 2, //dimension of final output (die or live)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 2, //dimension of final output
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        //categoricalCrossentropy
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.003),
        metrics: ['accuracy'],
    })
    // train/fit the model for the fixed number of epochs
    const startTime = Date.now()
    //
    async function run() {
        const startTime = Date.now()
        await model.fit(trainingData, outputData,
            {
                epochs: 1000,
                callbacks: {
                    onEpochEnd: async (epoch, log) => {
                        // console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        // console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }

        ) //fit
        //
        const results = model.predict(testingData);
        results.print()
        console.log('prediction results: ', results.dataSync())
        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        results.array().then(array => {
            console.log(array)
            var resultForTest1 = array[0];
            var resultForTest2 = array[1];
            var resultForTest3 = array[2];
            // var dataToSent = {row1: resultForTest1,row2: resultForTest2, row3: resultForTest3}
            // console.log('dataToSent >>>>>>>>>>>>> \n' ,dataToSent);
            
            var dangerCount = 0;
            if(resultForTest1[0] < resultForTest1[1]) {
                dangerCount++;
            }
            if(resultForTest2[0] < resultForTest2[1]) {
                dangerCount++;
            }
            if(resultForTest3[0] < resultForTest3[1]) {
                dangerCount++;
            }

            console.log("dangerCount >> ", dangerCount);

            var status;
            if(dangerCount > 1) {
                status = 'danger';
            }else {
                status = 'ok';
            }            
            res.status(200).send(status);
        })
    } //end of run function
    run()
    //

};