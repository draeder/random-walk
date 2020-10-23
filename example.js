const Walk = require('./random-walk')

const walk = new Walk

let params = {
    rate: 50, // Desired rate in milliseconds. Minimum is 50 (default).
    type: "positive", // "normal" (default), "positive", "negative"
    base: 0, // Starting value. Any number >= 0 (default)
    volatility: 100 // 100 is normal (default), > 100 is less volatile, < 100 is more volatile
}

walk.on("result", result => {
    console.log(result)
})

walk.get("walk", params)
