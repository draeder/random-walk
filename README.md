# random-walk
Generate a stream of trend-oriented random numbers using a Box Müller transform to create a normalized random walk.

Useful for generating sample stock or crypto prices for analysis and testing algo trading applications, or any other application that needs a stream of trend-oriented random numbers.

The random numbers used are true random numbers derived from measurements of quantum fluctions in a vacuum, provided by [the ANU Quantum Number generator](https://qrng.anu.edu.au). They are currently Uint8, but they will soon be Uint32 for greater precision in an upcoming release.

## Example
![alt text](https://draeder.github.io/random-walk/src/random-walk.png "Random walk")

## Install
`npm i random-walk`

## Usage
```
const Walk = require('random-walk')
const walk = new Walk
```

#### Example
```
const Walk = require('random-walk')
const walk = new Walk

let params = {
    type: "positive", // Desired number type: "normal" (default), "positive", "negative"
    base: 0, // Starting value: Any number >= 0 (default)
    scale: 100 // Scale of change from base. 100 is normal (default), > 100 is less volatile, < 100 is more volatile
}

walk.on("result", result => {
    console.log(result)
})

walk.get("walk", params)
```
> The `params` variable and its values are optional

#TODO

- Add pseudo random option if the QRNG API is unavailable
  - Make automatic?
- Add rate controls: normal, min, max, random between min max, random nomralized between min max