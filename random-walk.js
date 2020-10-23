module.exports = Walk

let util = require('util'),
    EventEmitter = require('events')
const bent = require('bent')
const getBuffer = bent('buffer')
    

function Walk () {

    EventEmitter.call(this)

}

util.inherits(Walk, EventEmitter);

Walk.prototype.get = function (event, data) { 
    let walk = this
    let min = data.rate || 50

    min < 50 ? min = 50 : min = min


    setInterval(()=>getRandom(),min)
    async function getRandom(){
        try{
            let buffer = await getBuffer("https://qrng.anu.edu.au/wp-content/plugins/colours-plugin/get_one_binary.php")
            let integer = parseInt(buffer.toString('utf8'), 2)
            let float = integer/((2**8)-1)
            walk.emit("random", float)
        }
        catch (error){return console.log(error)}
    }
    let array = []
    walk.on("random", random => {
        if(array.length == 0){
            array[0] = random
        } else {
            array[1] = random
        }
        if(array.length == 2){
            boxMuller(walk, data, array)
        }
    })
}

let phase = 0
let x1, x2, w, z, value = 0, points = [], t

function boxMuller (walk, data, array){
    let r = array
    if (!phase) {
        x1 = 2.0 * r[0] - 1.0
        x2 = 2.0 * r[1] - 1.0
        w = x1 * x1 + x2 * x2
        if(w>=1.0){
            w = Math.sqrt((-2.0 * Math.log(w)) / w)
            z = x1 * w
        } else {
            z = x2 * w
        }
    } else {
        z = x2 * w
    }

    if(z == z){
        value += z
        points.push([t, value]);
        points.map(function (point) {
            //walk.emit("result", point[1])
            calculations(walk, data, point[1])
        })
    }
    
    phase ^= 1
}

function calculations(walk, data, result){
    let type = data.type || "normal"
    let base = data.base || 0
    let volatility = data.volatility || 100

    if(base != 0 && volatility != 100){
        result = base+(result*(base/volatility))
    } 
    else if(base != 0){
        result = base+(result*(base/100))
    }

    if(type == "normal"){
        // Normal results
        result = result
    }
    else if (type == "positive"){
        // Only positive results
        result = Math.abs(result)
    } 
    else if (type == "negative"){
        // Only negative results
        result = -Math.abs(result)
    }
    walk.emit("result", result)
}