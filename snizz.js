#!/usr/bin/env node

var amqp = require('amqp');
var connection = amqp.createConnection({host: 'localhost'});

var sys = require('sys');
var exec = require('child_process').exec;

function randyNum(num) {
  return Math.floor((Math.random()*num)+1);
}

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

                var sin_one = randyNum(347);
                var sin_two = randyNum(357);
                console.log ("SINZ == " + sin_one + " " + sin_two);
                if ( Math.round(Math.random()*1) ) {
                  if ( Math.round(Math.random()*1) ) {
                  // exec("play -n synth 1 sin " + sin_one + " sin " + sin_two);
                    exec("play -n synth 1 sin 347 sin 457 phaser 0.8 0.74 3 0.4 0.5 −t");
                  } else {
                    exec("play -n synth 1 sin 447 sin 477 chorus 0.7 0.9 55 0.4 0.25 2 -t");
                  }
                  // exec("play -n synth 1 sin 300-3300");
                }
            });
        });
    });
});
