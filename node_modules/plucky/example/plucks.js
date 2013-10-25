var baudio = require('baudio');
var b = baudio({ rate : 44100 });
var tau = 2 * Math.PI;
var player = require('../');

var music = [
    function (t, clip) {
        if (t > 0.5) clip.end();
        
        return pluck(t, 100, 32, 10)
            + pluck(t, 50 * Math.pow(2, 1/2), 16, 23)
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
        
        return pluck(t, 100 * Math.pow(2, 7/5), 32, 10)
            + pluck(t, 100 * Math.pow(2, 3/5), 32, 10)
        ;
    },
    function (t, clip) {
        if (t > 0.5) clip.go(0);
        
        return pluck(t, 200, 32, 10)
            + pluck(t, 100 * Math.pow(2, 3/5), 32, 10)
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
