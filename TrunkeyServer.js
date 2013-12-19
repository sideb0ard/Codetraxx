#!/usr/bin/env node

var cp = require('child_process');
var fs = require('fs');

var server = cp.fork('Trunkey.js');
console.log('Trunkey started');

fs.watchFile('Trunkey.js', function (event, filename) {
    server.kill();
    console.log('Server stopped');
    server = cp.fork('Trunkey.js');
    console.log('Trunkey started');
});

process.on('SIGINT', function () {
    server.kill();
    fs.unwatchFile('Trunkey.js');
    process.exit();
});
