# random-walk
Generate a stream of trend-oriented random numbers using a Box Muller transform. 

Useful for generating sample stock or crypto prices for analysis and testing algo trading applications, or any other application that needs a stream of trend-oriented random numbers.

## Install
### Server
`npm i random-walk`
### Browser
``
## Usage
### Server
```
const Walk = require('random-walk')
```

### Browser
```
<script>
```

### Example
```
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
> If speed is not defined, defaults to 300ms

#### Simulate a stream of stock prices for a given base stock price
```
const stock = new Walk

let base = 20 // Base stock price

// Set a variable speed to return results
let speed = [{
    speedMin: 1, // milliseconds
    speedMax: 1500 // milliseconds
}]

// This function sets a multiplier to apply realistic price changes for the given base stock price
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
    result = Math.abs(base+((result/base)*multiplier))
    console.log(result)
})

stock.get("walk", speed)

```