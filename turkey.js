#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');
var exec = require('child_process').exec;


var tau = Math.PI * 2;

var baudio_funct = function(tickCounter) {

  // console.log("TICKCOUNTER:: " + tickCounter);
  nowplaying = 1;
  console.log("TICKCOUNTER:: " + tickCounter);

  // nowplaying = 0;
  var b = baudio(function (tt, tickCounter) {
    donk = (tickCounter / 4092);
    var t = donk % 5;
    //var n = t % 7;
    var xs = [ 1, 42, 2, 666, 5, 8, 440 ];

    var speed = tt % 8 > 7 ? 16 : 2;
    var x = xs[Math.floor(t*speed)%xs.length]
    //var z = tt % 8 < 7 ? 1000 : 80;

    //var f = x + Math.sin(z * (t % 1));

	function sin (x) {
        return Math.sin(tau * (t % 32) * x);
    }

	function square (x) {
        var n = Math.sin(tau * (t % 32) * x);
        return n > 0 ? 1 : -1;
    }
    
    function sawtooth (x) {
        return (t % 32) % (1 / x) * x * 2 - 1;
    }

    return (
        //0.15 * Math.sin(tau * t * f)
        Math.PI * Math.sin(tau * x * tickCounter) % 16
    );

    //function sin (x) {
    //    return Math.sin(tau * t * x);
    //}
});

   b.play();

};

var sta_puft = baudio({"synth":2.5,"sin":667,"gain":1});

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  if (/[8]/.test(beat) && /[4]/.test(microTick) && !nowplaying) {
   console.log("hola");
   //baudio_funct(tickCounter);
exec("play -n synth 2.5 sin 667 gain 1 bend .35,180,.25  .15,740,.53  0,-520,.3");

//sta_puft.play()
}

});