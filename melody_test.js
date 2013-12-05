#!/usr/bin/env node

var baudio = require('baudio');
var codetraxx = require('./codetraxx_lib.js');

var tau = 2 * Math.PI;

var melody = [ 0, -3/2, 1/5, 4/3, 7/5, 0, -5/6, 1/3 ]
    .map(function (x) { return Math.pow(2, x) })
;

var bpm = false;
var firstTick = false;

codetraxx.subscribe( function(msg) {
	if(!firstTick){
		firstTick = msg.tickCounter;
	}
	
	// can't just check for bpm because of asynch messaging. check for bpm and that first tick and current tick match
	if (!bpm && firstTick == msg.tickCounter) {
		console.log(msg.tickCounter + ", " + firstTick);
		bpm = parseInt(msg.bpm);
		var b = baudio(function (t) {
			// reference:
			//var m = melody[Math.floor(t * 2 % melody.length)];
			var m = melody[Math.floor(t * bpm / 55 % melody.length)];
		    return sin(400 * m);

		    function sin (freq) {
		        return Math.sin(tau * t * freq);
		    }
		});
		b.play();
	}
});

