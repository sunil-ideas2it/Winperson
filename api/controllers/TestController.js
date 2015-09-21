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
        }).exec(function findOneCB(err, applicant) {
            if (err) {
                alert('Sorry!!!! You are not Authorized');
                return res.notFound();
            }
            if(applicant){
              console.log('We found ' + applicant.firstname);
              return res.json(applicant);//res.ok();
            }
            
        });

    },

  getQuestions: function(req,res){
      User.findOne({
            id: req.body.id
        }).exec(function findOneCB(err, user) {
            if (err) {
                return res.notFound();
            }
            if(user){
                  Invite.findOne({
                    emailid: user.email
                  }).exec(function findOneCB(err, InviteEmailFound){
                  
                      if(err){
                         return res.notFound();
                      }
                      if(InviteEmailFound){
                          Job.findOne({
                            id: InviteEmailFound.jobid
                          }).exec(function findOneCB(err, jobFound){
                                   if(err){
                                   return res.notFound();
                                 }
                                if(jobFound){
                               Question.find({
                                  jobid: jobFound.id
                                }).exec(function findOneCB(err, questionFound){
                        
                                      if(err){
                                         return res.notFound();
                                       }
                                      if(questionFound){
                                        console.log(questionFound);
                                      res.json({ 
                                        questionObject: questionFound, 
                                        jobObject: jobFound
                                      }); 
                                      }
                                });
                              }
                           });
                       
                      }

                  });
            
            }
          
        });
    }
};