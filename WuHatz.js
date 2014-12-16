#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var exec = require('child_process').exec;

HATZ = ["wavs/WuTangDrumz/Perkussin/WU_HH_113.wav","wavs/WuTangDrumz/Perkussin/Wu_1p_108_.wav", "wavs/WuTangDrumz/Perkussin/Wu_1p_69_.wav", "wavs/WuTangDrumz/Perkussin/Wu-RZA-Hat71.wav"]

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);
  randNum = codetraxx.randyNum(7);
  if (/[13578]/.test(beat) && microTick == 4 && Math.round(Math.random()*1)) {
    console.log("SKIP!");
  } else {
    console.log("PLAY!");
    //exec("play " + HATZ[0] + " chorus " + (tickCOunter % 0.7) * 7 + (tickCounter % 0.9) + 70 + " 35 0.4 0.25 2 -t");
    //exec("play " + HATZ[0] + " chorus 7 " + (tickCounter % 0.9) + " 35 0.4 0.25 2 -t");
    exec("play " + HATZ[0] + " chorus 7 0.9 35 0.4 0.25 2 -t");
    //exec("play " + HATZ[0]);
  }
});
