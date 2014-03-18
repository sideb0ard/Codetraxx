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
      var xs = [ t, 444, 330 ];
      var x = xs[Math.floor( t * 33) % xs.length];
      // var x = Math.sin((t / bpm) * 262 + Math.sin(n));
      // var x = Math.sin((t * ( bpm / 60 )) * 77 + Math.sin(n));
      var multi = t * ( bpm / 120);
      n += Math.sin(t / 0.22);
      // n += Math.sin(t * ( bpm / 120));
      var mx = { "val": x};
      console.log("Sending msg -- " + JSON.stringify(mx));
      codetraxx.publish('tr33tzx',mx);
      return sin(1) * 0.4;
      function sin (x) {
        // return Math.sin(tau * multi * x);
        return Math.sin(tau * x);
      }
    });
    b.play();

  }

});
