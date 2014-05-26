#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var nowplaying = 0;
var baudio  = require('baudio');

var note = 0; // to come from arduino - serial queue

codetraxx.subscribe('serial', function(msg) {
    note = msg.lightsensor;
    //console.log("LIGHT!: " + note);
 });

//t=1;
//for(;;t++) {
//  console.log((t*5&t>>7)|(t*3&t>>10));
//}


var tau = Math.PI * 2;

codetraxx.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  //console.log("BPM: " + bpm + " BEAT: " + beat + " MICROTICK: " + microTick + " TICKCOUNTER: " + tickCounter);

  //if (/[15]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  //if (/[1]/.test(beat) && /[1]/.test(microTick) && !nowplaying) {
  if (/[1]/.test(microTick) && !nowplaying) {
  //if (!nowplaying) {
   nowplaying = 1;
   var b = baudio(function (t) {
      //return((t*5&t>>7)|(t*3&t>>10));
     //console.log((t*5&t>>7)|(t*3&t>>10));
     //console.log(t);
     multi = (t * (bpm / 60));
     // donk = (t % 4 / 57575.678678686786);
     //// var t = donk % 5;
     //var xs = [ 20, t, donk, 240, tickCounter % 3, 20 ];
     var xs = [ 20/6, 1/3, 5/4, 17,20 ];
     //// //var xs = [ donk, t, 13, 456 ];
     ////var xs = [ 13, 2, 3, 4, 5, 6, 8 ];
     ////var xs = [ 50048, 43, 5454, 532445 ];
     ////var xs = [ 566, 3.44, 440, 77, 532445, 0, 54 ];
     ////var xs = [ 66, 3.44];

     //// var speed = tt % 5 > 7 ? 4 : 2;
     var x = xs[Math.floor( t * 53.3) % xs.length];
     //// var z = t % 8 < 7 ? 1000 : 80;

     //// var f = x + sin(z * (t % 1));

     vol = "0." + (Math.floor(t % 0.4) + 2);
     //console.log("MULTI" + multi + " // VOL : " + vol);
     //return sin(x * 4) * vol;
     //
     //console.log(sin(bitly(t)));
     //return(sin(bitly(t))) * vol;
     //return(sin(bitly(note))) * vol;
     //return(sin(bitly(t * note))) * vol;
     //return sin(x);
     //console.log(bitly(t));
     //return bitly(x);

     function bitly(x) {
       return((x*5&x>>7)|(x*3&x>>10));
       //x = x *204;
       //x = x * 74 + note;
       //x = x * 774;
       //x = x * 104;
       //x = x * 144;
       //return((x*3/5&x>>7));
       //return((x*3&x>>4));
       //return((x*2&x>>7)|(x*3&x>>10));
       //return((x*2&x>>7)|(x*43&x>>10));
       //return((x*2&x>>7)|(x*43&x>>7));
       //return((x*342&x>>7)|(x*3&x>>10));
       //return((x*342&x>>7)|(x*3&x>>130));
       //return((x*11&x>>7)|(x*3&x>>10));
       //return((x*11&x>>4)|(x*3&x>>10)&x<<500000);
       //return((x*11&x>>4)|(x*3&x>>10)&(x<<500000|x%77));
       //return((x*11&x>>4)|(x*3&x>>10)&(x<<500000|x%77));
       //return((x*11&x>>4)|(x*3&x>>10)&(x<<500000|x%77));
     }
     diff = bpm / 60;
     return (sin(130 * note) + sin(130 + diff)) / 2;
     //return (sin(134) + sin(134 + diff)) / 2;
     //return sin(441) * (sin(3) + sin(4)) / 2;

      //function sin (x) { return Math.sin(tau * multi * x); }
     function sin (x) { return Math.sin(tau * (t/2) * x); }
     function square (x) { return sin(x) > 0 ? 1 : -1; }
     function saw (x) { return 1-2*(t%(1/x))*x ;}

    });
    b.play();

  }

});
