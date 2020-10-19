import t from 'assert-op'
import Z from './index.js'

var N = 20000
var sum = 0
var sum2 = 0
for (var i = 0; i < N; ++i) {
	var rnd = Z()
	sum += rnd
	sum2 += rnd * rnd
}

var average = sum / N
var variance = sum2 / N - average * average

// random-z, average and variance
t('<', Math.abs(average), 0.02)
t('<', Math.abs(variance - 1), 1)
