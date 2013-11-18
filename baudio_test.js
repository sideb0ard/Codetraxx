#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;

var baudio_funct = function() {

  nowplaying = 1;

  var baudio = require('baudio');
  var tau = Math.PI * 2;
  var tune = [ 0, -1/6, 1/2, -3/4, -1/5, 1/6 ]
    .map(function (x) { return 800 * Math.pow(2, x) })
  ;

  var b = baudio(function (t) {
    var f = 120 + Math.sin(1000 * (t % 1));
    var n = tune[Math.floor(t % tune.length)];

    console.log("tttt iz " + t);
    return sin(f)
        * (t % 32 < 8 ? 1 : sin(4))
        + (t % 64 < 16 ? 0 : (t % 3/4 < 3/16) * sin(f) * sin(12))
        + (sawtooth(n) * square(4))
    ;

    function sin (x) {
        return Math.sin(tau * (t % 32) * x);
    }

    function square (x) {
        var n = Math.sin(tau * (t % 32) * x);
        return n > 0 ? 1 : -1;
    }

    function sawtooth (x) {
        return (t % 32) % (1 / x) * x * 2 - 1;
    }
  });
  b.play();

};

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, tick = msg.tick, currentTick = msg.currentTick;
  console.log("BPM: " + bpm + " TICK: " + tick + " CURRENT TICK: " + currentTick);

  if (currentTick === 1 && nowplaying != 1) {
   baudio_funct();
  }

});
