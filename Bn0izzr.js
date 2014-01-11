#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
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

codetraxx.subscribe( function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);
  if (beat === 1 && microTick === 1 && !nowplaying) {

    nowplaying = 1;

    console.log("STARTING!");

    var b = baudio(function (tt, counter) {


      var multi = tt * ( bpm / 60);
      // var donk = (counter / 77478787 ); 
      //var donk = (counter / 1774); // WORKS
      var donk = (counter / 1674); // WORKS
      var t = tt % 3;
      //var xs = [ 77, 12, 240, 45, -2 ];
      // var xs = [ 74, 773, 50, 4 ];
      //var xs = [ n * 13, counter -n, t ]; // , donk, 4 , 3 ];
      var xs = [ 770, donk, 478 ] ;

      var speed = tt % 3 > 7 ? 16 : 2;
      //var x = xs[Math.floor(t*speed)%xs.length]
      var x = xs[Math.floor(Math.random() * (xs.length + 1)) ];
      //var x = xs[0];
      var z = tt % 8 < 7 ? 1000 : 80;

      var f = x + Math.sin(z * (t % 1));

      //var v = vol();
      // var f = x + Math.sin(z * (t  % 1));

      // console.log("REUTNRING : vol: " + v + " // SIN(f) : " + sin(f));
      //console.log("VOLUME " + volume);
      return (
        // 73 * Math.sin(tau * f)
      //    //0.15 * (sin(f)
      //    1 * (sin(f))
      //    //0 * (sin(f)
      //    //volume * 1
      //    //1 * 1
        (sin(f)) * 0.21
      //    //+ 0.1 * sin(t * (f * 2 + 4))
      //    //+ (tt % (1/2) < 1/24 ? Math.random() : 0))
      );
      //return sin(f);

      function sin (x) {
          return Math.sin(tau * multi * x);
      }

      function vol() {
        var volume = .23;
        modLangTimer = Math.floor(bpm * tt);
        //if ((modLangTimer % bpm == 0) && ( tt <= timer )) {
        //  volume = 0;
        //  //timer += 0.00020;
        //  //console.log("MODLANGED! " + modLangTimer + " TIMER IZ " + timer);
        //} else if ( tt <= timer){
        //  //console.log("ELSEIFFFED");
        //  volume = 0;
        //}
        return volume;
      }

    });

    b.play();

  };

});
