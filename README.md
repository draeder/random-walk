# random-walk
Generate a stream of trend-oriented random numbers using a Box Muller transform. 

Useful for generating sample stock or crypto prices for analysis and testing algo trading applications, or any other application that needs a stream of trend-oriented random numbers.

## Usage
### Install
#### Server
#### Browser
### Example
```
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
```