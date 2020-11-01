# random-walk
Generate a stream of normalized random numbers using a Box Müller transform to create a true random walk.

The source of true random numbers is derived from measurements of quantum fluctions in a vacuum, provided by [the ANU Quantum Number generator](https://qrng.anu.edu.au). They come in as Uint16 (1024 every 1 second), which are then paired as Uint32 and converted to floating point numbes for use in the Box Müller transform to create a normalized random walk.

If you prefer fake random numbers as the foundation, you may also use pseudo-random numbers by adjusting the `params` object.

Please report any issues, questions or comments [here](https://github.com/draeder/random-walk/issues)

## Example
### True random source numbers
![alt text](https://draeder.github.io/random-walk/src/random-walk-qrng.png "Random walk true")
### Pseudo random source numbers
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
    pseudo: false,
    rate: {min:50, max:100},
    type: "normal",
    base: 100,
    scale: 100
}

walk.on("result", result => {
    console.log(result)
})

walk.get("walk", params)
```
##### Params
The `params` object is an optional object that can be passed in to change the numbers returned and how quickly they are returned. 

###### Example
```
let params = {
    pseudo: false,   // Boolean: false = real random numbers (default), or true = psuedo random numbers
    rate: {min:50, max:100},      // Desired rate in milliseconds: 100 (default) or {min: 50, max: 100} to randomly vary the rate
    type: "normal", // "normal" (default), "positive", "negative"
    base: 100,      // 0 (default). Starting value. Can be any number.
    scale: 100      // 100 is normal (default), > 100 is less volatile, < 100 is more volatile
}
```

If `params` is not passed, defaults will be used.

```
pseudo:
``` 

Pseudo is boolean and can be `false` for real random numbers (default), or `true` for pseudo random numbers

```
rate:
```

Rate can be any number (default `100`), or an object `{min: 50, max: 100}` to specify min and max which will randomly vary the rate.

```
type:
``` 

Type changes how random-walk returns the numbers. Either `"negative"` for negative numbers only, `"positive"` positive numbers only, or `"normal"` both positive and negative numbers (default)

```
base:
```

Base is the base number (default `0`), which might also be consered a "mean" or "average" you would like to simulate. You may use any number.

```
scale:
```

Scale describes the fraction applied to the random-walk result. `100` means the result will be applied as a percentage. If you would like to increase the "volatility" of the result, decrease the number below 100. If you would like to decrease the "volatility" of the result, increase the number above 100.


### TODO

- Add browser support