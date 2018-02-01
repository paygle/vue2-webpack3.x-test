const express = require('express');
const proxy = require('http-proxy-middleware');
const opn = require('opn');
const path = require('path');
const config = require('../config')
const host = 'http://' + require('../config/gethost').ip;
const port = 6788;
const app = express();

// set product proxy
for(let key in config.dev.proxyTable) {
  app.use(key, proxy(config.dev.proxyTable[key]));
}

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(port, function() {
  console.log(`server listening at ${host}:%s`, port);
  opn(`${host}:`+ port);
});
