/**
 * TestController
 * @author       : Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    /**
     * Check the provided email address and password, and if they
     * match a real user in the database, sign in to Activity Overlord.
     */
    checkToken: function(req, res) {
        // Try to look up user using the provided email address
        Invite.findOne({
            token: req.body.token
        }).exec(function findOneCB(err, found) {
            if (err) {
                alert('Sorry!!!! You are not Authorized');
                return;
            }
            if(found){
              console.log('We found ' + found.firstname);
              return res.ok();
            }
            
        });

    }
};