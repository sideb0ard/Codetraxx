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

    var b = baudio(function (tt, counter) {

      donk = (counter / 57575.678678686786);
      var t = donk % 5;
      var xs = [ donk, t, donk, donk, counter, 20 ];

      var x = xs[Math.floor( tt * 33) % xs.length]

      var multi = tt * ( bpm / 60);

      vol = multi % 0.5;
      // console.log(vol);
      return (
        //sin(multi) * sin(x) * t
        sin(multi) * sin(x) * vol
      );

      function sin (x) {
        return Math.sin(tau * tt * x);
      }
    });
    b.play();
  }
  //else {
   // console.log("ELSE!");
    //nowplaying = 0;
  //}


});
