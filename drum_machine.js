#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');

var sys = require('sys');
var exec = require('child_process').exec;

//var kick = "/Users/thorsten/Code/Codetraxx/wavs/KickDrum0022.aif";
var kick = "/Users/thorsten/Code/Codetraxx/wavs/kick.wav";
var snare = "/Users/thorsten/Code/Codetraxx/wavs/SnareDrum0012.aif";

function puts(error, stdout, stderr) { sys.puts(stdout); }

function randyNum(num) {
  return Math.floor((Math.random()*num)+1);
}

codetraxx.subscribe( function(msg) {
  var infoArr = /bpm:(\d*)\|\|tick:(\d*)\|\|currentTick:(\d*)/.exec(msg.data.toString('utf-8'));
  var bpm = infoArr[1];
  var tick = infoArr[2];
  var currentTick = infoArr[3];
  //console.log("%s", msg.data.toString('utf-8'));
  if (msg.data.toString('utf-8').match("currentTick:[157]")) {
    if (tick % 7 == 0) {
      console.log("SKIP A MOD 7!!");
    } else {
      console.log("%s", msg.data.toString('utf-8'));
      exec("/usr/local/bin/play " + kick + " gain −h bass +6");
    }
  } else if (msg.data.toString('utf-8').match("currentTick:[2468]")) {
    exec("/usr/local/bin/play " + snare);
  } else if (msg.data.toString('utf-8').match("currentTick:[3]" && Math.round(Math.random()*1)) ) {
    exec("/usr/local/bin/play " + kick + " gain 1 bend .35,180,.25") ;
  }
});
