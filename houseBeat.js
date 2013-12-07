#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/TrpDrumz/Kicks/Kick_7_.wav";
var KICK2 = "wavs/WuTangDrumz/WTC_kyKX/Wu-RZA-Kick69.wav";
var KICK3 = "wavs/KickDrum0013.aif";
var SAMPLEZ = "wavs/TrpDrumz/DJDrops/DjDrop.wav";
//var SNARE = "wavs/SnareDrum0012.aif";
var SNARE = "wavs/Clap.aif";

function playrrr(wav ){
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[134578]/.test(beat) && microTick == 1) {
    console.log("MICROTICK IS A " + typeof microTick);
    if (beat % 7 === 0 || beat % 3 === 0 ) {
      console.log("Modulo beatches!");
      exec("play " + KICK2 + " " + KICK3 + " bass +3");
    } else {
      playrrr(KICK2);
    }
  } else if (/[2468]/.test(beat) && microTick == 1) {
    randNum = codetraxx.randyNum(4);
    setTimeout( function() {
      return playrrr(SNARE);
    },randNum);
  } else if (/[5]/.test(beat) && microTick == 3 && Math.round(Math.random()*1)) {
    console.log("SNEAKY!");
    exec("play " + SAMPLEZ + " bass +3");
  }
});
