const Walk = require('./random-walk')

const walk = new Walk

let params = {
    pseudo: false,   // Boolean: false = real random numbers (default), or true = psuedo random numbers
    rate: {min:50, max:100},      // Desired rate in milliseconds: 100 (default) or {min: 50, max: 100} to randomly vary the rate
    type: "normal", // "normal" (default), "positive", "negative"
    base: 100,      // 0 (default). Starting value. Can be any number.
    scale: 100      // 100 is normal (default), > 100 is less volatile, < 100 is more volatile
}

walk.on("result", result => {
    console.log(result)
})

walk.get("walk", params)
