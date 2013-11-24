#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');
var exec = require('child_process').exec;

var tau = Math.PI * 2;
var sox = " | sox -r 44100 -b 16 -c 2 -t raw -e signed-integer - -d"

var baudio_funct = function(microTick,tickCounter) {

  // console.log("TICKCOUNTER:: " + tickCounter);

  donk = (microTick / 7);
  var t = tickCounter % 3;
  var n = t % 23;
  var xs = [ 120, 1, 240, 450, 20 ];
  // var xs = [ 74, 773, 50, 4 ];
  // var xs = [ 74, tickCounter, 77, 3 , 4 ];

  //var speed = tickCounter % 8 > 7 ? 16 : 2;
  //var x = xs[Math.floor(t*speed)%xs.length]
  //var z = tickCounter % 8 < 7 ? 100 : 80;

  //var f = x + Math.sin(z * (t  % 1));

  synthy = Math.sin(tau * microTick);
  //synthy = Math.sin(tau * donk)
  //+ 0.23 * Math.sin(tau * t * f)
  //+ (t % (1/2) < 1/23 ? Math.random() : 0)
  //+ 0.01 * Math.sin(tau * t * (f * 2 + 4))
  //+ 73 * Math.sin(tau * t);

  console.log("echo echo! " + synthy);
  exec("echo " + synthy + sox);

  nowplaying = 0;
  //return (
    //+ (t % (1/2) < 1/24 ? Math.random() : 0)
  //);

  //function sin (x) {
  //    return Math.sin(tau * t * x);
  //}
  // b.play();

};

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter + " NOWPLAYING: " + nowplaying);

  //if (/[1234]/.test(beat) && /[123]/.test(microTick) && nowplaying != 1) {
   //nowplaying = 1;
   //console.log("hola");
   baudio_funct(microTick,tickCounter);
  //}

});
