# random-walk
Generate a stream of normalized random numbers using a Box Müller transform to create a true random walk.

The source of true random numbers is derived from measurements of quantum fluctions in a vacuum, provided by [the ANU Quantum Number generator](https://qrng.anu.edu.au). They come in as Uint16 (1024 every 1 second), which are then paired as Uint32 and converted to floating point numbes for use in the Box Müller transform to create a normalized random walk.

If you prefer fake random numbers as the foundation, you may also use pseudo-random numbers by adjusting the `params` object.

Please report any issues, questions or comments [here](https://github.com/draeder/random-walk/issues)

## Example
### True random
![alt text](https://draeder.github.io/random-walk/src/random-walk-qrng.png "Random walk true")
### Pseudo random
![alt text](https://draeder.github.io/random-walk/src/random-walk-pseudo.png "Random walk pseudo")

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
```
##### Params
The `params` variable is an optional object that can be passed in to change the numbers returned and how quickly they are returned. 

If `params` is not passed, defaults will be used.

```
let params = {
    pseudo: false,   // Boolean: false = real random numbers (default), or true = psuedo random numbers
    rate: {min:50, max:100},      // Desired rate in milliseconds: 100 (default) or {min: 50, max: 100} to randomly vary the rate
    type: "normal", // "normal" (default), "positive", "negative"
    base: 100,      // 0 (default). Starting value. Can be any number.
    scale: 100      // 100 is normal (default), > 100 is less volatile, < 100 is more volatile
}
```

### TODO

- Add browser support