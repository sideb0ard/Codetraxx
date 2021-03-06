#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var exec = require('child_process').exec;

var KICK = "wavs/WuTangDrumz/WTC_kyKX/Wu-RZA-Kick64.wav";
var HATZ = "wavs/WuTangDrumz/Perkussin/Wu-RZA-Hat74.wav";
var HATZ2 = "wavs/WuTangDrumz/Perkussin/Wu-RZA-Hat7.wav";
var KICK2 = "wavs/KickDrum0016.aif";
var KICK3 = "wavs/KickDrum0013.aif";
//var SNARE = "wavs/SnareDrum0012.aif";
var CLAP = "wavs/Clap.aif";
var SNARE = "wavs/WuTangDrumz/Cynerz/KillaSN/WU_SN_043.wav";

function playrrr(wav ){
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[134567]/.test(beat) && /[134]/.test(microTick) )  {
  //if (/[16]/.test(beat) && /[134]/.test(microTick) )  {
    if (beat % 7 === 0 || beat % 3 === 0 ) {
      console.log("Modulo beatches!");
      exec("play " + HATZ + " bass +" + tickCounter % 0.23);
    } else {
      exec("play " + HATZ + " " + HATZ2 + " bass +" + tickCounter % 0.3);
      playrrr(HATZ);
    }
  } else if (/[15]/.test(beat) && /[123]/.test(microTick) ) {
      exec("play " + KICK + " bass +3");
  } else if (/[2468]/.test(beat) && microTick == 1) {
    console.log("else..")
    randNum = codetraxx.randyNum(40);
    setTimeout( function() {
      return playrrr(CLAP);
      //return playrrr(SNARE);
      //exec("play " + SNARE + " " + CLAP + " bass +3");
    },randNum);
  }
});
