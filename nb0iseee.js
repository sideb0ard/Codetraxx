#!/usr/bin/env node

var codetraxx = require('beatduino-helpers');
var nowplaying = 0;
var baudio  = require('baudio');

var tau = Math.PI * 2;

function decimalPlaces(num) {
  console.log("HERE!");
  //console.log("IN FUNC WITH " + num.toString());
  //var match = /\.(\d+)/.exec(num.toString());
  //return match;
}

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);
  if (beat === 1 && microTick === 1 && !nowplaying) {

    nowplaying = 1;

    console.log("STARTING!");

    var b = baudio(function (tt, counter) {
      var vol = 0.23;
      var tikMulti = ( bpm / 60 );
      var tikMod = tt % tikMulti;
      //console.log("helllllla MODULO " + tikMod);
      //console.log("TT + COUNTER " + tt + " " + counter);

      //var floatRegex = /^\d+\.(\d+)$/;
      //var floatRegex = /(\d+)/;
      try {
        var pattern = /\d+\.(\d*)|\.\d+/;
        var match = pattern.exec(tikMod);
        //console.log("MATCH " + match);
        if (match === null) {
          // console.log("NULL MATE");
        } else {
          //console.log(match[1]);
          if ( /\d+0000/.test(match[1]) ) {
            // console.log("SILENCE YOUUUUUUS! " + match[1]);
            vol = 0;
          }
        }
      } catch(err) {
        console.log("OUCH! " + err);
      }
//
      //var intRegex = /^\d+$/;
      //if(intRegex.test(tikMulti)) {
      //  volume = 0;
      //  console.log("INT! " + tikMulti);
      //} else {
      //  console.log(tikMulti);
      //  var floatRegex = /^\d+\.\d+$/;
      //  var digiCount = tikiMulti.match(floatRegex);
      //  //console.log("DIGTCOUNT " + digiCount);
      //}

      //console.log(typeof tik);
      //for(var propertyName in tik) {
      //  console.log("PROPERTY: " + propertyName);
      //}
      //if (tik[0]) {
      //  console.log("TIK 0 is ALIVE!");
      //}
      //var blah = tik[0];
      //console.log("BLAHHH " + blah);
      //console.log(tik.index);
           // propertyName is what you want
           //    // you can get the value like this: myObject[propertyName]
           //    }
           //
      //var tik = decimalPlace(tt * bpm);
      //var tik = /\.(\d+)/.exec((tt * bpm).toString());
      //console.log("TT is " + tt + " // TIK IS " + tik);
      //anotherTik = tik.toString();
      //var anotherTik = tik.toString().split(",");
      //console.log("ANOTHER TIK " + anotherTik);
      //if (tik == 1) {
      //  console.log("TICK HAS " + tik);
      //}
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

      return (
          // 73 * Math.sin(tau * f)
          0.1 * (sin(f)
          //vol * (sin(f)
          + 0.1 * sin(t * (f * 2 + 4))
          + (tt % (1/2) < 1/24 ? Math.random() : 0))
      );

      function sin (x) {
          return Math.sin(tau * multi * x);
      }
      
    });

    b.play();

  };

});
