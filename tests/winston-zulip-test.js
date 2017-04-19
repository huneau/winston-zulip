const vows = require('vows'),
  transport = require('winston/test/transports/transport'),
  zulip = require('../lib/winston-zulip').Couchdb;

vows.describe('winston/transports/zulip').addBatch({
  'An instance of the zulip Transport': transport(zulip, {
    zulipUsername: 'wekan-logger-bot@avisto.com',
    zulipApikey: 'uMOBPIxRsC3wmadvlk1T4OyUjG7gQUlv',
    zulipRealm: 'https://192.168.6.50:4430',
    zulipTo: 'engineering',
    zulipSubject: 'project',
  }),
}).export(module);
