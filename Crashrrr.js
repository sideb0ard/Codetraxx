#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

var baudio_funct = function(tickCounter) {


  // console.log("TICKCOUNTER:: " + tickCounter);
  // console.log(typeof tickCounter); 

  nowplaying = 0;
  var b = baudio(function (tt, tickCounter) {
    console.log("TICKCOUNTER:: " + tickCounter);
    donk = (tickCounter / 266666);
    var t = donk % 5;
    var n = t % 7;
    var xs = [ 120, 1, 240, 450, 20 ];

    var speed = tt % 8 > 7 ? 16 : 2;
    var x = xs[Math.floor(t*speed)%xs.length]
    var z = tt % 8 < 7 ? 1000 : 80;

    var f = x + Math.sin(z * (t % 1));

    return (
        0.15 * Math.sin(tau * t * f)
    );

    function sin (x) {
        return Math.sin(tau * t * x);
    }
});

   b.play();

};

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   console.log("hola");
   baudio_funct(tickCounter);
  }

});
