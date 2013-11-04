var tau = Math.PI * 2;

function sin (x) {
  return Math.sin(tau * t * x);
}

function square (x) {
  var n = Math.sin(tau * t * x);
  return n > 0 ? 1 : -1;
}

function sawtooth (x) {
  return t % (1 / x) * x * 2 - 1;
}

module.exports.sin = sin;
module.exports.square = square;
module.exports.sawtooth = sawtooth;
