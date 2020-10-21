const Walk = require('./random-walk')

// Simulate a random walk
const walk = new Walk
let params = [{
    min: 50,
    max: 300,
    mean: 400,
    scale: 10,
    skew: 3,
    rnd: Math.random()
}]

walk.on("result", result => {
    console.log("walk",result)
})

//walk.get("walk", params)


// Simulate a given stock price
const stock = new Walk

stock.on("result", result => {
    console.log("stock",result)
})

stock.get("walk", params)
