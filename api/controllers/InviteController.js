/**
 * InviteController
 *
 * @author      :: Sunil Hirole
 * @dated       :: 27-08-2015
 * @description :: Server-side logic for managing invites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require('nodemailer');
var csv = require('fast-csv');
var fs = require('fs');
var randtoken = require('rand-token');
module.exports = {

    upload: function(req, res) {

        //accepts upload and moves it to .tmp/uploads
        req.file('file').upload(function(err, files) {

            //if there was an error
            //stop here and tell the frontend
            if (err) return res.send(400, {
                result: false,
                error: err
            });

            //if the file didn't upload for some reason
            //stop here and tell the frontend
            if (!files) return res.send(400, {
                result: false,
                error: 'Unable to upload file'
            });

            console.log('file data', err, files);
            // files is an array of the files that were uploaded
            // files[0].fd = file path to first uploaded file
            // see console for more info

            //move file to cloudinary or something
            console.log('uploaded file path', files[0].fd);


            var stream = fs.createReadStream(files[0].fd);

            var csvStream = csv()
                .on("data", function(data) {
                    var token = randtoken.generate(16);
                    Invite.create({
                            firstname: data[0],
                            lastname: data[1],
                            emailid: data[2],
                            contact: data[3],
                            jobid: req.body.jobidd,
                            token: token
                        },
                        function inviteCreated(err, newInvite) {
                            if (err) {

                                console.log("err: ", err);
                                console.log("err.invalidAttributes: ", err.invalidAttributes);


                                // Otherwise, send back something reasonable as our error response.
                                return res.negotiate(err);
                            }

                            var transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'nithitest1@gmail.com',
                                    pass: 'test!@#$'
                                }
                            });
                            // setup e-mail data with unicode symbols
                            var mailOptions = {
                                from: 'Winperson <nithitest1@gmail.com>',
                                to: data[2],
                                subject: 'Winperson Invite',
                                text: 'Winperson',
                                html: '<p>Hi' + ' ' + data[0] + ',' + '<br>Nithi Manager has invited you to interview for the Job position at Ideas2It. Click the link below to accept the invitation<br> http://localhost:1337/#/test/' + token + ' ' + '<br>We are here to help you with every step along the way. Feel free to reach out to us at helpdesk@winperson.me. We would love to hear from you! <br>Thanks.</p>'
                            };

                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message sent: ' + info.response);
                                //res.ok();
                            });
                        });
                })
                .on("end", function() {
                    console.log("done");
                });

            stream.pipe(csvStream);

            
            res.send({
                result: true,
                files: files
            });

        });
    }
};