#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');
var exec = require('child_process').exec;

var tau = Math.PI * 2;
// var sox = " | sox -r 64k -b 8 -c 2 -t raw -e signed-integer - -d";

var sox = " | sox -t raw -r 64k -c 1 -e unsigned -b 8 - -d";


var baudio_funct = function(microTick,tickCounter) {

  //exec("echo " + microTick + " " + tickCounter);
  console.log("tixkk " + microTick + " " + tickCounter);
  var wl = 400 * (Math.pow(0.87055,(Math.random()*10+1)));
  var d=(Math.random()*80000+8000)/wl;

  exec("echo " + d + sox);
  // nowplaying = 0;

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
