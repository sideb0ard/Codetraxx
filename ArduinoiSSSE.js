#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');
var tau = 2 * Math.PI;
var note = 0; // to come from arduino - serial queue

codetraxx.subscribe('serial', function(msg) {
  note = msg.lightsensor;
  console.log("LIGHT!: " + note);
});

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  // console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (beat === 1 && microTick === 1 && !nowplaying) {
    nowplaying = 1;
    console.log("hola");
    b = baudio(function (t) {
      var multiplier = (t * (bpm / 60)) ;

      var vol = "0." + Math.floor(t % 8) + 2;
      //return sin(note) * vol;
      return square(note % 20) * vol;
      //return saw(note) * vol;
      //return sin(note % 8) * saw(note % 10) * vol;

      function sin (x) {
        return Math.sin( tau * multiplier * x);
      }
      function square (x) { 
        return sin(x) > 0 ? 1 : -1; 
      }
      function saw (x) { 
        return 1-2*(t%(1/x))*x; 
      }
    });

  b.play();
  }

});
