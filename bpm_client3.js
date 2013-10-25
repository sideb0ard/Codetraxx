#!/usr/bin/env node

var amqp = require('amqp');
var connection = amqp.createConnection({host: 'localhost'});

var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout); }

connection.on('ready', function(){
    connection.exchange('bpm', {type: 'fanout',
                                 autoDelete: true}, function(exchange){
        connection.queue('tmp-' + Math.random(), {exclusive: true},
                         function(queue){
            queue.bind('bpm', '');
            console.log(' [*] Waiting for data. To exit press CTRL+C');

            queue.subscribe(function(msg){
                if (msg.data.toString('utf-8').match(/currentTick[14]/)) {
                  exec("echo 458954879567893458963757835895378957897894544 | play -c 1 -r 44k -t s16 -", puts);
                  console.log(" [x] %s", msg.data.toString('utf-8'));
                } else if (msg.data.toString('utf-8').match("currentTick3") ) {
                  exec("echo 246467836565 | play -c 1 -r 44k -t s16 -", puts);
                  console.log(" [x] %s", msg.data.toString('utf-8'));
                } else if (msg.data.toString('utf-8').match("currentTick[2678]") && Math.round(Math.random()*1)  ) {
                  exec("echo 246464664344244 | play -c 1 -r 44k -t s16 -", puts);
                  console.log(" [x] %s", msg.data.toString('utf-8'));
                }
            });
        });
    });
});
