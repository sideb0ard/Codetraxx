#!/usr/bin/env node

var exec = require('child_process').exec;
var sox = " | sox -r 8000 -b 8 -c 1 -t raw -s - -d";

function puts(error, stdout, stderr) { sys.puts(stdout) }

formula = process.argv[2];

console.log("FPRMLA::: " + formula);

for(t=0;; t++) {
  // numm = t * ((t>>12|t>>8)&63&t>>4);
  numm = t*(t>>((t>>9)|(t>>8))&(63&(t>>4)));
  // numm = formula;
  exec("echo " + numm + sox, puts);
  console.log(numm);
}
