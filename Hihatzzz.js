#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var exec = require('child_process').exec;

HATZ = ["wavs/WuTangDrumz/Perkussin/WU_HH_067.wav", "wavs/TrpDrumz/HiHats/Hi_Hat_1.wav", "wavs/TrpDrumz/HiHats/Hi_Hat_15.wav"];

function playrrr(wav){
    exec("play " + wav + " chorus 0.7 0.9 55 0.4 0.25 2 −t bend .35,180,.25  .15,740,.53 trim 10 treble +2");
    //exec("play " + wav);
}

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);
  //playrrr(HATZ[Math.floor(Math.random()*HATZ.length)]);
  //playrrr(HATZ[1]);
  exec("play " + HATZ[Math.floor(Math.random()*HATZ.length)] + " " + HATZ[0] + " reverse");
  randNum = codetraxx.randyNum(7);
  if (Math.floor(tickCounter % 3 === 0)) {
    if ( Math.round(Math.random()*1) ) {
      if (beat % 7 === 0) {
        console.log("REVERSE!");
        exec("play " + HATZ[Math.floor(Math.random()*HATZ.length)] + " " + HATZ[0] + " reverse");
      } else {
        console.log("Random!");
        setTimeout(playrrr(HATZ[Math.floor(Math.random()*HATZ.length)]), 3);
      }
    } else {
      console.log("Nomr!" + randNum);
      // exec("play " + HAT + " " + HAT2 + " trim 10 chorus 0.7 0.9 55 0.4 0.25 2 -t");
      setTimeout(function() {
        return exec("play " + HATZ[0] + " " + HATZ[1]);
      }, randNum);
    }
  }
});
