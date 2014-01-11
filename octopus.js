#!/usr/bin/env node

var baudio = require('baudio');
var codetraxx = require('./codetraxx_lib.js');

var tau = 2 * Math.PI;

var melody = [0, 440, 880, 220, 0, 220, -220, 330].map(function(x) {
	return Math.pow(2, x)
});

var bpm = false;
var firstTick = false;

codetraxx.subscribe(function(msg) {
	if (!firstTick) {
		firstTick = msg.tickCounter;
	}

	if (msg.beat == 1 && msg.microTick == 1 && !bpm) {
		bpm = parseInt(msg.bpm);
		var b = baudio(function(t) {
		var m = melody[Math.floor(t * bpm / 60 % melody.length)];
		return sin(400 * m) * .1;

		function sin(freq) {
			return Math.sin(tau * t * freq);
		}
		});
		b.play();
	}
});
