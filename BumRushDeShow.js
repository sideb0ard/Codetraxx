#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/TrpDrumz/Kicks/Kick_7_.wav";
var KICK2 = "wavs/WuTangDrumz/WTC_kyKX/Wu-RZA-Kick69.wav";
var KICK3 = "wavs/KickDrum0013.aif";
var SAMPLEZ = "wavs/TrpDrumz/DJDrops/DjDrop.wav";
var SNARE = "wavs/SnareDrum0012.aif";
var SNARE2 = "wavs/Clap.aif";

function playrrr(wav ){
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

function randyNum(num) {
  return Math.floor((Math.random()*num)+1);
}

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[136]/.test(beat) && /[12]/.test(microTick) ) {
    console.log("MICROTICK IS A " + typeof microTick);
    //exec("play " + KICK2 + " bass +3");
    //exec("play " + KICK3 + " bass +3 allpass 37 1 treble 76");
    exec("play " + KICK + " bass +" + tickCounter % 7 + 10 + " allpass " + (tickCounter % 47) + 20  + " 1 treble " + tickCounter % 36) + 50;
  }
  if (/[35]/.test(beat) && /[13]/.test(microTick) ) {
    //exec("play " + KICK3 + " bass +3");
    //exec("play " + KICK3 + " bass +3 allpass 37 1 treble 76");
    exec("play " + KICK3 + " bass +" + tickCounter % 7 + " allpass " + tickCounter % 27 + " 11 treble " + (tickCounter % 65 + 20));
  }
  if (/[28]/.test(beat) && /[12]/.test(microTick) ) {
    console.log("zzzzZMICROK IS A " + typeof microTick);
    //exec("play " + SNARE);
    randNum = randyNum(7);

    exec("play " + SNARE + " " + SNARE2 + " bass +" + tickCounter % 7 + " allpass " + tickCounter % 27 + " 11 treble " + (tickCounter % 65 + 20));
    console.log("RANYD" + randNum);
    setTimeout( function() {
      return playrrr(SNARE);
    }, randNum);
  }
  //} else if (/[37]/.test(beat) && microTick == 4) {
  //    exec("play " + KICK1 + " bass +3");
  //} else if (/[2468]/.test(beat) && microTick == 1) {
  //  randNum = codetraxx.randyNum(4);
  //  setTimeout( function() {
  //    return playrrr(SNARE);
  //  },randNum);
});