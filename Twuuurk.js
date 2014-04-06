#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
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
     multi = (t * (bpm / 60));
      donk = (t % 4 / 57);
     // var t = donk % 5;
     var xs = [ 20/3, t/23, donk, 2/40, tickCounter % 3, 20/3 ];
     var xs = [ 2/3, 4/5, 7/3, 5/9];
     // //var xs = [ donk, t, 13, 456 ];
     //var xs = [ 13, 2, 3, 4, 5, 6, 8 ];
     //var xs = [ 50048, 43, 5454, 532445 ];
     //var xs = [ 566, 3.44, 440, 77, 532445, 0, 54 ];
     //var xs = [ 66, 3.44];

     // var speed = tt % 5 > 7 ? 4 : 2;
     var x = xs[Math.floor( t * 53.3) % xs.length];
     //var x = xs[t % xs.length];
     // var z = t % 8 < 7 ? 1000 : 80;

     // var f = x + sin(z * (t % 1));

     vol = "0." + (Math.floor(t % 4) + 1);
     //return (sin(x) * square(t % x) / 2) * vol;
     //return square(x) * vol;
     //return square(x) * vol;
     diff = bpm / 60;
     //return (sin(430) + sin(430 + diff)) / 2;
     //return (sin(730) + sin(730 + diff)) / 2;
     return (sin(130) + sin(130 + diff)) / 2;
     //return (sin(134) + sin(134 + diff)) / 2;
     //return sin(441) * (sin(3) + sin(4)) / 2;

      //function sin (x) { return Math.sin(tau * multi * x); }
      function sin (x) { return Math.sin(tau * (t/2) * x); }
      function square (x) { return sin(x) > 0 ? 1 : -1; }
      function saw (x) { return 1-2*(t%(1/x))*x ;}
    });
    b.play();

  }

});
