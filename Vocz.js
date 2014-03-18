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

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[56]/.test(beat) && microTick == 3 && Math.round(Math.random()*1)) {
    console.log("SNEAKY!");
    exec("play " + SAMPLEZ + " bass +3");
  }
});
