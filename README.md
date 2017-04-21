# winston-zulip
A [winston logger](https://github.com/winstonjs/winston) for zulip.

## Usage
```javacript
const winston = require('winston');
require('winston-zulip');


winston.add(winston.transports.Zulip, {
  zulipUsername: '<username>',
  zulipApikey: '<apikey>',
  zulipRealm: '<your domain>',
  zulipTo: 'my awesome collegue',
  zulipSubject: 'admin rights'
});

winston.log('info', 'Hello distributed log files!');
```

## apikey creation 

`http://yourdomain/#settings`

![apikeycreation][https://github.com/huneau/winston-zulip/zulip-apikey.png]

You can create your own apikey or create a bot and retreive it own apikey. For both of these solution, you can download a file that refer all needed variable.
