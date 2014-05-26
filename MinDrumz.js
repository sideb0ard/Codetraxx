#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var exec = require('child_process').exec;

//var KICK = "wavs/TrpDrumz/Kicks/Kick_7_.wav";
//var KICK2 = "wavs/WuTangDrumz/WTC_kyKX/Wu-RZA-Kick69.wav";

var KICKZ = ["wavs/KickDrum0007.aif", "wavs/KickDrum0006.aif", "wavs/TrpDrumz/808/808_18.wav", "wavs/TrpDrumz/808/SubBass1.wav", "wavs/KickDrum0013.aif"];
//var KICKZ = ["wavs/TrpDrumz/Kicks/Kick_23_.wav", "wavs/TrpDrumz/Kicks/Kick_28_.wav" , "wavs/TrpDrumz/Kicks/Kick_18_.wav", "wavs/TrpDrumz/Kicks/Kick_34_.wav"]; 
var SNAREZ = ["wavs/TrpDrumz/Snares/Snare_9.wav", "wavs/TrpDrumz/Snares/Snare_26.wav", "wavs/TrpDrumz/Snares/Snare_38.wav" ];
//var SAMPLEZ = "wavs/TrpDrumz/DJDrops/DjDrop.wav";
var SAMPLEZ = "wavs/TrpDrumz/Sounds/GunCockback.wav";
var CLAP = "wavs/TrpDrumz/Claps/Clap14.wav";

function playrrr(wav, counter){
  //exec("play " + wav + " bass +" + counter % 7);
  exec("play " + wav + " bass +" + counter % 2 + " echo 0.8 0.88 " + counter % 60 + " 0.4");
  //exec("play " + wav + " bass +" + counter % 0.7 + " allpass " + counter % 0.17 + " 11 treble " + (counter % 65 + 2));
  //exec("play " + wav + " bass +" + counter % 7 + 10 + " allpass " + (counter % 47) + 20  + " 1 treble " + counter % 36) + 2; // DANGEROUS!
  //exec("play " + wav + " bass +" + counter % 7 + " allpass " + (counter % 47) + 20  + " 1 treble " + counter % 36) + 2; // DANGEROUS!
  //exec("play " + wav + " bass +" + counter % 6 + 4 + " allpass " + (counter % 7) + 2  + " 1 treble " + counter % 36) + 2;
  //exec("play " + wav + " bass +" + counter % 0.13 + 6 + " allpass " + (counter % 17) + 137  + " 13 treble " + counter % 236) + 220;
  //exec("play " + wav + " bass +" + counter % 0.13 + 2 + " allpass " + (counter % 17) + 37  + " 13 treble " + counter % 136) + 120; // DANG
  //exec("play " + wav + " bass +" + counter % 13 + 6 + " allpass " + (counter % 17) + 37  + " 13 treble " + counter % 36) + 20;
}

function randyNum(num) {
  return Math.floor((Math.random()*num)+1);
}

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  //if (/[15]/.test(beat) && /[14]/.test(microTick) ) {
  //if (/[157]/.test(beat) && /[13]/.test(microTick) ) {
  if (/[145]/.test(beat) && /[134]/.test(microTick) ) {
  //if (/[137]/.test(beat) && /[14]/.test(microTick) ) {
  //if (/[1]/.test(beat) && /[1]/.test(microTick) ) {
  //if (/[13]/.test(beat) && /[1]/.test(microTick) ) {
    console.log("MICROTICK IS A " + typeof microTick);
    if (Math.round(Math.random()*1)) {
      //playrrr(KICKZ[0],tickCounter);
      //playrrr(KICKZ[4],tickCounter);
    }
  }
  //if (/[35]/.test(beat) && /[13]/.test(microTick) ) {
  var randClick= randyNum(3);
  if (/[57]/.test(beat) && randClick == microTick ) {
    console.log("survived! " + randClick);
    //playrrr(KICKZ[1], tickCounter);
    //exec("play " + KICKZ[2] + " bass +3 allpass " + tickCounter % 37 + " 1 treble " + tickCounter % 76);
  }
  //if (/[26]/.test(beat) && /[12]/.test(microTick) ) {
  if (/[2468]/.test(beat) && /[1]/.test(microTick) ) {
    console.log("zzzzZMICROK IS A " + typeof microTick);
    playrrr(CLAP, tickCounter);
    randNum = randyNum(7);
    setTimeout( function() {
      return playrrr(SNAREZ[1], tickCounter);
    }, randNum);
  }
  if (/[24]/.test(beat) && /[1]/.test(microTick) ) {
    if (randyNum(23) > 22) {
      setTimeout( function() {
        //return playrrr(SAMPLEZ,tickCounter);
        return playrrr(SNAREZ[2],tickCounter);
      }, randNum);
    }
  }
});
