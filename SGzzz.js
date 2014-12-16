#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');
var tau = 2 * Math.PI;
var note = 0; // to come from arduino - serial queue

codetraxx.subscribe('serial', function(msg) {
  note = msg.lightsensor;
  console.log("LIGHT!: " + note);
});

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  // console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (beat === 1 && microTick === 1 && !nowplaying) {
    nowplaying = 1;
    console.log("hola");
    b = baudio(function (t) {
      //var multiplier = (t / 2) ;
      var multiplier = (t * (bpm / 60)) ;
      var relativeTime = bpm / 60;
      //console.log("T is " + t + " MULTIPLIER is " + multiplier);
      //

      var n = 47 / t;
      //var xs = [ 20, 70, 7, 540, n / 300 ];
      //var xs = [ 40, n / 300, 7 ];
      //var xs = [ 20/5, 13/3, 33/7, 5023/32, 30/5 ];
      //var xs = [ 3/2,353,5,3,77777];
      var xs = [ 3,353,5,3,77];
      var x = xs[Math.floor(multiplier*8)%xs.length];
      var f = x + Math.sin(17 * (n % 7));
      //return x * sin(f / 13 ) * 0.02;
      //var vol = "0." + Math.floor(t % 8) + 1;
      var vol = "0." + Math.floor(t % 8) + 2;
      //console.log("VOL: " + vol);
      //return sin(x) * vol;
      //return (saw(x) * saw(x+relativeTime) + sin(note)) * vol;
      return (saw(x) * saw(x+relativeTime) + sin(x)) * vol;
      //return (saw(x * note) * saw(x+relativeTime) + sin(note)) * vol;
      //return ((saw(x * sin(note % 23)) * saw(x+relativeTime) + sin(note)) / 2) * vol;

      function sin (x) { return Math.sin( tau * t * x); }
      function square (x) { return sin(x) > 0 ? 1 : -1; }
      function saw (x) { return 1-2*(t%(1/x))*x ;}
    })

  b.play();
  }

});
