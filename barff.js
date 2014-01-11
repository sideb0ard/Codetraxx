#!/usr/bin/env node

var baudio = require('baudio');
var codetraxx = require('./codetraxx_lib.js');

var tau = 2 * Math.PI;

var bpm = false;
var firstTick = false;

codetraxx.subscribe( function(msg) {
	if(!firstTick){
		firstTick = msg.tickCounter;
	}
	
	if (msg.beat == 1 && msg.microTick == 1 && !bpm){
		bpm = parseInt(msg.bpm);
		var b = baudio(function (t) {
			
			var multi = t* ( bpm / 60);
			
			return sin(50) + sin(50 + ( bpm / 60)) + sin(200);

		    function sin (freq) {
		        return Math.sin(tau * multi * freq);
		    }
		});
		b.play();
	}
});