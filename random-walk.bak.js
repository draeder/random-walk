module.exports = Walk

let util = require('util'),
    EventEmitter = require('events')

function Walk () {

    EventEmitter.call(this)

}

util.inherits(Walk, EventEmitter);

Walk.prototype.get = function (event, data) {    
    let walk = this
    let min
    let max
    let base

    if(Object.keys(data[0]).length < 2){
        min = 300
        max = 300
    } else {
        min = data[0].min || 300
        max = data[0].max || 300
    }
    if(data[0].base){
        base = data[0].base
        console.log(base)
    }

    if(event == "walk"){
        //randomWalk(walk, min, max)
        randomWalk(walk, min, max)
    }
}

function randomWalk(walk, min, max) {
    function randn_bm() {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
        console.log(num)
        return num;
    }
    
    let value = 0;
    (function ontimeout(){
        value = randn_bm()
        walk.emit("result", value)
        setTimeout(ontimeout, speed(min,max))
    })()
}

function speed(min, max){
    if(!min || !max) return 300
    return Math.random() * (max - min) + min
}



