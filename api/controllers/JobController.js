/**
 * JobController
 *
 * @author      :: Sunil Hirole
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    create: function(req, res) {
        console.log('-----req body--------', req.body);
        Job.create({
            title: req.param('title'),
            description: req.param('description'),
            experience: req.param('experience'),
            salary: req.param('salary'),
            timeperques: req.param('timeperques'),
            quespertest: req.param('quespertest'),
            lastLoggedIn: new Date()
        }, function jobCreated(err, newJob) {
            if (err) {

                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes)


                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
            }

            // Log user in
            //req.session.me = newJob.id;

            // Send back the id of the new job
            return res.json({
                id: newJob.id
            });
        });
    }

};