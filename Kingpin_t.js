#!/usr/bin/env node

var cp = require('child_process');
var fs = require('fs');


prog = process.argv[2]
runtime = process.argv[3]

if(typeof runtime == 'undefined') {
        console.log("loser! need a program tae monitor and a time to run in seconds..")
                process.exit(1);
}

runtime = runtime * 1000;

console.log("\n\n****\nMUTHAFUCKA - THIS IS THA VOICE OF DA KINGPING - MONITORING YO SHITTY ASS " + prog + " -- KEEP IT REAL BEATCH!\n\n*******\n");

var server = cp.fork(prog);
console.log(prog + ' started');

//fs.watchFile(prog, function (event, filename) {
//    server.kill();
//    console.log(prog + ' stopped');
//    server = cp.fork(prog);
//    console.log(prog + ' started');
//});

setInterval(function(){
  server.kill();
  console.log(prog + ' stopped');
  server = cp.fork(prog);
  console.log(prog + ' started');
},runtime);


process.on('SIGINT', function () {
    server.kill();
    fs.unwatchFile(prog);
    process.exit();
});
