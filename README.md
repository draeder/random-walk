# random-walk
Generate a stream of trend-oriented random numbers using a Box Müller transform to create a normalized random walk.

Useful for generating sample stock or crypto prices for analysis and testing algo trading applications, or any other application that needs a stream of trend-oriented random numbers.

The random numbers used are true random numbers derived from measurements of quantum fluctions in a vacuum, provided by [the ANU Quantum Number generator](https://qrng.anu.edu.au). They are currently Uint8, but they will soon be Uint32 for greater precision in an upcoming release.

## Example
![alt text](https://draeder.github.io/random-walk/src/random-walk.png "Random walk")

## Install
### Server
`npm i random-walk`
### Browser
// Not yet tested and may not work at this time
`<script src="https://draeder.github.io/random-walk/walk.min.js"></script>`

## Usage
### Server
```
const Walk = require('random-walk')
const walk = new Walk
```

### Browser
```
const walk = new Walk
```

#### Example
```
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
```
> The `params` variable and its values are optional