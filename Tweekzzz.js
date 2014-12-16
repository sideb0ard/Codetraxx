#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  //if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  if ( /[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   var b = baudio(function (t) {
     //donk = (tickCounter / 57575.678678686786);
     donk = (t * 5786);
     var tt = donk % 5;
     //var xs = [ 20, t, donk, 240, tickCounter, 20 ];
     //var xs = [ donk, t, donk % tt, tt, 70 ];
     //var xs = [ 100, 30, 23, donk, 76, 140 ];
     //var xs = [ 100 % donk, 23, donk, 140 ];
     //var xs = [ 440 % (donk * tau), ((43 * t) % 3)];
     var xs = [ 13, 24, 35, 7, 6, 8 ];
     //var xs = [ 13 * donk, 24, 35, 7, 6, 8 ];
     //var xs = [ 130, 14, 15, 1, 17 ];

     var speed = tt % 5 > 2 ? 4 : 2;
     //var x = xs[Math.floor( t * 33) % xs.length]
     var x = xs[Math.floor( t * 27) % xs.length];
     //var z = tt % 8 < 7 ? 1000 : 80;

     vol = "0." + (Math.floor(t % 0.4) + 1);
     //var f = x + Math.sin(z * (t % 1));
     //var multi = ( 47 % (t * ( bpm / 60)));
     var multi = ( t * ( bpm / 60));

     return(sin(x) *  vol);
     //return(sin(x) *  0);

      function sin (x) {
          return Math.sin(tau * multi * x);
      }
    });
    b.play();

  }

});
