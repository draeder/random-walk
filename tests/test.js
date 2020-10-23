const bent = require('bent')
const getBuffer = bent('buffer')

let array = []
async function random(){
    try{
        let buffer = await getBuffer("https://qrng.anu.edu.au/wp-content/plugins/colours-plugin/get_one_binary.php")
        let integer = parseInt(buffer.toString('utf8'), 2)
        let float = integer/(2**8)-1*Math.random()*Math.random()*Math.random()
        array.push(float)
        console.log(float)
        return float
    }
    catch (error){return console.log(error)}
}


function start() {

    setTimeout(function() {
            let phase = 0, x1, x2, w, z;
            let rand1 = array.slice(-1)[0] 
            let rand2 = array.slice(-2)[0] 
            console.log("length", array.length)
            console.log("rand1", rand1, "rand2", rand2)
            if (!phase) {
                console.log("length", array.length)
                do {
                    x1 = 2.0 * rand1 - 1.0; // get a new random number
                    x2 = 2.0 * rand1 - 1.0; // get a new random number
                    w = x1 * x1 + x2 * x2;
                    console.log("while")
                } while (w >= 1.0); // until this evaluates true 
        
                w = Math.sqrt((-2.0 * Math.log(w)) / w);
                z = x1 * w;
            } else {
                z = x2 * w;
            }
        
            phase ^= 1;
            console.log("z",z)
            //return z;


            // Again
            start();

        },50)
    }
// Begins
//start();

setInterval(()=>random().then(result => {
    //console.log(array)
    boxMuller(result)
}),50)

function boxMuller (random){
    let phase = 0, x1, x2, w, z;
    if (!phase) {
        console.log("got here")
        do {
            x1 = 2.0 * random - 1.0;
            x2 = 2.0 * random - 1.0;
            w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);

        w = Math.sqrt((-2.0 * Math.log(w)) / w);
        z = x1 * w;
        console.log("phase",phase, "z",z)
    } else {
        z = x2 * w;
    }

    phase ^= 1;
    console.log("phase",phase, "z",z)
    return z;
}