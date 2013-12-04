#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');
var tau = 2 * Math.PI;

var baudio_funct = function(tickCounter,bpm) {

  //console.log("TICK!" + tickCounter + " BPM " + bpm);

  b = baudio(function (t) {
      //console.log("t! " + t + " BPM!" + bpm);
      // console.log("TICKYBOO -- " + tickCounter);
      //return Math.sin(2 * Math.PI * tickCounter * t) * ((t*74) < 0.1);

      var multiplier = t * (bpm / 60);
      //console.log("MULTI! " + multiplier);

      return sin(400) * sin(1);

      //return 1;


      function sin (freq) {
        //return Math.sin(tau * tickCounter * freq);
        return Math.sin(tau * multiplier * freq * tickCounter);
      }
  })
  b.play();

  // nowplaying = 0;
};

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  // console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (beat === 3 && !nowplaying) {
   nowplaying = 1;
   console.log("hola");
   baudio_funct(tickCounter,bpm);
  }

});
