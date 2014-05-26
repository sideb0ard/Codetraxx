#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.tau  * 2;

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;

  if (/[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   var b = baudio(function (t) {
     var frequency = [392, 659.26, 783.99, 1046.5]; // "C4+E4+G4+C5" notes
     //var numz = Math.sin(2 * Math.tau  * t * 392);
     //console.log(numz);
     //return numz;

     //return  (sin( frequency[0] * tau *t ) + sin( frequency[1] * tau *t )+ sin( frequency[2] * tau *t ) + + sin( frequency[3] * tau *t ))/4;
     return( sin(frequency[0]));
     function sin (x) { return Math.sin(tau * (t/2) * x); }
     function square (x) { return sin(x) > 0 ? 1 : -1; }
     function saw (x) { return 1-2*(t%(1/x))*x ;}
   });
   b.play();

  }

});
