#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

var baudio_funct = function(tickCounter) {

  // console.log("TICKCOUNTER:: " + tickCounter);
  nowplaying = 1;
  console.log("TICKCOUNTER:: " + tickCounter);

  // nowplaying = 0;
  var b = baudio(function (tt, tickCounter) {
    // donk = (tickCounter / 77677); // plinky plonk
    var donk;
    if (Math.round(Math.random()*1)) {
      donk = (tickCounter / 77677);
    } else {
      donk = (tickCounter / 440);
    }
    //console.log("donk:: " + donk);

    var t = donk % 5;
    var n = t % 7;
    // var xs = [ (1200 / t), t, 240, 450, 20 ]; // works
    var xs = [ (1200 / t), donk, 240, 450, n * tau ];

    var speed = tt % 8 > 7 ? 16 : 2;
    var x = xs[Math.floor(t*speed)%xs.length]
    //var z = tt % 8 < 7 ? 1000 : 80;

    //var f = x + Math.sin(z * (t % 1));

    var noisee = 0.15 * Math.sin(tau * x * (t / bpm));
    //codetrax.publish('bzz', noisee);
    // nowplaying = 0;
    return (noisee);

});

   b.play();

};

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
   console.log("hola");
   baudio_funct(tickCounter);
  }

});
