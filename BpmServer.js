#!/usr/bin/env node
var amqp = require('./codetraxx_lib.js');

var bpm = 90;
console.log("Setting bpm to " + bpm);

var MIN = 60000;
var tickLength =  (MIN / bpm ) / 4;
var tickCounter = 1;

setInterval(function() {
  beatTick = tickCounter % 32;
  if (beatTick === 0) {beatTick = 32;}
  beat = Math.floor((beatTick + 3) / 4);
  // 
  microTick = tickCounter % 4;
  if (microTick === 0) {microTick = 4;}
  var msg = {"bpm": bpm, "microTick": microTick, "tickLength": tickLength, "beat": beat, "tickCounter": tickCounter};
  console.log("Sending msg -- " + JSON.stringify(msg));
  amqp.publish('bpm',msg);
  tickCounter++;
},tickLength);
