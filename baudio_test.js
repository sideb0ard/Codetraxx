#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;

var baudio_funct = function() {

  nowplaying = 1;

  var baudio = require('baudio');
  var tau = 2 * Math.PI;

  var b = baudio(function (t) {
    return sin(400) + sin(404);

    function sin (freq) {
        return Math.sin(tau * t * freq);
    }
  });
  b.play();

};

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, tick = msg.tick, currentTick = msg.currentTick;
  console.log("BPM: " + bpm + " TICK: " + tick + " CURRENT TICK: " + currentTick);

  if (currentTick === 1 && nowplaying != 1) {
   baudio_funct();
  }

});
