#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var HAT = "wavs/Hihat0001.aif";
var HAT2 = "wavs/Hihat0002.aif";

function playrrr(wav){
    exec("play " + wav + " trim 10");
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, tick = msg.tick, currentTick = msg.currentTick;
  console.log("currentTick " + currentTick);
  randNum = codetraxx.randyNum(40);
  if ( Math.round(Math.random()*1) ) {
    if (tick % 7 === 0) {
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
});
