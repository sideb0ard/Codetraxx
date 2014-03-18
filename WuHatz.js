#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

HATZ = ["wavs/WuTangDrumz/Perkussin/WU_HH_113.wav","wavs/WuTangDrumz/Perkussin/Wu_1p_108_.wav", "wavs/WuTangDrumz/Perkussin/Wu_1p_69_.wav", "wavs/WuTangDrumz/Perkussin/Wu-RZA-Hat71.wav"]

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);
  randNum = codetraxx.randyNum(7);
  if (/[13578]/.test(beat) && microTick == 4 && Math.round(Math.random()*1)) {
    console.log("SKIP!");
  } else {
    exec("play " + HATZ[0] + " delay 1.5 0 0.5");
  }
});
