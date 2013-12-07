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
   var b = baudio(function (tt, tickCounter, bpm) {
    // console.log("TICKCOUNTER:: " + tickCounter);
    //donk = (tickCounter / bpm);
    donk = (tickCounter / 57575.678678686786);
    var t = donk % 5;
    //var n = t % 7;
    //var xs = [ 20, 13, donk, 240, tickCounter, 20 ];
    //var xs = [ 13, 2, 3, 4, 5, 6, 8 ];
    var xs = [ 3, 4, 3, 4, 7 ];

    var speed = tt % 5 > 7 ? 4 : 2;
    var x = xs[Math.floor(t*speed)%xs.length]
    var z = tt % 8 < 7 ? 1000 : 80;

    var f = x + Math.sin(z * (t % 1));
    var multi = tt * ( bpm / 60);

      return (
          0.15 * Math.sin(tau * t * f)
      );

      function sin (x) {
          return Math.sin(tau * t * x);
      }
    });
    b.play();

  }

});
