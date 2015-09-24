/**
 * JobController
 *
 * @author      :: Sunil Hirole
 * @dated       :: 27-08-2015
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  create: function(req, res) {

    Job.create({
      title: req.param('title'),
      description: req.param('description'),
      experience: req.param('experience'),
      salary: req.param('salary'),
      lastLoggedIn: new Date(),
    }, function jobCreated(err, newJob) {
      if (err) {

        console.log('err: ', err);
        console.log('err.invalidAttributes: ', err.invalidAttributes);
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      // Send back the id of the new job
      return res.json({
        id: newJob.id,
      });
    });
  },

};