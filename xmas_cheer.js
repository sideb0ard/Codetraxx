#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var exec = require('child_process').exec;

var KICK = "wavs/kick.wav";
var CRASH = "wavs/TrpDrumz/Crash/Crash\\ \\(7\\).wav";
var REVCRASH = "wavs/TrpDrumz/Crash/Rev\\ Crash\\ \\(2\\).wav";
var tractorBeam = "wavs/TrpDrumz/FX/FX_28_.wav";
var bleepbleep = "wavs/TrpDrumz/FX/FX_27_.wav";
var ticktick = "wavs/TrpDrumz/HiHats/Hi_Hat_1.wav";
var HAT1 = "wavs/WuTangDrumz/Perkussin/Wu-RZA-Hat1.wav";
var SNARE = "wavs/WuTangDrumz/Cynerz/Wu\\ Snarez/W1_S\\ \\(20\\).wav";

function playrrr(wav) {
	exec("play " + wav + " bass +7 echo 0.8 0.88 60 0.4");
}

codetraxx.subscribe('bpm', function(msg) {
	var bpm = msg.bpm,
		microTick = msg.microTick,
		tickCounter = msg.tickCounter,
		beat = msg.beat;
	//console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

	if (/[15]/.test(beat) && microTick == 1) {

		playrrr(KICK);
		if (beat == 1 && microTick == 1) {
			playrrr(ticktick);
		}
	} else if (beat == 5 && microTick == 2) {
		playrrr(KICK);
	}

	if (beat == 1 && /[124]/.test(microTick)) {
		playrrr(HAT1)
	}

	if (tickCounter % 64 == 0) {
		var coin = Math.floor(Math.random() * 100);
		if (coin / 2 == Math.floor(coin / 2)) {
			playrrr(tractorBeam);
		}
	}
	
	if (tickCounter % 48 == 0) {
		var coin = Math.floor(Math.random() * 100);
		if (coin / 2 == Math.floor(coin / 2)) {
			playrrr(bleepbleep);
		}
	}


});
