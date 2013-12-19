#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  //if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  if ( /[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   var b = baudio(function (tt, tickCounter) {
     donk = (tickCounter / 57575.678678686786);
     var t = donk % 5;
     //var xs = [ 20, t, donk, 240, tickCounter, 20 ];
     //var xs = [ donk, t, donk, donk, tickCounter, 20 ];
     var xs = [ 13, 24, 35, 7, 6, 8 ];
     //var xs = [ 1, 1, 1, 1, 7 ];

     //var speed = tt % 5 > 7 ? 4 : 2;
     var x = xs[Math.floor( tt * 33) % xs.length]
     //var z = tt % 8 < 7 ? 1000 : 80;

     //var f = x + Math.sin(z * (t % 1));
     var multi = ( 47 % (tt * ( bpm / 60)));

     return (
           //0.74 * ( sin(100) * sin(multi) )
           //sin(multi) * sin(x) *  0.13
           sin(multi) * sin(x) *  2.23
           //sin(multi) * sin(x) *  sin(1)
     );

      function sin (x) {
          return Math.sin(tau * multi * x);
      }
    });
    b.play();

  }

});
