#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');
var tau = 2 * Math.PI;


codetraxx.subscribe( 'tr33tzx', function(msg) {
  //var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  var x = msg.x; 
  console.log("X!!" + x);
  // console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  // if (beat === 1 && microTick === 1 && !nowplaying) {
  if (msg) {
    // nowplaying = 1;
    console.log(msg);
    //b = baudio(function (t) {
    //  var multiplier = (t * (bpm / 60)) / 2;
    //  //console.log("T is " + t + " MULTIPLIER is " + multiplier);

    //  var n = 47 / t;
    //  // var xs = [ 20, 70, 7, 540, n / 300 ];
    //  // var xs = [ 540, n / 300 ];
    //  var xs = [ 20, 10, 32, 50, 30 ];
    //  var x = xs[Math.floor(multiplier*8)%xs.length];
    //  var f = x + Math.sin(17 * (n % 7));
    //  //return x * sin(f / 13 ) * 0.02;
    //  return sin(x) * 0.2;

    //  function sin (freq) {
    //    //return Math.sin(tau * t * freq);
    //    return Math.sin( tau * multiplier * freq);
    //  }
    //})

    //b.play();
  }

});
