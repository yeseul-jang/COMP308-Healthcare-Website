const Tip = require('mongoose').model('Tip');


exports.sendTip = function(req, res) {
    console.log("SEND TIP !!!!");
    console.log(req.body);

    var tip = new Tip();
    tip.nurse = req.body.nurseId;
    tip.patient = req.body.patientId;
    tip.dailytip = req.body.tip;
    tip.timestamp = new Date();

    console.log("tip >> ", tip);

    tip.save((err) => {
        if (err) {
            console.log('tip saving error!! ', getErrorMessage(err))

            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).send({
                message: 'Your daily motivational tip is successfully sent to this patient !'
            });
        }
    });
};


exports.read = function(req, res) {
    console.log("read >>>>> ", req.tips);

    res.status(200).json(req.tips);
};


exports.tipByPatientId = function(req, res, next, patientId) {
    console.log(">>>>>>> tipByPatientId " + patientId);
    
    Tip.find({ patient: patientId }, (err, tips) => {
        if (err) {
            console.log("err >>>", err);
            return next(err);
        }else {

            console.log('>>>> tips ', tips);
            if(tips.length == 0) {
                console.log("tips is null");
            }else {
                req.tips = tips;
                console.log("tipByPatientId tips: ", tips);
                next();
            }
        }     
    }).sort({timestamp: -1}).limit(3).populate('nurse');
};