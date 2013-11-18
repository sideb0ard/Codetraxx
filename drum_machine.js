#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/kick.wav";
var KICK2 = "wavs/KickDrum0016.aif";
var KICK3 = "wavs/KickDrum0013.aif";
//var SNARE = "wavs/SnareDrum0012.aif";
var SNARE = "wavs/Clap.aif";

function playrrr(wav ){
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[1357]/.test(beat) && microTick == 1) {
    console.log("MICROTICK IS A " + typeof microTick);
    if (beat % 7 === 0 || beat % 3 === 0 ) {
      console.log("Modulo beatches!");
      exec("play " + KICK2 + " " + KICK3 + " bass +3");
      //playrrr(KICK2,KICK3);
    } else {
      playrrr(KICK);
    }
  } else if (/[2468]/.test(beat) && microTick == 1) {
    //console.log("Snare! on the " + currentTick);
    randNum = codetraxx.randyNum(40);
    // console.log("randy == " + randNum);
    setTimeout( function() {
      return playrrr(SNARE);
    },randNum);
  }
});
