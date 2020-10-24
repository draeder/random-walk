module.exports = Walk

let util = require('util'),
    EventEmitter = require('events')
const bent = require('bent')
const getJSON = bent('json')
    

function Walk () {

    EventEmitter.call(this)

}

util.inherits(Walk, EventEmitter);

Walk.prototype.get = function (event, data) { 
    let walk = this
    let min = data.rate || 5000

    min < 50 ? min = 50 : min = min
    setInterval(()=>getRandom(),1000)
    //getRandom()
    let qrng = []
    async function getRandom(){
        try{
            let response = await getJSON("https://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint16")
            qrng.push(...response.data)
            if(qrng.length >=1025) floatUint32(qrng, 0)
        }
        catch (error){return console.log(error)}
    }
    function floatUint32(qrng, x){
        if(qrng.length >= 1025){
            var i,j,temparray,chunk = 2, u1, u2
            for (i=x,j=qrng.length; i<j; i+=chunk) {

                temparray = qrng.slice(i,i+chunk);
                u1 = temparray[0]
                u2 = temparray[1]
                let float = (((2**16) * u1) + u2) / ((2 ** 32)  - 1)
                if(i == j){
                    let x = qrng.length - 2048
                    floatUint32(qrng, x)
                }
                
                walk.emit("random", float)

            }
        }
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