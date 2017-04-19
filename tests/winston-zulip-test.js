const winston = require('winston'),
  zulip = require('../lib/winston-zulip').Couchdb;


 winston.add(winston.transports.Zulip, {
    zulipUsername: 'wekan-logger-bot@avisto.com',
    zulipApikey: 'uMOBPIxRsC3wmadvlk1T4OyUjG7gQUlv',
    zulipRealm: 'https://192.168.6.50:4430',
    zulipTo: 'engineering',
    zulipSubject: 'project'
  });

winston.log('info', 'Hello distributed log files!');
