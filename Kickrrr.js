#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var exec = require('child_process').exec;

var KICK = ["wavs/TrpDrumz/Kicks/Kick_13_.wav", "wavs/TrpDrumz/Kicks/Kick_6_.wav"];
var SNARE = ["wavs/TrpDrumz/Snares/Snare_7.wav","wavs/TrpDrumz/Snares/Snare_14.wav"];

function playrrr(wav ){
  console.log("playing " + wav);
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

var i = 0;

codetraxx.subscribe( 'bpm', function(msg) {
  console.log("MSG:" + JSON.stringify(msg));
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);
  console.log("I!! " + i);

  if (i < 23 ) {
    if (/[15]/.test(beat) && microTick == 1) {
      exec("play " + KICK[0] + " " + KICK[1]);
      //exec("play " + KICK[1]);
    } else if (/[36]/.test(beat) && /[24]/.test(microTick)) {
      exec("play " + KICK[0] + " " + KICK[1]);
      //exec("play " + KICK[1]);
    } else if (/[246]/.test(beat) && /[1]/.test(microTick)) {
      //playrrr(SNARE[codetraxx.randyNum(1)]);
      playrrr(SNARE[0]);
    } else if (/[6]/.test(beat) && /[13]/.test(microTick)) {
      playrrr(SNARE[0]);
    }
  } else {
    console.log("SECOND LOOP!");
    if (/[135]/.test(beat) && /[14]/.test(microTick)) {
      exec("play " + KICK[0] + " " + KICK[1]);
      //exec("play " + KICK[1]);
    } else if (/[268]/.test(beat) && /[3]/.test(microTick)) {
      //playrrr(SNARE[codetraxx.randyNum(1)]);
      playrrr(SNARE[0]);
    }
  }
  i++;
  if (i === 32) { i = 0; }
});
