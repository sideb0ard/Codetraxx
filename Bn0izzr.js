#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

var waitCounter = 0;


function decimalPlaces(num) {
  console.log("HERE!");
  //console.log("IN FUNC WITH " + num.toString());
  //var match = /\.(\d+)/.exec(num.toString());
  //return match;
}

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);
  if (beat === 1 && microTick === 1 && !nowplaying) {

    nowplaying = 1;

    console.log("STARTING!");

    var b = baudio(function (tt, counter) {


      var multi = tt * ( bpm / 60);
      donk = (counter / 1774);
      var t = donk % 3;
      var n = t % 7;
      var xs = [ 120, 1, 240, 450, 20 ];
      // var xs = [ 74, 773, 50, 4 ];
      //var xs = [ 74, counter, donk, 4 , 3 ];

      var speed = tt % 3 > 7 ? 16 : 2;
      var x = xs[Math.floor(t*speed)%xs.length]
      var z = tt % 8 < 7 ? 1000 : 80;

      var f = x + Math.sin(z * (t % 1));
      // var f = x + Math.sin(z * (t  % 1));

      //console.log("VOLUME " + volume);
      return (
          // 73 * Math.sin(tau * f)
          //0.15 * (sin(f)
          vol() * (sin(f))
          //0 * (sin(f)
          //volume * 1
          //1 * 1
          //volume * (sin(f)
          //+ 0.1 * sin(t * (f * 2 + 4))
          //+ (tt % (1/2) < 1/24 ? Math.random() : 0))
      );

      function sin (x) {
          return Math.sin(tau * multi * x);
      }

      function vol() {
        var volume = .23;
        var bps = ( 60 / bpm );
        //var tikMod = tt % tikMulti;
        //console.log("VOl!!");
        modLangTimer = Math.floor(bpm * tt);
        //if (modLangTimer % bpm == 0) {
        if (tt >= waitCounter  && tt <= waitCounter + 1 ) {
          volume = 0;
          //console.log("TT " + tt + " WAITCOUNTER " + waitCounter + " VOLUME " + volume);
        }else{
          waitCounter = tt + 2;
          //waitCounter += 2;
          //console.log("** WAITCOUNTER " + waitCounter + " VOLUME " + volume + " TT " + tt);
        }
        //console.log("TT " + tt + " WAITCOUNTER " + waitCounter + " VOLUME " + volume);
        return volume;
      }
      
    });

    b.play();

  };

});
