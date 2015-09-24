/**
 * Answer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {

  attributes: {
    applicantId: {
      type: 'string',
    },
    applicantName: {
      type: 'string',
    },
    applicantEmail: {
      type: 'email',
    },
    question: {
      type: 'string',
    },
    videoFileName: {
      type: 'string',
    },
    jobId: {
      type: 'string',
    },


  },
};