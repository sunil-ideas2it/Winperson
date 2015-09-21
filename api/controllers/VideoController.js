/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var randomstring = require("randomstring");
var videoStringName;
module.exports = {

    uploadvideo: function(req, res) {
      console.log('------------update-----',req.body);
        var buf = new Buffer(req.body.blob, 'base64'); // decode
        //console.log('---buffer--------',buf);
          videoStringName = randomstring.generate(8);
          console.log('----videoStringName-------',videoStringName);
          fs.writeFile("temp/" + videoStringName+".mp4", buf, function(err) {
            if(err) {
              console.log("err", err);
            }
          }) 
     console.log('-----------Answer Foder----------');
      Invite.findOne({
            jobid: req.body.id
        }).exec(function findOneCB(err, applicantAnswer) {
            if (err) {
                alert('Sorry!!!! Job ID not Found');
                return res.notFound();
            }
            if(applicantAnswer){
              Answer.create({
                    applicantName: applicantAnswer.firstname + ' ' + applicantAnswer.lastname,
                    applicantEmail: applicantAnswer.emailid,
                    question: req.body.question,
                    videoFileName: videoStringName,
                    jobId: req.body.id
                    },function answerCreated(err, Answers) {
                        if (err) {
                            console.log(Answers);
                            console.log("err: ", err);
                            console.log("err.invalidAttributes: ", err.invalidAttributes)


                            // Otherwise, send back something reasonable as our error response.
                            return res.negotiate(err);
                        }

                        // Send back the id of the new user
                        return res.json(Answers);
                    });
                }
              
            
            
        });

  }    
};