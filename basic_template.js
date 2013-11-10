#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/kick.wav";
var SNARE = "wavs/SnareDrum0012.aif";

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, tick = msg.tick, currentTick = msg.currentTick;
  console.log("BPM: " + bpm + " TICK: " + tick + " CURRENT TICK: " + currentTick);

  // do cool shit here!
  //if (/[1357]/.test(currentTick)) {
  //  exec("play " + KICK);
  //} else if (/[2468]/.test(currentTick)) {
  //  exec("play " + SNARE);
  //}

});
