#!/usr/bin/env node

var tau = Math.PI * 2;
function sin (t,x) {
  return Math.sin(tau * t * x);
}

var baudio = require('baudio');
var frequency = 220;                      // 220 Hz = "A" note
var samples_length = 44100;               // Plays for 1 second (44.1 KHz)

for (var i=0; i < samples_length ; i++) { // fills array with samples
  var t = i/samples_length;               // time from 0 to 1
  // samples[i] = sin( frequency * 2*PI*t ); // wave equation (between -1,+1)
  console.log( sin( t, frequency * 2* Math.PI * t )); // wave equation (between -1,+1)
}
