#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var baudio  = require('baudio');
var exec = require('child_process').exec;

var tau = Math.PI * 2;

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (/[8]/.test(beat) && /[4]/.test(microTick) ) {
    //console.log("hola");
    //exec("play -n synth 2.5 sin 400 gain 1 bend .35,180,.25  .15,740,.53  0,-520,.3");
    exec("play -n synth 1 sin 240 gain 1 bend .3445,180,.25  77.15,740,.53  0,-520,.3");

  }

});
