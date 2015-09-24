/**
 * UserController
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
module.exports = {

    /**
     * Sign up for a user account.
     */
    signup: function(req, res) {
        // Create a User with the params sent from
        // the sign-up form --> signup.ejs
        User.create({
            name: req.param('name'),
            email: req.param('email'),
            password: req.param('password'),
            role: 1,
            lastLoggedIn: new Date()
        }, function userCreated(err, newUser) {
            if (err) {
                console.log(newUser);
                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes);

                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                    return res.emailAddressInUse();
                }

                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
            }

            // Send back the id of the new user
            return res.json(200, {
                user: newUser,
                token: jwToken.issue({
                    id: newUser.id
                })
            });
        });
    },

    /**
     * Sign up for a Applicant account.
     */
    applicantSignup: function(req, res) {
        Invite.findOne({
            token: req.body.token
        }).exec(function findOneCB(err, applicant) {
                if (err) {
                    alert('Sorry!!!! You are not Authorized');
                    return res.notFound();
                }
                if (!applicant.firstname || !applicant.lastname) {

                    User.create({
                        name: req.body.firstname + ' ' + req.body.lastname,
                        email: applicant.emailid,
                        password: req.body.password,
                        role: 2,
                        lastLoggedIn: new Date()
                    }, function userCreated(err, newUser) {
                        if (err) {
                            console.log(newUser);
                            console.log("err: ", err);
                            console.log("err.invalidAttributes: ", err.invalidAttributes);

                            // If this is a uniqueness error about the email attribute,
                            // send back an easily parseable status code.
                            if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                                return res.emailAddressInUse();
                            }

                            // Otherwise, send back something reasonable as our error response.
                            return res.negotiate(err);
                        }
                        Invite.update({
                            emailid: applicant.emailid
                        }, {
                        applicantId: newUser.id
                          }).exec(function(e1, r1) {
                         return res.ok();
                        });

                        // Send back the id of the new user
                        return res.ok();
                    });
                }
                else {
                    User.create({
                        name: applicant.firstname + ' ' + applicant.lastname,
                        email: applicant.emailid,
                        password: req.body.password,
                        role: 2,
                        lastLoggedIn: new Date()
                    }, function userCreated(err, newUser) {
                        if (err) {
                            console.log(newUser);
                            console.log("err: ", err);
                            console.log("err.invalidAttributes: ", err.invalidAttributes);

                            // If this is a uniqueness error about the email attribute,
                            // send back an easily parseable status code.
                            if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                                return res.emailAddressInUse();
                            }

                            // Otherwise, send back something reasonable as our error response.
                            return res.negotiate(err);
                        }
                        Invite.update({
                            emailid: applicant.emailid
                        }, {
                        applicantId: newUser.id
                          }).exec(function(e1, r1) {
                         return res.ok();
                        });

                        // Send back the id of the new user
                        return res.ok();
                    });
                }
    });
   },

/**
 * Check the provided email address and password, and if they
 * match a real user in the database, sign in to Winperson.
 */
login: function(req, res) {
    // Try to look up user using the provided email address

    passport.authenticate('local', function(err, user, info) {
        console.log(err);
        console.log(user);
                console.log(info);
        if ((err) || (!user)) {
            return res.notFound();
        }
        req.logIn(user, function(err) {
            if (err) res.notFound();
            console.log(user.role);
            req.session.me = user;
            return res.json(user);
        });

    })(req, res);

      },

  logout: function(req,res){
    req.logOut();
    return res.ok();

  }

  };
