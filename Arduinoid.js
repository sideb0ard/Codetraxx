#!/usr/bin/env node

var codetraxx = require('./codetraxx_lib.js');
var baudio  = require('baudio');
var serialport = require("serialport");

var tau = 2 * Math.PI;

var nowplaying = 0;

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var sp = serialport.SerialPort;
var serialPort = new sp("/dev/tty.usbmodem1411", {
    parser: serialport.parsers.readline("\n")
    //baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    cleanData = JSON.stringify(data);
    cleanData.split(",").forEach(function(c) {
      c = c.replace(/[^0-9\.]+/g, '');
      c = Math.floor(c/5);
      var msg = {"pot": c};
      console.log("Sending msg -- " + JSON.stringify(msg));
      codetraxx.publish('serial', msg);
    });
  });
});
