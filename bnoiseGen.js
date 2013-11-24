#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var baudio_funct = function() {

  nowplaying = 1;

  b = baudio(function (t, tickCounter) {
      //console.log("ug!");
      nowplaying = 0;
      // console.log("TICKYBOO -- " + tickCounter);
      return Math.sin(2 * Math.PI * tickCounter * t) * ((t*74) < 0.1);
  })
  b.play();

};

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (beat === 3 && !nowplaying) {
   console.log("hola");
   baudio_funct(tickCounter);
  }

});
