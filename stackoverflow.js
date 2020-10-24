const bent = require('bent')
const getJSON = bent('json')

let qrng = []

async function getRandom(){
    try{
        let response = await getJSON("https://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint16")
        qrng.push(response)
        floatUint32(qrng)
    }
    catch (error){return console.log(error)}
}

getRandom()

function floatUint32(qrng){
    if(qrng[0].data.length ==1024){

        var i,j,temparray,chunk = 2, u1, u2
        for (i=0,j=qrng[0].data.length; i<j; i+=chunk) {
            temparray = qrng[0].data.slice(i,i+chunk);
            u1 = temparray[0]
            u2 = temparray[1]
            let float = (((2**16) * u1) + u2) / ((2 ** 32)  - 1)

            // Half way through the first array, so get a new array to work with
            if(i==510){
               getRandom()
            }

            console.log(float)
        }
    }
}