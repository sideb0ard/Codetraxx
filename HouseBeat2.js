#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/TrpDrumz/Kicks/Kick_7_.wav";
var KICK2 = "wavs/WuTangDrumz/WTC_kyKX/Wu-RZA-Kick69.wav";
var KICK3 = "wavs/KickDrum0013.aif";
var SAMPLEZ = "wavs/TrpDrumz/DJDrops/SouthSide.wav";
//var SNARE = "wavs/SnareDrum0012.aif";
var SNARE = "wavs/WuTangDrumz/Cynerz/KillaSN/WU_SN_107.wav";

function playrrr(wav ){
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[17]/.test(beat) && microTick == 4) {
    console.log("MICROTICK IS A " + typeof microTick);
    playrrr(KICK2);
  } else if (/[268]/.test(beat) && /[1]/.test(microTick)) {
    randNum = codetraxx.randyNum(4);
    setTimeout( function() {
      return playrrr(SNARE);
    },randNum);
  } else if (/[25]/.test(beat) && microTick == 1 && Math.round(Math.random()*1)) {
    console.log("SNEAKY!");
    exec("play " + SAMPLEZ + " bass +3");
  }
});
