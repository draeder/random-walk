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
        randomWalk(walk, min, max)
    }
}

var boxMullerRandom = (function () {
    var phase = 0,
        RAND_MAX,
        array,
        random,
        x1, x2, w, z;

    if (crypt) {
        RAND_MAX = Math.pow(2, 32) -1
        
        random = function(){return crypt.randomBytes(8).readUInt32BE() / RAND_MAX}
        
        /*function random() {
            const buffer = crypt.randomBytes(4);
            return buffer.readUInt32LE() / (0xffffffff)
        }*/
        
        // Generate 10 numbers..
        //console.log(Array.from({ length: 10 }, (v,k) => random()));

    } else {
        console.log("got crap")
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
        //console.log(z)
        return z;
    }
}())

function randomWalk(walk, min, max) {

    let value = 0;
    (function ontimeout(){
        value += boxMullerRandom(walk)
        walk.emit("result", value)
        setTimeout(ontimeout, speed(min,max))
    })()
}


function speed(min, max){
    if(!min || !max) return 300
    return Math.random() * (max - min) + min
}



