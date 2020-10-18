const Walk = require('./random-walk')

// Simulate a random walk
const walk = new Walk
let speed = [{
    speedMin: 1,
    speedMax: 1500
}]

walk.on("result", result => {
    console.log(result)
})

walk.get("walk", speed)


// Simulate a given stock price
const stock = new Walk

let base = 20

// This function creates a multiplier to apply realistic price changes for the given base stock price
function getMultiplier(base) {
    let digits = Math.floor(Math.log10(base)) + 1
    return digits == 6 ? 100000
         : digits == 5 ? 10000
         : digits == 4 ? 1000
         : digits == 3 ? 100
         : digits == 2 ? 10
         : digits == 1 ? 1
         : 0.01
}
let multiplier = getMultiplier(base)

stock.on("result", result => {
    result = Math.abs(base+((result/base)*multiplier)) // Absolute value because stock prices can never be negative
    console.log(result)
})

stock.get("walk", speed)
