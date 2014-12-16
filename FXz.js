#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var exec = require('child_process').exec;

//SOUNDFX1 = "wavs/TrpDrumz/FX/FX_13_.wav";
//SOUNDFX2 = "wavs/TrpDrumz/FX/FX_22_.wav";
//SOUNDFX3 = "wavs/TrpDrumz/FX/FX_2_Gunshot.wav";
//SOUNDFX4 = "wavs/TrpDrumz/Sounds/ComputerArp2.wav";
SOUNDFX1 = "wavs/TrpDrumz/FX/FX_36_RZR.wav";
SOUNDFX2 = "wavs/TrpDrumz/FX/FX_40_.wav";
SOUNDFX3 = "wavs/TrpDrumz/FX/FX_41_.wav";
SOUNDFX4 = "wavs/TrpDrumz/Chants/Chant_21.wav";
SOUNDFX4 = "wavs/TrpDrumz/Chants/Chant_25.wav";
//SOUNDFX1 = "wavs/TrpDrumz/Sounds/ChipSound.wav";
//SOUNDFX2 = "wavs/TrpDrumz/Sounds/ChipSound.wav";
//SOUNDFX3 = "wavs/TrpDrumz/Sounds/ChipSound.wav";
//SOUNDFX4 = "wavs/TrpDrumz/Sounds/ChipSound.wav";
//var SNARE = "wavs/SnareDrum0012.aif";
var SNARES = ["wavs/TrpDrumz/Snares/Snare_9.wav","wavs/TrpDrumz/Snares/Snare_6.wav","wavs/TrpDrumz/Snares/Snare_17.wav"];

function playrrr(wav, tickCounter ){
  console.log("playing " + wav);
  exec("play " + wav + " bass +7 echo 0.8 0.88 " + tickCounter % 60 + " 0.4");
}

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[1]/.test(beat) && microTick == 3 && Math.round(Math.random()*1)) {
    console.log("MICROTICK IS A " + typeof microTick);
    playrrr(SOUNDFX1, tickCounter);
    //if (tickCounter % 7 === 0 || beat % 3 === 0 ) {
    //  console.log("Modulo beatches!");
    //} else {
    //  playrrr(SOUNDFX2);
    //}
  } else if (/[7]/.test(beat) && /[3]/.test(microTick) && Math.round(Math.random()*1) && Math.round(Math.random()*1)) {
    //randNum = codetraxx.randyNum(40);
    //var CUR_SNARE = "SNARE" + codetraxx.randyNum(3);
    //console.log("CURSNARE :" + CUR_SNARE);
    //playrrr(SOUNDFX3);
    //setTimeout( function() {
    //  return playrrr(CUR_SNARE);
    //},randNum);
    playrrr(SOUNDFX5, tickCounter);

  } else if (/[37]/.test(beat) && /[1]/.test(microTick) && Math.round(Math.random()*1)) {
    console.log("SNEAKY!");
    playrrr(SOUNDFX4, tickCounter);
  }
});
