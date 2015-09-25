/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
var randomstring = require('randomstring');
var videoStringName;
module.exports = {

  uploadvideo: function(req, res) {
    var buf = new Buffer(req.body.blob, 'base64');
    var videoStringName = randomstring.generate(8);
    fs.writeFile('assets/video/' + videoStringName + '.mp4', buf, function(err) {
      if (err) {
        console.log('err', err);
      }
    });


    User.findOne({
      id: req.body.userId,

    }).exec(function findOneCB(err, userFound) {
      if (err) {
        alert('Sorry!!!! Job ID not Found');
        return res.notFound();
      }
      if (userFound) {
        Invite.findOne({
          jobid: req.body.id,
        }).exec(function findOneCB(err, applicantAnswer) {
          if (err) {
            alert('Sorry!!!! Job ID not Found');
            return res.notFound();
          }
          if (applicantAnswer) {
            Answer.create({
              applicantId: userFound.id,
              applicantName: userFound.name,
              applicantEmail: userFound.email,
              question: req.body.question,
              videoFileName: videoStringName,
              jobId: req.body.id,
            }, function answerCreated(err, Answers) {
              if (err) {
                console.log(Answers);
                console.log('err: ', err);
                console.log('err.invalidAttributes: ', err.invalidAttributes);
                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
              }
              Invite.update({
                jobid: req.body.id,applicantId: userFound.id,
              }, {
                status: 'Attend',
              }).exec(function(e1, r1) {
                if (e1) {
                  return res.notFound();
                }
                return res.ok();
              });
              // Send back the id of the new user
              return res.json(Answers);
            });
          }

        });
      }
    });
  },
};