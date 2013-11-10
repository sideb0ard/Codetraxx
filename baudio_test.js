#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var baudio = require('baudio');

var n = 0;
var b = baudio(function (t) {
  var x = Math.sin(t * 262 + Math.sin(n));
  n += Math.sin(t);
  return x;
});

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, tick = msg.tick, currentTick = msg.currentTick;
  console.log("BPM: " + bpm + " TICK: " + tick + " CURRENT TICK: " + currentTick);

  if (currentTick === 1) {
    b.play();
  }


});
