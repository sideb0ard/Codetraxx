#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var exec = require('child_process').exec;

SOUNDFX1 = "wavs/TrpDrumz/FX/FX_13_.wav";
SOUNDFX2 = "wavs/TrpDrumz/FX/FX_22_.wav";
SOUNDFX3 = "wavs/TrpDrumz/FX/FX_2_Gunshot.wav";
SOUNDFX4 = "wavs/TrpDrumz/Sounds/ComputerArp2.wav";
//var SNARE = "wavs/SnareDrum0012.aif";
var SNARES = ["wavs/TrpDrumz/Snares/Snare_9.wav","wavs/TrpDrumz/Snares/Snare_6.wav","wavs/TrpDrumz/Snares/Snare_17.wav"];

function playrrr(wav ){
  console.log("playing " + wav);
  exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[3]/.test(beat) && microTick == 3) {
    console.log("MICROTICK IS A " + typeof microTick);
    if (tickCounter % 7 === 0 || beat % 3 === 0 ) {
      console.log("Modulo beatches!");
      playrrr(SOUNDFX1);
    } else {
      playrrr(SOUNDFX2);
    }
  } else if (/[7]/.test(beat) && /[3]/.test(microTick)) {
    //randNum = codetraxx.randyNum(40);
    //var CUR_SNARE = "SNARE" + codetraxx.randyNum(3);
    //console.log("CURSNARE :" + CUR_SNARE);
    // playrrr(SOUNDFX3); // GUNSHOT!
    //setTimeout( function() {
    //  return playrrr(CUR_SNARE);
    //},randNum);
  } else if (/[5]/.test(beat) && microTick == 3 && Math.round(Math.random()*1)) {
    console.log("SNEAKY!");
    playrrr(SOUNDFX4);
  }
});
