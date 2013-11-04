#!/usr/bin/env node

var amqp = require('amqp');
var connection = amqp.createConnection({host: 'localhost'});

var sys = require('sys');
var exec = require('child_process').exec;

var tau = Math.PI * 2;

var sox = " | sox -r 8000 -b 8 -c 1 -t raw -s - -d"

function puts(error, stdout, stderr) { sys.puts(stdout); }

function randyNum(num) {
  return Math.floor((Math.random()*num)+1);
}

function sin (t, x) {
  return Math.sin(tau * t * x);
}

function synth (t) {
  // return t*((15&t>>11)%12)&55-(t>>5|t>>12)|t*(t>>10)*32;
  // return t * ((t>>12|t>>8)&63&t>>4)
  return (t*5&t>>7)|(t*3&t>>10);
}

//var synth = (function (time, counter) {
//  var t = time % 8;
//  console.log("time:::" + time);
//  console.log("t:::" + t);
//  console.log("counter:::" + counter);
//  return (
//    10404 * (time % 8)
//    + (time >= 12 && t % (1/2) < 1/24 ? Math.random() : 0)
//    + sin(time % 8)
//    );
//});

connection.on('ready', function(){
    connection.exchange('bpm', {type: 'fanout',
                                 autoDelete: true}, function(exchange){
        connection.queue('tmp-' + Math.random(), {exclusive: true},
                         function(queue){
            queue.bind('bpm', '');
            console.log(' [*] Waiting for data. To exit press CTRL+C');

            queue.subscribe(function(msg){
                var infoArr = /bpm:(\d*)\|\|tick:(\d*)\|\|currentTick:(\d*)/.exec(msg.data.toString('utf-8'));
                var bpm = infoArr[1];
                var tick = infoArr[2];
                var currentTick = infoArr[3];
                console.log("BPM:: " + bpm + " TICK:: " + tick + " CURRENTTICK:: " + currentTick);
                // var tick = msg.data.toString('utf-8').match(
                //
                //synth_val = sin(tick,currentTick);
                synth_val = synth(tick);
                console.log("RETURN VAL FROM SYNTH:: " + synth_val);
                // var b = baudio(synth_val);
                // b.play();
                //exec("echo " + synth_val + " | play -c 1 -r 8k -t s16 -", puts);
                exec("echo " + synth_val + sox);

                //if ( Math.round(Math.random()*1) ) {
                //  exec("/usr/local/bin/play /Users/thorsten/Code/Codetraxx/wavs/tick.wav chorus 0.7 0.9 55 0.4 0.25 2 -t");
                  // exec("/usr/local/bin/play /Users/thorsten/Code/Codetraxx/wavs/tick.wav");
                //}
            });
        });
    });
});
