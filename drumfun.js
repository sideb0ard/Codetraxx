#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/kick.wav";
var CRASH = "wavs/TrpDrumz/Crash/Crash\\ \\(7\\).wav";
var REVCRASH = "wavs/TrpDrumz/Crash/Rev\\ Crash\\ \\(2\\).wav";
var HAT1 = "wavs/WuTangDrumz/Perkussin/Wu-RZA-Hat1.wav";
var SNARE = "wavs/WuTangDrumz/Cynerz/Wu\\ Snarez/W1_S\\ \\(20\\).wav";

function playrrr(wav) {
	exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe(function(msg) {
	var bpm = msg.bpm,
		microTick = msg.microTick,
		tickCounter = msg.tickCounter,
		beat = msg.beat;
	console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

	playrrr(HAT1);

	if (/[1357]/.test(beat) && microTick == 1) {
		playrrr(KICK);
		if (beat == 1 && microTick == 1) {
			playrrr(REVCRASH);
		}
	} else if (beat == 5 && microTick == 2) {
		playrrr(KICK);
	} else if (beat == 4 && microTick == 1) {
		playrrr(CRASH);
	} else if (/[2468]/.test(beat) && microTick == 1) {
		playrrr(SNARE);
	}
});
