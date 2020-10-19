module.exports = Walk

let util = require('util'),
    EventEmitter = require('events')
const crypt = require('crypto')
const rand = require('random')
const seedrandom = require('seedrandom')

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
    rand.use(seedrandom(crypt.randomBytes(16).readUInt32BE() / (0xffffffff)))
    var phase = 0,
        RAND_MAX,
        array,
        random,
        x1, x2, w, z;
        
        //random = function(){return crypt.randomBytes(16).readUInt32BE() / RAND_MAX}
        let spareValue = NaN

        return function () {
            var u, v, s

            if (!isNaN(spareValue)) {
                s = spareValue
                spareValue = NaN
                return s
            }
        
            do {
                u = rand.float() * 2 - 1
                v = rand.float() * 2 - 1
                s = u * u + v * v 
            } while (s === 0 || s >= 1)
        
            s = Math.sqrt(-2 * Math.log(s) / s) * rand.float() / rand.float()
            spareValue = u * s
        
            return v * s
        }
}())

function randomWalk(walk, min, max) {

    let value = 0;
    (function ontimeout(){
        value += boxMullerRandom()
        walk.emit("result", value)
        setTimeout(ontimeout, speed(min,max))
    })()
}


function speed(min, max){
    if(!min || !max) return 300
    return Math.random() * (max - min) + min
}



