/**
 * Invite.js
 *
 * @author      :: Sunil Hirole
 * @description :: invite model contains details of applicant.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    attributes: {
        firstname: {
            type: 'string',
            required: true
        },
        lastname: {
            type: 'string',
            required: true
        },
        emailid: {
            type: 'string',
            required: true
        },
        contact: {
            type: 'string',
            required: true
        },
        token: {
            type: 'string',
            unique: true
        }
    }
};