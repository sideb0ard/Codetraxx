#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var sys = require('sys');
var exec = require('child_process').exec;

var CLAP = "wavs/Clap.aif";

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, tick = msg.tick, currentTick = msg.currentTick;
  console.log("BPM: " + bpm + " TICK: " + tick + " CURRENT TICK: " + currentTick);

  if (/[37]/.test(currentTick)) {
    if (tick % 7 === 0 || tick % 3 === 0) {
    console.log("boo");
    exec("play " + CLAP);
    }
  }

});
