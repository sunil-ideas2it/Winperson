/**
 * Job.js
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: Job model contains job information .
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    attributes: {
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        experience: {
            type: 'string',
            required: true
        },
        salary: {
            type: 'string',
            required: true
        },
        timeperques: {
            type: 'string'
        },
        quespertest: {
            type: 'string'
        }
    }


};