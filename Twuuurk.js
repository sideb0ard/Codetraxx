#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

//codetraxx.subscribe( 'bpm', function(msg) {
//  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
//  if (/[1]/.test(microTick) && !nowplaying) {
//   nowplaying = 1;
   var b = baudio(function (t) {
     var frequency = [392, 659.26, 783.99, 1046.5]; // "C4+E4+G4+C5" notes
     numz = (sin(frequency[0]) + square(frequency[1])+ saw(frequency[2])  + saw(frequency[3]))/4;
     //console.log(numz);
     //if (/[e]/.test(numz)) {
     if ( -1 > numz < 1) {
       return numz;
     } else {
       console.log("DROP THE BUMMER! - " + numz);
     }
      function sin (x) { return Math.sin(tau * t * x); }
      function square (x) { return sin(x) > 0 ? 1 : -1; }
      function saw (x) { return 1-2*(t%(1/x))*x ;}
    });
    b.play();

//  }
//});
