#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var baudio  = require('baudio');
var exec = require('child_process').exec;

var tau = Math.PI * 2;

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (/[1]/.test(beat) && /[1]/.test(microTick) ) {
    //console.log("hola");
    exec("play -n synth 2.7 sin 400 gain 1 bend .35,180,.25  .15,740,.53  0,-520,.3");
    //exec("play -n synth 2.5 sin 400 gain 1 bend .35,180,.25  .15,740,.53  0,-520,.3");

  }

});
