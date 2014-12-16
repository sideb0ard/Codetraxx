#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var cp = require('child_process');
var fs = require('fs');

var nowplaying = 0;

prog = process.argv[2]
runtime = process.argv[3]

if(typeof runtime == 'undefined') {
  console.log("loser! need a program tae monitor and a time to run in seconds..");
  process.exit(1);
}

runtime = runtime * 1000;

console.log("\n\n****\nMUTHAFUCKA - THIS IS THA VOICE OF DA KINGPING - MONITORING YO SHITTY ASS " + prog + " -- KEEP IT REAL BEATCH!\n\n*******\n");


codetraxx.subscribe('bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  if (/[3]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
    nowplaying = 1;
    var server = cp.fork(prog);
    console.log(prog + ' started');

    setInterval(function(){
      server.kill();
      console.log(prog + ' stopped');
      nowplaying=0;
    },runtime);

    process.on('SIGINT', function () {
        server.kill();
        process.exit();
    });
  }
});


