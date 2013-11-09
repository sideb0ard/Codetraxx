#!/usr/bin/env node

var amqp = require('amqp');
var connection = amqp.createConnection({host: 'localhost'});

var sys = require('sys');
var exec = require('child_process').exec;
var hat = "/Users/thorsten/Code/Codetraxx/wavs/Hihat0003.aif"
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
                if ( Math.round(Math.random()*1) ) {
                  exec("play " + hat + " chorus 0.7 0.9 55 0.4 0.25 2 -t");
                  // exec("/usr/local/bin/play /Users/thorsten/Code/Codetraxx/wavs/tick.wav");
                }
                //console.log("%s", msg.data.toString('utf-8'));
                //if (msg.data.toString('utf-8').match("currentTick:[157]")) {
                //  console.log("%s", msg.data.toString('utf-8'));
                //  console.log("BOOM!");
                //  exec("/usr/local/bin/play /Users/thorsten/Code/Codetraxx/wavs/kick.wav");
                //} else if (msg.data.toString('utf-8').match("currentTick:[2468]")) {
                //  exec("/usr/local/bin/play /Users/thorsten/Code/Codetraxx/wavs/snare.wav");
                //}
                //if (Math.round(Math.random()*1)) {
                //  numpy = randyNum(floor);
                //  exec("echo " + numpy + "| play -c 1 -r 44k -t s16 -", puts);
                //  console.log(" [x] %s playing %s", msg.data.toString('utf-8'), numpy);
                //}
            });
        });
    });
});
