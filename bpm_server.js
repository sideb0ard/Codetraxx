#!/usr/bin/env node
var amqp = require('./amqp_connection');

var bpm = process.argv[2];
if(typeof bpm == 'undefined') {
  console.log("loser! need a bpm");
  process.exit(1);
}
console.log("Setting bpm to " + bpm);

var MIN = 60000;
var ticks = MIN / bpm;
var tick = 1;

setInterval(function() {
  currentTick = tick % 8;
  if (currentTick === 0) {currentTick = 8;}
  console.log("Sending tick -- " + currentTick);
  amqp.publish("bpm:" + bpm + "||tick" +  tick + "||currentTick" + currentTick);
  tick++;
},ticks);
