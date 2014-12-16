#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var exec = require('child_process').exec;

//var KICK = "wavs/kick.wav";
//var KICK2 = "wavs/KickDrum0016.aif";
//var KICK3 = "wavs/KickDrum0013.aif";
//var SNARE = "wavs/SnareDrum0012.aif";
//var SNARE = "wavs/Clap.aif";
var KICK = "wavs/WuTangDrumz/WTC_kyKX/GVDG_k_4_.wav";
var KICK2 = "wavs/WuTangDrumz/WTC_kyKX/GVDG_k_5_.wav";
var KICK3 = "wavs/WuTangDrumz/WTC_kyKX/GVDG_k_7_.wav";
var SNARE = "wavs/WuTangDrumz/Perkussin/Wu_1p_116_.wav";

function playrrr(wav,tickCounter ){
  console.log("TICKKKY: " + tickCounter);
  exec("play " + wav + " bass +" + tickCounter % 7 + " echo 0.8 0.88 " + tickCounter % 60 + " 0.4");
  //console.log("play " + wav + " bass +" + tickCounter % 7 + " echo 0.8 0.88" + tickCounter % 60 + " 0.4");
}

codetraxx.subscribe('bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[157]/.test(beat) && /[14]/.test(microTick)) {
  //if (/[1357]/.test(beat) && microTick == 1) {
    if (beat % 7 === 0 || beat % 3 === 0 ) {
      console.log("Modulo beatches!");
      exec("play " + KICK2 + " " + KICK3 + " bass +" + tickCounter % 7);
    } else {
      playrrr(KICK, tickCounter);
    }
  } else if (/[2468]/.test(beat) && microTick == 1) {
    randNum = codetraxx.randyNum(7);
    setTimeout( function() {
      return playrrr(SNARE, tickCounter);
    },randNum);
  } else if (/[5]/.test(beat) && microTick == 4 && Math.round(Math.random()*1)) {
    console.log("SNEAKY!");
    exec("play " + KICK2 + " " + KICK3 + " bass +" + tickCounter % 3);
  }
});
