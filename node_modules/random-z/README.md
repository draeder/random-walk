# random-z

*random number generator following the normal standard distribution*

• [Introduction](#introduction) • [Installation](#installation) • [Usage](#usage) • [Test](#test) • [License](#license) •

## Introduction

Simple and small standalone random number generator for **Z**,
the **standard normal distribution** with an average of 0 and a variance of 1 (*μ=0, σ=1*).
The random number generator uses the
[Marsaglia polar method](http://en.wikipedia.org/wiki/Normal_distribution#Generating_values_from_normal_distribution).
The additional independent random sample is cashed for the next call.

## Usage

The function takes no parameters and returns a random number.
Available in `cjs` (require), `es6` (import) or `browser` (script) formats

```javascript
import Z from 'random-z'
var newRandomSample = Z()
```

## License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
