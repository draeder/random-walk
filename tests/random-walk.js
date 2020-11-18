module.exports = Walk

const util = require('util'),
    EventEmitter = require('events'),
    bent = require('bent'),
    getJSON = bent('json')

function Walk () {

    EventEmitter.call(this)

}

util.inherits(Walk, EventEmitter);

Walk.prototype.get = function (event, data) { 
    let walk = this

    let min = data.rate.min || data.rate
    let max = data.rate.max || data.rate
    let pseudo = data.pseudo

    if(typeof window === "function"){
        pseudo = true // This is a browser, so use pseudo random
        console.log("True random numbers unavailable in a browser. Using pseudo random.")
    }

    let qrng = [] // global array for qrng api
    let floats // global variable for floats

    if(pseudo === false) {
        console.log("Caching true random numbers...")
        // Get true quantum random numbers
        setInterval(()=>getRandom(),1000) // only pull once per second from ANU
    }

    async function getRandom(){

        try{
            // Get new Uint16 array of 1024
            let response = await getJSON("https://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint16")
            qrng.push(...response.data)
            // create pairs of Uint16
            let randomPairs = qrng.reduce(function(result, value, index, array) {
                if (index % 2 === 0)
                    result.push(array.slice(index, index + 2));
                return result;
            }, [])
            
            // Convert pairs to Uint32 and return precise floats between `0-1` for BoxMüller transform
            floats = randomPairs.map(p => {
                return (((2**16) * p[0]) + p[1]) / ((2 ** 32)  - 1);
            })

            // Clean up arrays
            if(qrng.length >= 2048){
                qrng=qrng.slice(-1024)
            }
            if(randomPairs.length >= 2048) {
                randomPairs.slice(-1024)
            }
            if(floats.length >= 2048){
                floats.slice(-1024)
            }

        }

        catch (error){return console.log(error)}

    }

    setTimeout(getFloats, speed(min,max));

    function getFloats() {
        if(pseudo === false) {
            if(floats){
                // Shuffle array
                const shuffled = floats.sort(() => 0.5 - Math.random());

                // Get sub-array of first n elements after shuffled
                let selected = shuffled.slice(0, 2);
        
                //console.log(selected)
                boxMuller(selected) // pass in true random
            }
        } else {
            let random = []
            random[0] = Math.random()
            random[1] = Math.random()
            boxMuller(random) // pass in pseudo random
            random.shift()
        }
        setTimeout(getFloats, speed(min,max));
    }

    function speed(min, max){
        if(!min || !max) return 100
        if(min == max) return min
        return Math.random() * (max - min) + min
    }

    // Get the boxMuller random walk
    let x1, x2, w, z, value = 0, points = [], t

    function boxMuller (r){
        let phase = 0
        if (!phase) {
            x1 = 2.0 * r[0] - 1.0
            x2 = 2.0 * r[1] - 1.0
            w = x1 * x1 + x2 * x2
            if(w >= 1.0){
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
                calculations(walk, data, point[1])
                //console.log(point[1])
                point.shift() // clean up
            })
            points.shift() // clean up
        }
        phase ^= 1
    }

    // Return results based on parameters
    function calculations(walk, data, result){
        let type = data.type || "normal"
        let base = data.base || 0
        let scale = data.scale || 100

        if(base != 0 && scale != 100){
            result = base+(result*(base/scale))
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

}
