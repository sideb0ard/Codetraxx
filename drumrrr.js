#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/TrpDrumz/808/808_13.wav";
var KICK2 = "wavs/TrpDrumz/808/808_3.wav";
//var SNARE = "wavs/SnareDrum0012.aif";
var SNARES = ["wavs/TrpDrumz/Snares/Snare_9.wav","wavs/TrpDrumz/Snares/Snare_6.wav","wavs/TrpDrumz/Snares/Snare_17.wav"];

function playrrr(wav ){
  console.log("playing " + wav);
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[15]/.test(beat) && microTick == 1) {
    console.log("MICROTICK IS A " + typeof microTick);
    if (tickCounter % 7 === 0 || beat % 3 === 0 ) {
      console.log("Modulo beatches!");
      playrrr(KICK2);
    } else {
      playrrr(KICK);
    }
  } else if (/[48]/.test(beat) && /[123]/.test(microTick)) {
    //randNum = codetraxx.randyNum(40);
    //var CUR_SNARE = "SNARE" + codetraxx.randyNum(3);
    //console.log("CURSNARE :" + CUR_SNARE);
    playrrr(SNARES[codetraxx.randyNum(3)]);
    //setTimeout( function() {
    //  return playrrr(CUR_SNARE);
    //},randNum);
  } else if (/[5]/.test(beat) && microTick == 3 && Math.round(Math.random()*1)) {
    console.log("SNEAKY!");
    exec("play " + SNARE[2] + " " + SNARE[1]);
  }
});
