#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;
var sox = " | sox -r 8000 -b 8 -c 1 -t raw -s - -d";
var sys = require('sys');

var tau = Math.PI * 2;

function puts(error, stdout, stderr) { sys.puts(stdout) }

function sin (t,x) {
  return Math.sin(tau * t * x);
}

function bzz (tt, i) {
  console.log("In BZZ! tt is " + tt + "and i is " + i);
  //return "boo!";
  return (
    10404 * (tt)
    + 0.15);
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, tick = msg.tick, currentTick = msg.currentTick;
  console.log("BPM: " + bpm + " TICK: " + tick + " CURRENT TICK: " + currentTick);

  if (/[347]/.test(currentTick)) {
    var bzzzNum = bzz(tick,currentTick);
    // var bzzzNum = sin(tick,currentTick);
    console.log("BZZZ!:" + bzzzNum);
    exec("echo " + bzzzNum + sox, puts);
  }

});
