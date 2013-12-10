#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (/[1]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   var b = baudio(function (tt, tickCounter) {

     //var xs = [ 30, 60, 90, 120, 700 ];
     var xs = [ 347/47, 3/5 ]
     var z = tickCounter % 13 < 7 ? 1200 : 13;
     var x = xs[Math.floor( tt * z * tau)  % xs.length]
     // var f = x + sin(z * (t % 1));
     var multi = tt * ( bpm / 60) / tau;

     return (
           sin(multi) * sin(x) *  0.3713
     );

      function sin (x) {
          return Math.sin(tau * tt * x);
      }
    });
    b.play();

  }

});
