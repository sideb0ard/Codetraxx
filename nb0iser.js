#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

var baudio_funct = function(tickCounter) {

  nowplaying = 1;

  // console.log("TICKCOUNTER:: " + tickCounter);
  // console.log(typeof tickCounter); 

  var b = baudio(function (tt, tickCounter) {
    // console.log("TICKCOUNTER:: " + tickCounter);
    donk = (tickCounter / 1774);
    var t = donk % 3;
    var n = t % 7;
    // var xs = [ 120, 1, 240, 450, 20 ];
    // var xs = [ 74, 773, 50, 4 ];
    var xs = [ 74, tickCounter, donk, 4 , 3 ];

    var speed = tt % 3 > 7 ? 16 : 2;
    var x = xs[Math.floor(t*speed)%xs.length]
    var z = tt % 8 < 7 ? 1000 : 80;

    var f = x + Math.sin(z * (t % 1));
    // var f = x + Math.sin(z * (t  % 1));

    nowplaying = 0;
    return (
        // 73 * Math.sin(tau * f)
        0.15 * Math.sin(tau * t * f)
        + 0.1 * Math.sin(tau * t * (f * 2 + 4))
        + (t % (1/2) < 1/24 ? Math.random() : 0)
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

  //if (beat === 1 && microTick === 1 && !nowplaying) {
   //console.log("hola");
   baudio_funct(tickCounter);
  //}

});