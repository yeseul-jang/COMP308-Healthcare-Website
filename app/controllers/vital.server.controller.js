const mongoose = require('mongoose');
const User = require('mongoose').model('User');
const Vital = require('mongoose').model('Vital');


exports.insertVitalSigns = function (req, res) {
    const vital = new Vital();

    vital.bodytemperature = req.body.bodytemperature;
    vital.heartrate = req.body.heartrate;
    vital.bloodpressure = req.body.bloodpressure;
    vital.respiratoryrate = req.body.respiratoryrate;
    vital.visitedDate = req.body.visitedDate;

    console.log(">>>insert In" + req.body)

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




exports.vitalByID = function (req, res, next, id) {
    Vital.findById(id).populate('patient', 'firstName lastName fullName').exec((err, vital) => {if (err) return next(err);
    if (!vital) return next(new Error('Failed to load vital '
            + id));
        req.vital = vital;
        console.log('in vitalById:', req.vital)
        next();
    });
};

exports.delete = function (req, res) {
    const vital = req.vital;
    vital.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(vital);
        }
    });
};

exports.list = function (req, res, next) {
    // Use the 'Student' instance's 'find' method to retrieve a new student document
    console.log(">>>test Id>>>" + req._id)
    Vital.find({}, function (err, vitals) {
        if (err) {
            return next(err);
        } else {
            res.json(vitals);
        }
    });
};


exports.readVitalInfo = function (req, res) {
    console.log("readVitalInfo >>>>> ", req.vitals);
    res.status(200).json(req.vitals);
};


exports.vitalByPatientId = function (req, res, next, patient) {
    console.log(">>>>>>>IN>>>>>>");
    console.log(">>>>>>> vitalByPatientId>> patientId: " + patient);

    Vital.find({ patient: patient }, (err, vitals) => {
        if (err) {
            console.log("err >>>", err);
            return next(err);
        } else {

            console.log('>>>> vitals ', vitals);
            if (vitals.length == 0) {
                console.log("virtal is null");
            } else {
                req.vitals = vitals;
                console.log("vitalByPatientId virtal: ", vitals);
                next();
            }
        }
    });
};
