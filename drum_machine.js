#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/kick.wav";
var KICK2 = "wavs/KickDrum0016.aif";
var KICK3 = "wavs/KickDrum0013.aif";
//var SNARE = "wavs/SnareDrum0012.aif";
var SNARE = "wavs/Clap.aif";

function playrrr(wav ){
  exec("play " + wav);
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, tick = msg.tick, currentTick = msg.currentTick;
  console.log("BPM: " + bpm + " TICK: " + tick + " CURRENT TICK: " + currentTick);

  if (/[1357]/.test(currentTick)) {
    if (tick % 7 === 0 ) {
      console.log("Modulo beatches!");
      exec("play " + KICK2 + " " + KICK3);
      //playrrr(KICK2,KICK3);
    } else {
      playrrr(KICK);
    }
  } else if (/[2468]/.test(currentTick)) {
    //console.log("Snare! on the " + currentTick);
    randNum = codetraxx.randyNum(400);
    // console.log("randy == " + randNum);
    setTimeout( function() {
      return playrrr(SNARE);
    },randNum);
  }
});
