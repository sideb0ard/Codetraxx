#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/WuTangDrumz/WTC_kyKX/GVDG_k_7_.wav";
var KICK2 = "wavs/WuTangDrumz/WTC_kyKX/GVDG_k_4_.wav";
var KICK3 = "wavs/WuTangDrumz/WTC_kyKX/GVDG_k_3_.wav";
var SNARES = ["wavs/WuTangDrumz/Cynerz/36ChamberSnarEZ/GVD_snr_23_.wav","wavs/WuTangDrumz/Cynerz/36ChamberSnarEZ/WTC_SNR_80_.wav"] 

function playrrr(wav ){
  console.log("playing " + wav);
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[135]/.test(beat) && microTick == 1) {
    console.log("MICROTICK IS A " + typeof microTick);
    if (tickCounter % 7 === 0 || beat % 3 === 0 ) {
      console.log("Modulo beatches!");
      playrrr(KICK2);
    } else {
      playrrr(KICK);
    }
  } else if (/[5]/.test(beat) && /[3]/.test(microTick) && Math.round(Math.random()*1)) {
      playrrr(KICK3);
  } else if (/[26]/.test(beat) && /[12]/.test(microTick)) {
    //randNum = codetraxx.randyNum(40);
    //var CUR_SNARE = "SNARE" + codetraxx.randyNum(3);
    //console.log("CURSNARE :" + CUR_SNARE);
    playrrr(SNARES[codetraxx.randyNum(2)]);
  } else if (/[7]/.test(beat) && microTick == 3 && Math.round(Math.random()*1)) {
    console.log("SNEAKY!");
    exec("play " + SNARE[0] + " " + SNARE[1]);
  }
});
