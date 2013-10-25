var baudio = require('baudio');
var b = baudio({ rate : 44100 });
var tau = 2 * Math.PI;
var player = require('../');

var music = [
    function (t, clip) {
        if (t > 1 / 4) clip.end();
        return Math.sin(tau * 200 * t);
    },
    function (t, clip) {
        if (t > 1 / 4) clip.end();
        return Math.sin(tau * t * 200 * Math.pow(2, 1/3));
    },
    function (t, clip) {
        if (t > 1 / 2) clip.go(0);
        return Math.sin(tau * 80 * t)
            + Math.sin(tau * 85 * t) / 8
            + Math.sin(tau * 73 * t) / 8
        ;
    }
];
b.push(player(music));

var beats = [
    function (t, clip) {
        if (t > 1) clip.end();
        
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            sum += Math.sin(tau * t * 20 * Math.pow(2, (i * 2)/5));
        }
        return sum / 10 * (t % 1 / 8 < 1 / 16);
    },
    function (t, clip) {
        if (t > 1) clip.end();
        
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            sum += Math.sin(tau * t * 40 * Math.pow(2, (i * 2)/5));
        }
        return sum / 10 * (t % 1 / 8 < 1 / 16);
    },
    function (t, clip) {
        if (t > 2) clip.go(0);
    }
];
b.push(player(beats));

b.play();
