#!/bin/bash

node -e "
  var baudio = require('baudio'), out = process.stdout, note = 1.0;
  var b = baudio(function(t) {
    return Math.sin(2 * Math.PI * t * 400);
  });
  b.pipe(process.stdout);
" | play -c 1 -r 44k -t s16 -
