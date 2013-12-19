#!/usr/bin/env node

var cp = require('child_process');
var fs = require('fs');

var server = cp.fork('Tweekzzz.js');
console.log('Tweekzzz started');

fs.watchFile('Tweekzzz.js', function (event, filename) {
    server.kill();
    console.log('Server stopped');
    server = cp.fork('Tweekzzz.js');
    console.log('Tweekzzz started');
});

process.on('SIGINT', function () {
    server.kill();
    fs.unwatchFile('Tweekzzz.js');
    process.exit();
});
