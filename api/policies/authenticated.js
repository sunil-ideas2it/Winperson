/**
 * sessionAuth
 * @author      :: Sunil Hirole
 * @date        :: 14 Aug 2015
 * @description :: 
 */
module.exports = function(req, res, next) {
   if (req.isAuthenticated()) {
        return next();
    }
    else{
        return res.redirect('/');
    }
};