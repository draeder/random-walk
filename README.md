# random-walk
Generate a stream of trend-oriented true random numbers using a Box Müller transform to create a normalized random walk.

Useful for generating a real-time stream sample stock or crypto prices for analysis and testing algo trading applications, or any other application that needs a real-time stream of trend-oriented random numbers.

The source random numbers are true random numbers derived from measurements of quantum fluctions in a vacuum, provided by [the ANU Quantum Number generator](https://qrng.anu.edu.au). They come in as Uint16, which are then paired as Uint32 and converted to floating point numbes for use in the Box Müller transform.

> Note: the Box Müller transformed numbers are returned very quickly and will likely crash your terminal if using console.log. You will want to add your own timing as needed for the time being.

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
    type: "normal",
    base: 0,
    scale: 100
}

walk.on("result", result => {
    console.log(result)
})

walk.get("walk", params)
```
##### Params
The `params` variable is an optional object that can be passed in to change what numbers are returned. If `params` is not passed, defaults will be used.

```
let params = {
    type: "normal", // Desired number type: "positive", "negative", "normal" (default) is both positive and negative
    base: 0, // Starting value: Any number >= 0 (default)
    scale: 100 // Scale of change from base. 100 is normal (default), > 100 is less volatile, < 100 is more volatile
}
```

#TODO

- Add pseudo random option if the QRNG API is unavailable
  - Make automatic?
- Add rate controls: normal, min, max, random between min max, random nomralized between min max