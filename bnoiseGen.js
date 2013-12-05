#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');
var tau = 2 * Math.PI;


codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  // console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (beat === 1 && microTick === 1 && !nowplaying) {
   nowplaying = 1;
   console.log("hola");
   b = baudio(function (t) {
      var multiplier = t * (bpm / 60);
      return sin(440) * sin(1);
      function sin (freq) {
        return Math.sin(tau * multiplier * freq);
        // return Math.sin(tau * multiplier * freq * tickCounter);
      }
  })
  b.play();
  }

});
