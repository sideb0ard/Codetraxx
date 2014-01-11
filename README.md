Codetraxx - making traxx with codezzz
=====================================
(a Work In Progress)

This is a collection of different noise making programs which 
communicate and synchronize over RabbitMQ, a message queueing 
system. The programs all utilize [sox](http://sox.sourceforge.net/) 
and/or [baudio](https://github.com/substack/baudio) (which also uses sox).
The basic premise is that each program subscribes to the message queue
and upon receiving a message you specify, it then takes an action such
as playing a sample or starting an algorithm.

First you need a running RabbitMQ instance
```
brew install rabbitmq
```
start it up:
```
rabbitmq-server
```
Install sox
```
brew install sox
```
Clone this and install the needed node modules::
```
git clone git@github.com:sideb0ard/Codetraxx.git
cd Codetraxx
npm install
```
Done! Now to start making noise, you need something to 
synchronize to - we're using a BPM Server which sends out 
recurring timed messages, akin to a metronome - the message 
contains a bpm, a beat (from 1 -8) and 4 microTicks for each beat e.g.:
```
{"bpm":80,"microTick":1,"tickLength":187.5,"beat":1,"tickCounter":1}
```

You could start the bpm server by itself, however we also have
a management launcher called Kingpin. Running a program under Kingpin
will monitor the original file for changes and restart it when 
any changes are made, allowing you to simply edit and save files for 
changes to take effect.

Start the BPM server with:
```
./Kingpin.js BpmServer.js
```
Then start some clients e.g.
```
./Kingpin.js Drum_slow_beat.js
```
how about some noise..
```
./Kingpin.js Twuuurk.js
```
maybe some sound effects?
```
./Kingpin.js FXFish.js
```
you get the idea.

There are a number of different noise producing programs in here.
They fall into two different categories - one are more like sampler/drum 
machines watching for a particular beat message, so you could e.g 
program a drum beat by playing a sample whenever microTick == 1  e.g
```
if (/[1234]/.test(microTick) )  {
    play(KICKDRUM)
  }
```
The second kind are based on Baudio which takes a stream of numbers and
pipes them directly into Sox/play - usually by multiplying sine waves 
together. We have very little idea what we're up to and 
just tweak numbers to see what happens!

Collaboration and Config
------------------------

It becomes even more fun you can synchronize with your buddy - 
one of you run the RabbitMQ server - you might need to edit the config file
to ensure its listening on all interfaces --
```
/usr/local/etc/rabbitmq/rabbitmq-env.conf
```
make sure it has 
```
NODE_IP_ADDRESS=0.0.0.0
```
Use ifconfig to find out the IP address of the person running RabbitMQ,
then configure Codetraxx to connect to that IP in 
```
codetraxx_lib.js
```
At the top is a section called config, which looks like:
```
  var config = {
    //rabbitUrl:'amqp://guest:@172.16.10.74',
    rabbitUrl:'amqp://guest:@localhost',
    queueName:'bpm'
  };
```
Me and [Tack](https://twitter.com/tackyy) have been using a direct connect 
ethernet cable between our machines so as not to deal with any wi-fi latency.
We're both running into a cheap Behringer 6 channel mixing desk, and using a
Big Muff pedal as our effect send, which gives a nice nasty sound to the 
output! Check it [here](https://soundcloud.com/b0ardside/tuned-to-a-dead-channel)
