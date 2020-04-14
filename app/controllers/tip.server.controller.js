const mongoose = require('mongoose');
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
