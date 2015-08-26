/**
 * QuestionController
 *
 * @author      :: Sunil Hirole
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    create: function(req, res) {

        console.log('-------jobid in create---------', req.body.jobid, req.body.timeperques);
        console.log('------in create--------', req.body);
        var reqStr = JSON.stringify(req.body);
        var arrObject = JSON.parse(reqStr);
        for (var i = 0; i < arrObject.question.length; i++) {
            var object = arrObject.question[i].question;
            console.log('---object---------', object);
            Question.create({
                question: object,
                jobid: req.body.jobid
            }, function questionCreated(err, newQuestion) {
                if (err) {
                    console.log("err: ", err);
                    console.log("err.invalidAttributes: ", err.invalidAttributes);
                    // Otherwise, send back something reasonable as our error response.
                    return res.negotiate(err);
                }


            });

        }
        /*Job.update({
            id: req.body.jobid
           },{timeperques:req.body.timeperques,quespertest:req.body.quespertest}
           , function(err, users) {
           // Error handling
           if (err) {
           return console.log(err);
           // Updated users successfully!
           } 
        });*/
        Job.update({
            id: req.body.jobid
        }, {
            timeperques: req.body.timeperques,
            quespertest: req.body.quespertest
        }).exec(function(e1, r1) {
            return res.ok();
        });
        return res.ok();
    }

};