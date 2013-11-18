#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var HAT = "wavs/Hihat0004.aif";
var HAT2 = "wavs/Hihat0003.aif";

function playrrr(wav){
    exec("play " + wav + " chorus 0.7 0.9 55 0.4 0.25 2 −t bend .35,180,.25  .15,740,.53 trim 10 treble +2");
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);
  randNum = codetraxx.randyNum(20);
  if (Math.floor(tickCounter % 14)) {
    if ( Math.round(Math.random()*1) ) {
      if (beat % 7 === 0) {
        console.log("REVERSE!");
        exec("play " + HAT + " " + HAT2 + " reverse");
      } else {
        console.log("Random!");
        setTimeout(playrrr(HAT), 3);
      }
    } else {
      console.log("Nomr!" + randNum);
      // exec("play " + HAT + " " + HAT2 + " trim 10 chorus 0.7 0.9 55 0.4 0.25 2 -t");
      setTimeout(function() {
        return exec("play " + HAT + " " + HAT2);
      }, randNum);
    }
  }
});
