module.exports = Walk

const util = require('util'),
    EventEmitter = require('events')
const rand = require('random')
const crypt = require('crypto')
const seedrandom = require('seedrandom')

function Walk () {

    EventEmitter.call(this)

}

util.inherits(Walk, EventEmitter);

//Defaults
let min = 300
let max = 300
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
        randomWalk(walk, min, max)
    }

}
var sample = [];
var spare

let random = ( function() {
  let y = mean/2, values = [y];
  for (let x = 0; x < 1; ++x) values.push(y = y + (Math.random() - 0.5) * 40 + (mean/2 - y) * 0.1);
  return values;
})()
 

function randomWalk(walk, min, max) {
    console.log(mean)
    let value = 0;
    (function ontimeout(){
        value = random
        walk.emit("result", value)
        setTimeout(ontimeout, speed(min,max))
    })()
}

function speed(min, max){
    if(!min || !max) return 300
    return Math.random() * (max - min) + min
}



