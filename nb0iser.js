#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

var baudio_funct = function() {

  nowplaying = 1;

  var b = baudio(function (tt) {
    var t = tt % 8;
    
    var n = t % 7;
    var xs = [ 120, 240, 450, 20 ];
    
    var speed = tt % 8 > 7 ? 16 : 2;
    var x = xs[Math.floor(t*speed)%xs.length]
    var z = tt % 8 < 7 ? 1000 : 80;
    
    var f = x + Math.sin(z * (t % 1));
    
    return (
        0.15 * Math.sin(tau * t * f)
        + 0.1 * Math.sin(tau * t * (f * 2 + 4))
        + (t % (1/2) < 1/24 ? Math.random() : 0)
    );
    
    function sin (x) {
        return Math.sin(tau * t * x);
    }
});

//  b = baudio(function (t) {
//      //console.log("ug!");
//      nowplaying = 0;
//      return Math.sin(2 * Math.PI * 1760 * t) * (t < 0.1);
//  })
  b.play();

};

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (beat === 1 && !nowplaying) {
   console.log("hola");
   baudio_funct();
  }

});
