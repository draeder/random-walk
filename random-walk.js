module.exports = Walk

let util = require('util'),
    EventEmitter = require('events')
const crypt = require('crypto')

let crypto = crypt.randomBytes(256, (err, buf) => {
  if (err) throw err;
  return buf.toString('hex')
})

function Walk () {

    EventEmitter.call(this)

}

util.inherits(Walk, EventEmitter);

Walk.prototype.get = function (event, data) {    
    let walk = this
    let min
    let max

    if(!data){
        min = 300
        max == 300
    } else {
        min = data[0].speedMin || 300
        max = data[0].speedMax || 300
    }

    if(event == "walk"){
        //randomWalk(walk, min, max)
        generatePlots(walk, min, max)
    }
}

var boxMullerRandom = (function () {
    var phase = 0,
        RAND_MAX,
        array,
        random,
        x1, x2, w, z;

    if (crypto && typeof crypto.getRandomValues === 'function') {
        RAND_MAX = Math.pow(2, 32) -1
        array = new Uint32Array(1);
        random = function () {
            crypto.getRandomValues(array);

            return array[0] / RAND_MAX;
        };
    } else {
        random = Math.random;
    }

    return function () {
        if (!phase) {
            do {
                x1 = 2.0 * random() - 1.0;
                x2 = 2.0 * random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            z = x1 * w;
        } else {
            z = x2 * w;
        }

        phase ^= 1;

        return z;
    }
}())

function randomWalk(steps, randFunc) {
    steps = steps >>> 0 || 100;
    if (typeof randFunc !== 'function') {
        randFunc = boxMullerRandom;
    }

    var points = [],value = 0

        value += randFunc();
        points.push(value);

    return points;
}

function getYValues(walk, points) {
    return points.map(function (point) {
        walk.emit("result", point)
        return point[1];
    });
}

let index = 0
function generatePlots(walk, min, max) {
    howMany = 1//howMany >>> 0 || 10;
    var plots = [], index

    (function ontimeout(){
		index += index++
        plots.push({
            data: getYValues(walk, randomWalk())
        });
        setTimeout(ontimeout, speed(min,max))
    })()

    return plots;
}

function speed(min, max){
    if(!min || !max) return 300
    return Math.random() * (max - min) + min
}



