module.exports = {

    /**
     * Check the provided email address and password, and if they
     * match a real user in the database, sign in to Activity Overlord.
     */
    getJob: function(req, res) {
        // Try to look up user using the provided email address
        Job.find({}).exec(function findCB(err, found) {

            res.json({
                jobObject: found
            });

        });

    },

    getAnswer: function(req, res) {
        // Try to look up user using the provided email address
        Answer.find({
            jobId: req.body.id
        }).exec(function findCB(err, found) {
            console.log('hiii');
            console.log(found)
            res.json({
                answerObject: found
            });

        });

    },


};