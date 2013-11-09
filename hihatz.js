#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var sys = require('sys');
var exec = require('child_process').exec;

var HAT = "/Users/thorsten/Code/Codetraxx/wavs/Hihat0003.aif"

codetraxx.subscribe( function(msg) {
  if ( Math.round(Math.random()*1) ) {
    exec("play " + HAT + " chorus 0.7 0.9 55 0.4 0.25 2 -t");
  }
});
