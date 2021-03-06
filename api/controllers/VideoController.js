/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var randomstring = require("randomstring");

module.exports = {

    uploadvideo: function(req, res) {
        console.log('--------------video in backend----------',req.body);
        var buf = new Buffer(req.body.blob, 'base64'); // decode
        console.log('---buffer--------',buf);
        var string = randomstring.generate(7);

          fs.writeFile("temp/"+string+".mp4", buf, function(err) {
            if(err) {
              console.log("err", err);
            } else {
              return res.json({'status': 'success'});
            }
          }) 
    }
};