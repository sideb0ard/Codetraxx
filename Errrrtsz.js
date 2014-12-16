#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  //if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  //if (/[1]/.test(microTick) && !nowplaying) {
   nowplaying = 1;
   var b = baudio(function (t) {
     var melody;
     if ((Math.floor(t) % 8) < 4) {
      //melody = [ 100, 0, 120, 180, 90, 130, 90, 85, 0, 0, 0 ];
      //melody = [ 100, 0, 100, 140, 220, 77/3 ];
      //melody = [ 17, 15, 0, 220, 47, 0, 77, 440, 0, 440 ];
      //melody = [ 200, 200, (200+t), (200+t) / 7 ];
      melody = [ 100, 100, (100+t), (200+t) / 7 ];
     } else {
      melody = [ 0, 0];
     // var melody = [ 200, 200, 0, 360, 0, 200, 240, 0, 190, 0, 0, 0 ];
     }
     //var melody = [ 200, 240, 360, 340, 180, 190 ];
     //var melody = [ 100, 100, 160, 0, 100, 210, 0, 90, 0, 0 ];
     var m = melody[Math.floor(t*2) % melody.length];
     //console.log(t);
     vol = "0." + Math.floor(t % 4);
     //return (sin(x) * square(t % x) / 2) * vol;
     //return square(x) * vol;
     //return square(x) * vol;
     diff = bpm / 60;
     //return (sin(430) + sin(430 + diff)) / 2;
     //return (sin(1640) + sin(1640 + diff)) / 2;
     //return (sin(663) + sin(663 + diff)) / 2;
     //return (sin(330) + sin(330 + diff)) / 2;
     //return sin(441) * sin(4) * vol;
     //return sin(m) * sin(m + diff) * 2;
     //return saw(m/3) * saw((m + diff) * sin(m/3 * 7)) * 2;
     return sin(m/3) * sin((m + diff) * sin(m/3 * 7)) * vol * 0.1;
     //return sin(441) * (sin(3) + sin(4)) / 2;

      //function sin (x) { return Math.sin(tau * multi * x); }
      function sin (x) { return Math.sin(tau * (t/2) * x); }
      function square (x) { return sin(x) > 0 ? 1 : -1; }
      function saw (x) { return 1-2*(t%(1/x))*x ;}
    });
    b.play();

  }

});
