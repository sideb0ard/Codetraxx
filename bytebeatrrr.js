#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

function decimalPlaces(num) {
  console.log("HERE!");
  //console.log("IN FUNC WITH " + num.toString());
  //var match = /\.(\d+)/.exec(num.toString());
  //return match;
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);
  if (beat === 1 && microTick === 1 && !nowplaying) {

    nowplaying = 1;

    console.log("STARTING!");

    //var b = baudio(function (tt, counter) {
    var b = baudio(function (tt, t) {
      var vol = 0.23;
      var tikMulti = ( bpm / 60 );
      var tikMod = tt % tikMulti;
      //console.log("helllllla MODULO " + tikMod);
      //console.log("TT + COUNTER " + tt + " " + counter);

      //numz = tt * (((tt>>12) | (tt>>8) ) & ( 63 & (tt>>4)))
      var a = 13, b = 8, c = 63, d = 4;
      //var a = 7, b = 6, c = 10, d = 4, e = 13, f = 6;
      //var a = 80, b = 40, c = 5, d = 160, e = 240, f = 8, g = 3.43,;
      var numz = t * (((t>>a) || (t>>b) ) && ( c && (t>>d)))
      //numz =  (t>>7|t|t>>6)*10+4*(t&t>>13|t>>6)
      //console.log("TT " + tt + " NU<Z " + numz);
      return (numz);
      
      function sin (x) {
          return Math.sin(tau * tikMod * x);
      }
      
    });

    b.play();

  };

});
