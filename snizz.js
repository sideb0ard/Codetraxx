#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var sys = require('sys');
var exec = require('child_process').exec;

codetraxx.subscribe(function(msg) {
  var bpm = msg.bpm, tick = msg.tick, currentTick = msg.currentTick;
  console.log("BPM:: " + bpm + " TICK:: " + tick + " CURRENTTICK:: " + currentTick);

  var sin_one = codetraxx.randyNum(347);
  var sin_two = codetraxx.randyNum(357);
  console.log ("SINZ == " + sin_one + " " + sin_two);
    if ( Math.round(Math.random()*1) ) {
      if ( Math.round(Math.random()*1) ) {
        // exec("play -n synth 1 sin " + sin_one + " sin " + sin_two);
        exec("play -n synth 1 sin 347 sin 457 phaser 0.8 0.74 3 0.4 0.5 −t fade h 0.1 1 0.1");
      } else {
        exec("play -n synth 1 sin 447 sin 477 chorus 0.7 0.9 55 0.4 0.25 2 -t fade h 0.1 1 0.1");
      }
      // exec("play -n synth 1 sin 300-3300");
    }
});
