#!/usr/bin/env node

var baudio = require('baudio');
var tau = 2 * Math.PI;

var melody = [0, -3/2, 1/5, 4/3, 7/5, 0, -5/6, 1/3 ].map(function (x) { return Math.pow(2, x)  });

var b = baudio(function (t) {
  // return Math.sin(2 * Math.PI * t * 400);
  //return sin(470) * square(100);

  var m = melody[Math.floor(t * 2 % melody.length)];

  return sin(400 * m);


  function sin(freq) {
    return Math.sin(tau * t * freq);
  }

  function square(freq) {
    return Math.sin(tau * t * freq) < 0 ? -1 : 1;
  }

  function sawtooth(freq) {
    return t * (1 / freq) * freq * 2 -1;
  }
});

b.play();

