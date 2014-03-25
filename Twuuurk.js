#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  //if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   var b = baudio(function (t) {
     multi = (t * (bpm / 60));
      donk = (t % 4 / 57575.678678686786);
     // var t = donk % 5;
     var xs = [ 20, t, donk, 240, tickCounter % 3, 20 ];
     // //var xs = [ donk, t, 13, 456 ];
     //var xs = [ 13, 2, 3, 4, 5, 6, 8 ];
     //var xs = [ 50048, 43, 5454, 532445 ];
     //var xs = [ 566, 3.44, 440, 77, 532445, 0, 54 ];
     //var xs = [ 66, 3.44];

     // var speed = tt % 5 > 7 ? 4 : 2;
     var x = xs[Math.floor( t * 53.3) % xs.length];
     // var z = t % 8 < 7 ? 1000 : 80;

     // var f = x + sin(z * (t % 1));

     vol = "0." + (Math.floor(t % 4) + 1);
     return sin(x * 4) * vol;
     

      function sin (x) {
          return Math.sin(tau * multi * x);
      }
    });
    b.play();

  }

});
