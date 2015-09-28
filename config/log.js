/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */

/*module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  /*level: 'verbose'

};*/
var winston = require('winston');
module.exports = {
  'log': {
    'colors': false,
    'custom': new (winston.Logger)({
      'transports': [
                new (winston.transports.Console)({
                  'level': 'verbose',
                  'colorize': true,
                  'timestamp': false,
                  'json': false,
                }),
                new winston.transports.DailyRotateFile({
                  'level': 'error',
                  'colorize': true,
                  'timestamp': true,
                  'json': true,
                  'filename': './logs/sails.log',
                  'maxsize': 5120000,
                  'maxFiles': 3,
                })
            ]
    })
  }
};
/*var winston = require('winston');
var wLogger = new (winston.Logger)({
        exitOnError: false,
        transports: [
            new winston.transports.File({
                filename: './logs/sails.log',
                json: true,
                level: 'silly'
            })
        ],
        timestamp: true
    });
wLogger.log = wLogger.log;
module.exports.log = {
    level: 'silly',
    colors: false,
    custom: wLogger,
    wLogger: wLogger
};*/