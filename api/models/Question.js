/**
 * Question.js
 *
 * @author      :: Sunil Hirole
 * @description :: Question model is for test questions .
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {

    attributes: {

        question: {
            type: 'string'
        },
        jobid:{
        	type: 'string'
        }

    }
};