const winston = require('winston'),
  util = require('util');

//
// ### function Zulip (options)
// #### @options {Object} Options for this instance.
// Constructor function for the Console transport object responsible
// for making arbitrary HTTP requests whenever log messages and metadata
// are received.
//
const Zulip = exports.Zulip = function (options) {
  options = options || {};
  //remove self signed certificate error
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  winston.Transport.call(this, options);
  this.name = 'Zulip';
  this.json = options.json || true;

  if (options.json === false) {
    console.log('cannot support other than json');
  }

  this.zulipUsername = options.zulipUsername;
  this.zulipApikey = options.zulipApikey;
  this.zulipRealm = options.zulipRealm;
  this.zulipTo = options.zulipTo || 'winston';
  this.zulipType = options.zulipType || 'stream';
  this.zulipSubject = options.zulipSubject || 'log';


  const config = {
    username: this.zulipUsername,
    apiKey: this.zulipApikey,
    realm: this.zulipRealm,
  };
  this.zulip = require('zulip-js')(config);
};

//
// Inherit from `winston.Transport`.
//
util.inherits(Zulip, winston.Transport);

//
// Expose the name of this Transport on the prototype
//
Zulip.prototype.name = 'Zulip';

//
// Define a getter so that `winston.transports.Zulip`
// is available and thus backwards compatible.
//
winston.transports.Zulip = Zulip;

//
// ### function log (level, msg, [meta], callback)
// #### @level {string} Level at which to log the message.
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete.
// Core logging method exposed to Winston. Metadata is optional.
//
Zulip.prototype.log = function (level, msg, meta, callback) {
  //
  // Write logging event to the outgoing request body
  //
  const log = meta || {};
  // RFC3339/ISO8601 format instead of common.timestamp()
  log.timestamp = new Date();
  log.message = msg;
  log.level = level;

  // After initializing the zulip object
  const params = {
    to: this.zulipTo,
    type: this.zulipType,
    subject: this.zulipSubject,
    content: JSON.stringify(log),
  };

  // Send a message
  this.zulip.messages.send(params).then((res) => {
    callback(true, res);

  });


};


module.exports = winston.transports.Zulip = Zulip;

