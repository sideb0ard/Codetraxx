var amqp = require('amqp');
var fs = require('fs');

var localconfig = "/usr/local/etc/beatduino.json";
var config;
if (fs.existsSync(localconfig)) {
  config = require(localconfig);
} else {
  config = {
    rabbitUrl:'amqp://guest@localhost',
  };
};

function createConnection(config) {
  return amqp.createConnection({url:config.rabbitUrl});
}

function safeEndConnection(connection) {
  connection.queue('tmp-' + Math.random(), {exclusive: true}, function(){
    connection.end();
    connection.once('error', function(e){
      if (e.code !== 'ECONNRESET' || e.syscall !== 'write')
        throw e;
    });
  });
};

function publish(exchg, msg, conn) {
  if (conn === undefined) {
    conn = createConnection(config);
  }
  conn.on('ready', function () {
   // console.log("Sending message..." + JSON.stringify(msg));
    conn.exchange(exchg, {type: 'fanout', autoDelete: true},
      function(exchange){
        exchange.publish('',msg);
        safeEndConnection(conn);
        //exchange.disconnect();
    });
  });
  //conn.end();
}

function subscribe(exchg, musicalFunction, conn) {
  console.log("Subbbbing to " + exchg + "...");
  if (conn === undefined) {
    conn = createConnection(config);
  }
  conn.on('ready', function() {
    conn.exchange(exchg, {type: 'fanout', autoDelete: true}, function(exch) {
      conn.queue('tmp-' + Math.random(), {exclusive: true},function(queue){
        queue.bind(exchg, '');
        queue.subscribe(musicalFunction);
      });
    });
  });
}

function randyNum(num) {
    return Math.floor((Math.random()*num)+1);
}

module.exports.publish = publish;
module.exports.subscribe = subscribe;
module.exports.createConnection = createConnection;
module.exports.randyNum = randyNum;
