# plucky

compose musical callbacks into plucky arrangements

# example

``` js
var baudio = require('baudio');
var b = baudio({ rate : 44100 });
var tau = 2 * Math.PI;
var player = require('plucky');

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
        return Math.sin(tau * t * 100)
            + Math.sin(tau * t * 105) / 8
        ;
    }
];
b.push(player(music));
b.play();
```

# methods

``` js
var plucky = require('plucky')
```

## var f = plucky(music, end)

Return a [baudio](http://github.com/substack/baudio)-compatible
function given an array of `music` functions.

Each function in the array `music` will be called `fn(t, clip)`
with the relative time in seconds since it was started `t` and a `clip` object
described below. Musical functions should return a floating point value between
`-1` and `1`, inclusive.

If provided, `end()` fires when there's no more music to play.

## clip.next(index)

Trigger the next musical function, if there is one.

If `index` is specified, trigger the musical function at `index`.

## clip.end()

End the currently playing clip and trigger the next clip.

## clip.destroy()

End the currently playing clip only.

## clip.go(index)

Trigger the musical function at an `index` in the musical array and stop playing
the current clip.

# attributes

## clip.t

Absolute time in seconds. This is different from the `t` in `f(t, clip)`, which
is a relative time in seconds for the clip since it started playing.

# install

With [npm](https://npmjs.org) do:

```
npm install plucky
```

# license

MIT
