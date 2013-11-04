#!/usr/bin/env node

var amqp = require('amqp');
var connection = amqp.createConnection({host: 'localhost'});

var codetraxx = require('./codetraxx_lib.js');

var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout); }

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
                //console.log("%s", msg.data.toString('utf-8'));
                if (msg.data.toString('utf-8').match("currentTick:[157]")) {
                  console.log("%s", msg.data.toString('utf-8'));
                  // codetraxx.playrrr("/Users/thorsten/Code/Codetraxx/wavs/kick.wav");
                  exec("/usr/local/bin/play /Users/thorsten/Code/Codetraxx/wavs/kick.wav");
                } else if (msg.data.toString('utf-8').match("currentTick:[2468]")) {
                  exec("/usr/local/bin/play /Users/thorsten/Code/Codetraxx/wavs/snare.wav");
                }
                //if (Math.round(Math.random()*1)) {
                //  numpy = randyNum(floor);
                //  exec("echo " + numpy + "| play -c 1 -r 44k -t s16 -", puts);
                //  console.log(" [x] %s playing %s", msg.data.toString('utf-8'), numpy);
                //}
            });
        });
    });
});
