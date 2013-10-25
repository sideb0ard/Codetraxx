module.exports = function (music, end) {
    var playing = [];
    var index = -1;
    
    next(0);
    
    function next (start) {
        index ++;
        if (index >= music.length) {
            if (end) end();
            return;
        }
        var m = music[index];
        
        playing.push(function (t, clip) {
            return m(t - start, clip);
        });
    }
    
    return function (t) {
        if (playing.length === 0) {
            if (end) end();
            return 0;
        }
        
        return playing.reduce(function (sum, clip) {
            var handle = {
                go : function (i) {
                    handle.destroy();
                    index = i - 1;
                    next(t);
                },
                next : function (i) {
                    if (i !== undefined) index = i - 1;
                    next(t);
                },
                end : function () {
                    handle.destroy();
                    next(t);
                },
                destroy : function () {
                    var ix = playing.indexOf(clip);
                    if (ix >= 0) playing.splice(ix, 1);
                },
                t : t
            };
            return sum + clip(t, handle);
        }, 0);
    };
};
