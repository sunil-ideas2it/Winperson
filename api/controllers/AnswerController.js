module.exports = {

  // Check the provided email address and password, and if they
  // match a real user in the database, sign in to Winperson.
  //
  getJob: function(req, res) {
    // Try to look up user using the provided email address
    Job.find({}).exec(function findCB(err, found) {
      res.json({
        jobObject: found,
      });
    });
  },

  getAnswer: function(req, res) {
    // Try to look up user using the provided email address
    Answer.find({
      jobId: req.body.id,applicantId: req.body.userid,
    }).exec(function findCB(err, found) {
      res.json({
        answerObject: found,
      });
    });
  },
  getApplicant: function(req, res) {
    Invite.find({
      jobid: req.body.id,
    }).exec(function findCB(err, found) {
      if (err) {
        return res.notFound();
      }
      if (found) {
        return res.json({
          inviteObject: found,
        });
      }

    });

  },
  getUserDetail: function(req, res) {
    // Try to look up user using the provided email address
    Answer.find({
      videoFileName: req.body.videoFileName,
    }).exec(function findCB(err, found) {
      res.json(found);
    });
  },
};