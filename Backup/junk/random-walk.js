module.exports = Walk

let util = require('util'),
    EventEmitter = require('events')
let rand = require('random')
let crypt = require('crypto')
let seedrandom = require('seedrandom')

function Walk () {

    EventEmitter.call(this)

}

util.inherits(Walk, EventEmitter);

//Defaults
let min = 20
let max = 20
let mean = 100 // base
let scale = 2
let skew = 0.25 // skew

Walk.prototype.get = function (event, data) {    
    let walk = this

    if(data[0].min && data[0].max){
        min = data[0].min
        max = data[0].max
    }
    if(data[0].mean){
        mean = data[0].mean
    }
    if(data[0].scale){
        scale = data[0].scale
    }
    if(data[0].skew){
        skew = data[0].skew
    }

    if(event == "walk"){
        //randomWalk(walk, min, max)
        walker(walk, min, max)
    }

}
let step = 0
const randomNormals = (rng) => {
    let u1 = 0, u2 = 0;

    while (u1 === 0) u1 = rng;
    while (u2 === 0) u2 = rng;

    const R = Math.sqrt(-2.0 * Math.log(u1));
    const D = 2.0 * Math.PI * u2;

    return [R * Math.cos(D), R * Math.sin(D)]

    //return [R * Math.cos(D), R * Math.sin(D)];
};

const randomSkewNormal = (rng, mean, scale, skew) => {
    const [u0, v] = randomNormals(rng);
    if (skew === 0) {
        return mean + scale * u0;
    }
    const c = skew / Math.sqrt(1 + skew * skew); //coefficient
    const u1 = skew * u0 + Math.sqrt(1 - c * c) * v;
    const z = u0 >= 0 ? u1 : -u1;
    return mean + scale * z;
};

let boxMuller = ()=>{
    let phase = 0, x1, x2, w, z;
    if (!phase) {
        do {
            x1 = 2.0 * rand.float() - 1.0;
            x2 = 2.0 * rand.float() - 1.0;
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

let value = 0
function randomWalk(steps, randFunc) {
    steps = steps >>> 0 || 100;
    if (typeof randFunc !== 'function') {
        randFunc = boxMuller;
    }

    var points = [],
        t;

        value += randFunc();
        points.push([t, value]);

    return points;
}

function getYValues(points) {
    return points.map(function (point) {
        return point[1];
    });
}

function walker(walk, min, max) {
    let value = 0;
    (function ontimeout(){
        rand.use(seedrandom(crypt.randomBytes(32).readUInt32BE() / (0xffffffff)))
        result = getYValues(randomWalk())
        if(result) walk.emit("result", result[0])
        step == 1 ? step = 0 : step = 1
        setTimeout(ontimeout, speed(min,max))
    })()
}

function speed(min, max){
    if(!min || !max) return 300
    return rand.float() * (max - min) + min
}

