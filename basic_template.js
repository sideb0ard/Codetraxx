#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var sys = require('sys');
var exec = require('child_process').exec;

//var kick = "/Users/thorsten/Code/Codetraxx/wavs/KickDrum0022.aif";
var kick = "/Users/thorsten/Code/Codetraxx/wavs/kick.wav";
var snare = "/Users/thorsten/Code/Codetraxx/wavs/SnareDrum0012.aif";

codetraxx.subscribe( function(msg) {
  var infoArr = /bpm:(\d*)\|\|tick:(\d*)\|\|currentTick:(\d*)/.exec(msg.data.toString('utf-8'));
  var bpm = infoArr[1];
  var tick = infoArr[2];
  var currentTick = infoArr[3];

  // do cool stuff here like //
  // if (msg.data.toString('utf-8').match("currentTick:[157]")) {
  //    exec("/usr/local/bin/play " + kick + " gain −h bass +6");
  //  }


});
