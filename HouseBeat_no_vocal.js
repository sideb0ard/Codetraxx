#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/TrpDrumz/Kicks/Kick_7_.wav";
var KICK2 = "wavs/WuTangDrumz/WTC_kyKX/Wu-RZA-Kick69.wav";
//var KICK3 = "wavs/KickDrum0013.aif";
var KICK3 = "wavs/TrpDrumz/Kicks/Kick_9_.wav";
var KICK4 = "wavs/TrpDrumz/Kicks/Kick_10_.wav";
var SAMPLEZ = "wavs/TrpDrumz/DJDrops/DjDrop.wav";
//var SNARE = "wavs/SnareDrum0012.aif";
var SNARE = "wavs/Clap.aif";

function playrrr(wav ){
  //exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[1357]/.test(beat) && microTick == 1) {
    console.log("MICROTICK IS A " + typeof microTick);
    exec("play " + KICK4 + " bass +" + (tickCounter % 15) );
  } else if (/[15]/.test(beat) && /[4]/.test(microTick) ) {
    exec("play " + KICK3 + " bass +" + (tickCounter % 8) );
  } else if (/[2468]/.test(beat) && microTick == 1) {
    randNum = codetraxx.randyNum(4);
    setTimeout( function() {
      return playrrr(SNARE);
    },randNum);
  }
});
