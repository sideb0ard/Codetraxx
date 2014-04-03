#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  // if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  // if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  if (/[1]/.test(microTick) && !nowplaying) {
    nowplaying = 1;
    console.log("BPM IS " + bpm + " !!!yyyy");
    // var b = baudio(function (tt, counter) {
    var n = 0;
    var b = baudio(function (t) {
      //var xs = [ t, 440, t * t ];
      //var xs = [ 43/7, 4/33, 32/23, 3/22, 3/5 ];
      //var xs = [ 4/37, 43/3, 2/23, 5/3, 5/3, 5/4, 2/12, 3/5 ];
      //var xs = [ 4/37, 43/3, 3/5 ];
      var xs = [ 4/43, 4/4343, 43/7774 ];
      var x = xs[Math.floor( t * 33) % xs.length];
      // var x = Math.sin((t / bpm) * 262 + Math.sin(n));
      // var x = Math.sin((t * ( bpm / 60 )) * 77 + Math.sin(n));
      var multi = 60 / bpm;
      n += Math.sin(t / 0.22);
      // n += Math.sin(t * ( bpm / 120));
      // codetraxx.publish('zork',{"val": x});
      var vol = ("0." + Math.floor(t % 5));
      //return (square(x) + square(x+multi)) / 2 * vol ;
      return sin(x) + sin(multi) * (vol);
      //return sin(1) * sin(multi) * (vol);
      //return sin(200) / 2;

      function sin (x) { return Math.sin(tau * t * x); }
      function square (x) { return sin(x) > 0 ? 1 : -1; }
    });
    b.play();

  }

});
