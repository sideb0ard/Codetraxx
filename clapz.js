#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var sys = require('sys');
var exec = require('child_process').exec;

var CLAP = "wavs/Clap.aif";

codetraxx.subscribe( function(msg) {
  var infoArr = /bpm:(\d*)\|\|tick:(\d*)\|\|currentTick:(\d*)/.exec(msg.data.toString('utf-8'));
  var bpm = infoArr[1];
  var tick = infoArr[2];
  var currentTick = infoArr[3];

  if (msg.data.toString('utf-8').match("currentTick:[157]")) {
    console.log("boo");
    exec("play " + CLAP);
  }


});
