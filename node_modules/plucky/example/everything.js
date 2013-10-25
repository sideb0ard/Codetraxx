var baudio = require('baudio');
var b = baudio({ rate : 22050 });
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
        
        var n = Math.pow(2, 5 / 8);
        
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            sum += Math.sin(tau * t * 50 * n * Math.pow(2, i / 3));
        }
        return sum / 8 * (t % 1 / 8 > 1 / 32);
    },
    function (t, clip) {
        if (t > 1) clip.end();
        
        var n = Math.pow(2, 5.5 / 8);
        
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            sum += Math.sin(tau * t * 50 * n * Math.pow(2, i / 3));
        }
        return sum / 8 * (t % 1 / 8 > 1 / 32);
    },
    function (t, clip) {
        if (t > 2) clip.go(0);
    }
];
b.push(player(beats));

var music = [
    function (t, clip) {
        if (t > 0.5) clip.end();
        
        return pluck(t, 100, 32, 10)
            + pluck(t, 50 * Math.pow(2, 1/2), 120, 5)
        ;
    },
    function (t, clip) {
        if (t > 0.5) clip.end();
        
        return pluck(t, 25, 32, 5)
            + pluck(t, 100 * Math.pow(2, 3/5), 32, 20)
            + pluck(t, 400 * Math.pow(2, 1/5), 64, 10)
        ;
    },
    function (t, clip) {
        if (t > 0.5) clip.end();
        
        return pluck(t, 200 * Math.pow(2, 7/5), 40, 4)
            + pluck(t, 200 * Math.pow(2, 3/5), 40, 10)
        ;
    },
    function (t, clip) {
        if (t > 0.5) clip.go(0);
        
        return pluck(t, 200, 120, 10)
            + pluck(t, 400 * Math.pow(2, 3/5), 60, 40)
        ;
    }
];
b.push(player(music));

b.play();

function pluck (t, freq, duration, steps) {
    var n = duration;
    var scalar = Math.max(0, 0.95 - (t * n) / ((t * n) + 1));
    var sum = 0;
    for (var i = 0; i < steps; i++) {
        sum += Math.sin(tau * t * (freq + i * freq));
    }
    return scalar * sum / 6;
}
