#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

var timer = 0;

function decimalPlaces(num) {
  console.log("HERE!");
  //console.log("IN FUNC WITH " + num.toString());
  //var match = /\.(\d+)/.exec(num.toString());
  //return match;
}

codetraxx.subscribe('bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);
  if (beat === 1 && microTick === 1 && !nowplaying) {

    nowplaying = 1;

    console.log("STARTING!");

    var b = baudio(function (t) {

      //console.log("T!" + t);
      var multi = t / bpm;
      //var multi = tt;
      // var donk = (counter / 77478787 ); 
      //var donk = (counter / 1774); // WORKS
      // var donk = (counter / 1674); // WORKS
      //var t = tt % 3;
      var xs = [ 77, 12, 240, 45, -2 ];
      //var xs = [ 74, 773, 50, 4 ];
      //var xs = [ n * 13, counter -n, t ]; // , donk, 4 , 3 ];
      //var xs = [ 770, donk, 478 ] ;

      var speed = t % 0.3 > 7 ? 16 : 2;
      var x = xs[Math.floor(t*speed)%xs.length]
      //var x = xs[Math.floor(Math.random() * (xs.length + 1)) ];
      ////var x = xs[0];
      //var z = tt % 8 < 7 ? 1000 : 80;

      //var f = x + Math.sin(z * (t % 1));

      // console.log("REUTNRING : vol: " + v + " // SIN(f) : " + sin(f));
      var vol = "0." + Math.floor(t % 8);
      return sin(x,vol);

      function sin (x,vol) {
          //return Math.sin(tau * multi * x) * vol;
          return Math.sin(tau * x * multi) * vol;
      }

    });

    b.play();

  };

});
