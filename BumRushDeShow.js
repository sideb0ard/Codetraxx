#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

//var KICK = "wavs/TrpDrumz/Kicks/Kick_7_.wav";
//var KICK2 = "wavs/WuTangDrumz/WTC_kyKX/Wu-RZA-Kick69.wav";
var KICK = "wavs/TrpDrumz/808/808_18.wav";
var KICK2 = "wavs/TrpDrumz/808/SubBass1.wav";
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

  if (/[13456]/.test(beat) && /[12]/.test(microTick) ) {
  //if (/[137]/.test(beat) && /[14]/.test(microTick) ) {
  //if (/[1]/.test(beat) && /[1]/.test(microTick) ) {
  //if (/[13]/.test(beat) && /[1]/.test(microTick) ) {
    console.log("MICROTICK IS A " + typeof microTick);
    //exec("play " + KICK3 + " bass +3");
    //exec("play " + KICK3 + " bass +" + tickCounter % 1.3 + 7);
    //exec("play " + KICK3 + " bass +3 allpass 37 1 treble 76");
    //exec("play " + KICK + " bass +" + tickCounter % 7 + 10 + " allpass " + (tickCounter % 47) + 20  + " 1 treble " + tickCounter % 36) + 2;
    exec("play " + KICK + " bass +" + tickCounter % 7 + 14 + " allpass " + (tickCounter % 7) + 2  + " 1 treble " + tickCounter % 36) + 2;
    //exec("play " + KICK3 + " bass +" + tickCounter % 0.13 + 6 + " allpass " + (tickCounter % 17) + 37  + " 13 treble " + tickCounter % 36) + 20;
    //exec("play " + KICK3 + " bass +" + tickCounter % 13 + 6 + " allpass " + (tickCounter % 17) + 37  + " 13 treble " + tickCounter % 36) + 20;
  }
  //if (/[35]/.test(beat) && /[13]/.test(microTick) ) {
  if (/[5]/.test(beat) && /[1]/.test(microTick) ) {
    //exec("play " + KICK3 + " bass +" + tickCounter % 0.6 + " treble " + tickCounter % 42);
    //exec("play " + KICK3 + " bass +3 allpass 37 1 treble 76");
    //exec("play " + KICK3 + " bass +" + tickCounter % 7 + " allpass " + tickCounter % 27 + " 11 treble " + (tickCounter % 65 + 20));
  }
  //if (/[26]/.test(beat) && /[12]/.test(microTick) ) {
  if (/[246]/.test(beat) && /[1]/.test(microTick) ) {
    console.log("zzzzZMICROK IS A " + typeof microTick);
    //exec("play " + SNARE);
    randNum = randyNum(7);

    //exec("play " + SNARE + " " + SNARE2 + " bass +" + tickCounter % 7 + " allpass " + tickCounter % 17 + " 11 treble " + (tickCounter % 65 + 20));
    exec("play " + SNARE2 + " bass +" + tickCounter % 0.7 + " allpass " + tickCounter % 0.17 + " 11 treble " + (tickCounter % 65 + 2));
    //console.log("RANYD" + randNum);
    //setTimeout( function() {
    //  return playrrr(SNARE2);
    //}, randNum);
  }
});
