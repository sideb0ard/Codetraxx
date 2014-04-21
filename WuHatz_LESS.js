#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

function playrrr(wav, tickCounter ){
    exec("play " + wav + " echo 0.8 0.88 " + tickCounter % 60 + " 0.4");
}

HATZ = ["wavs/WuTangDrumz/Perkussin/WU_HH_113.wav","wavs/WuTangDrumz/Perkussin/Wu_1p_108_.wav", "wavs/WuTangDrumz/Perkussin/Wu_1p_69_.wav", "wavs/WuTangDrumz/Perkussin/Wu-RZA-Hat71.wav"]

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);
  randNum = codetraxx.randyNum(5);
  if (/[13]/.test(beat) || /[34]/.test(microTick) && Math.round(Math.random()*1)) {
    exec("play " + HATZ[0]);
    //console.log("SKIP!");
  } else {
    console.log("PLAY!");
    setTimeout( function() {
      return playrrr(HATZ[1],tickCounter);
    },randNum);
  }
});
