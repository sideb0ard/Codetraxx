#!/usr/bin/env node
var amqp = require('./amqp_connection');

amqp.subscribe('bpm');
