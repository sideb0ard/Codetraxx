#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var exec = require('child_process').exec;

var ticktick = "wavs/TrpDrumz/HiHats/Hi_Hat_1.wav";

function playrrr(wav) {
	exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe('bpm', function(msg) {
	var bpm = msg.bpm,
		microTick = msg.microTick,
		tickCounter = msg.tickCounter,
		beat = msg.beat;
	console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

	if (/[1357]/.test(beat) && /[12]/.test(microTick)) {
		playrrr(ticktick);
	}
});
