#!/usr/bin/env node
var tau = Math.PI * 2;
var exec = require('child_process').exec;
var b = (function (tt, i) {
   var t = tt % 8;
   console.log("t:::" + t);
   console.log("t-t:::" + tt);
   console.log("I:::" + i);
   return (
    10404 * (tt % 8) 
    // + 0.15 * Math.sin(tau * t * f)
    // + 0.1 * Math.sin(tau * t * (f * 2 + 4))
    // + 0.5 * (tt >= 4) * shaker(tt < 16 ? tt : (tt % 4 + 16))
    + (tt >= 12 && t % (1/2) < 1/24 ? Math.random() : 0)
   );

  function sin (x) {
    return Math.sin(tau * t * x);
  }
});
while (true) {
  console.log("BRUNT " + b(16,2002));
  // exec("echo 4399999994343 | play -c1 -r 44j -t s8 - ");
  exec("play wavs/kick.wav");

}
