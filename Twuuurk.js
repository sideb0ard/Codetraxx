#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   var b = baudio(function (tt, tickCounter) {
     donk = (tickCounter / 57575.678678686786);
     var t = donk % 5;
     var xs = [ 20, t, donk, 240, tickCounter, 20 ];
     //var xs = [ donk, tt, t ];
     //var xs = [ 13, 2, 3, 4, 5, 6, 8 ];
     //var xs = [ 1, 1, 1, 1, 7 ];

     var speed = tt % 5 > 7 ? 4 : 2;
     var x = xs[Math.floor( tt * 33.3) % xs.length]
     var z = tt % 8 < 7 ? 1000 : 80;

     var f = x + sin(z * (t % 1));
     var multi = tt * ( bpm / 60);

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
