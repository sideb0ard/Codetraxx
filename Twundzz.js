#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

var xzzz, yzzz, zzzz, Gx, Gz;

codetraxx.subscribe( 'motion', function(msg) {
  xzzz = msg.x, yzzz = msg.y, zzzz = msg.z, Gx = msg.Gx, Gy = msg.Gy, Gz = msg.Gz;
  console.log("Dance human! : " + msg);
});

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;

  if (/[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   var b = baudio(function (t) {

     multi = (t * (bpm / 60));
     vol = "0." + (Math.floor(t % 4) + 1);
     diff = bpm / 60;
     //return (sin(130) + sin(130 + diff)) / 2;
     //return (sin(130) + sin(122) * diff) / 2; // SWEET SPOT
     return (sin(130) + sin(127) * diff) / 2;
     //return (sin(130) + sin(130 + diff)) * Gx / 2;
     //return (sin(130) + sin(17 * yzzz) + square(zzzz)) / 2;

      function sin (x) { return Math.sin(tau * (t/2) * x); }
      function square (x) { return sin(x) > 0 ? 1 : -1; }
      function saw (x) { return 1-2*(t%(1/x))*x ;}
    });
    b.play();

  }

});
