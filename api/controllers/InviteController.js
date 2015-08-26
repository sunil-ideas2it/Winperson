/**
 * InviteController
 *
 * @author      :: Sunil Hirole
 * @description :: Server-side logic for managing invites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var nodemailer = require('nodemailer');
var csv = require('fast-csv');
var fs = require('fs');
var randtoken = require('rand-token');
module.exports = {

    upload: function(req, res) {

        console.log('form body', req.file);

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
            console.log('uploaded file path', files[0].fd)


            var stream = fs.createReadStream(files[0].fd);
           
            var csvStream = csv()
                .on("data", function(data) {
                    var token = randtoken.generate(16);
                    Invite.create({
                            firstname: data[0],
                            lastname: data[1],
                            emailid: data[2],
                            contact: data[3],
                            token: token
                        },
                        function inviteCreated(err, newInvite) {
                            if (err) {

                                console.log("err: ", err);
                                console.log("err.invalidAttributes: ", err.invalidAttributes)


                                // Otherwise, send back something reasonable as our error response.
                                return res.negotiate(err);
                            }

                            // Send back the id of the new user
                            /* return res.json({
                               id: newJob.id
                             });*/
                            //return res.ok();
                        });
                })
                .on("end", function() {
                    console.log("done");
                });

            stream.pipe(csvStream);

            //send response

            //result:true -- file upload successful
            //files:files -- send uploaded file data to the front end
            res.send({
                result: true,
                files: files
            });


        });
    },

    sendemail: function(req, res) {
        console.log('-----hii Send Email--------');
        var params = req.params.all();
        console.log(params);
        if (!params.email) {
            res.send(500);
        }

        var msg = [];
        msg = 'Someone Has Contact You From the Website!\n';
        msg += '------------------------------------------\n';

        if (params.email) {
            msg += 'Email: ' + params.email + '\n';
        }

        // create reusable transporter object using SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nithitest1@gmail.com',
                pass: 'test!@#$'
            }
        });
        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'TEST Foo ✔ <nithitest1@gmail.com>', // sender address
            to: params.email, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ✔', // plaintext body
            html: '<b>Hello world ✔</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.ok();
        });
    }

};