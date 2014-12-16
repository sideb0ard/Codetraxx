#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  //if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  //if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  if (/[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   var b = baudio(function (t) {
     //console.log(t);
     vol = "0." + (Math.floor(t % 4) + 1);
     diff = bpm / 60;

     return (sin(165) + sin(165 + diff)) / 2;
     //return (sin(330) + sin(330 + diff)) / 2;

      //function sin (x) { return Math.sin(tau * multi * x); }
      function sin (x) { return Math.sin(tau * (t/2) * x); }
      function square (x) { return sin(x) > 0 ? 1 : -1; }
      function saw (x) { return 1-2*(t%(1/x))*x ;}
    });
    b.play();

  }

});
