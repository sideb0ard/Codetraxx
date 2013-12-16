#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var e808s = ["wavs/TrpDrumz/808/808_3.wav","wavs/TrpDrumz/808/808_3.wav","wavs/TrpDrumz/808/808_3.wav"];

function playrrr(wav ){
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[5]/.test(beat) && microTick == 1) {
    //console.log("MICROTICK IS A " + typeof microTick);
    //if (beat % 7 === 0 || beat % 3 === 0 ) {
    //  console.log("Modulo beatches!");
    //  exec("play " + KICK2 + " " + KICK3 + " bass +3");
    //} else {
    //playrrr(e808s[0]);
    //}
  } else if (/[7]/.test(beat) && microTick == 1) {
    //randNum = codetraxx.randyNum(40);
    //setTimeout( function() {
      //return playrrr(SNARE);
    //},randNum);
    playrrr(e808s[1]);
  } else if (/[2]/.test(beat) && microTick == 1 && currentTick % 7 == 0 && Math.round(Math.random()*1)) {
    console.log("SNEAKY!");
    exec("play " + e808s[2] );
  }
});
