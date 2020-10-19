// cached extra result
var spareValue = NaN

/**
 * random number generator for the unit random variable
 * http://en.wikipedia.org/wiki/Normal_distribution#Generating_values_from_normal_distribution
 * @returns {Number} random number
 */
export default function() {
	var u, v, s

	if (!isNaN(spareValue)) {
		s = spareValue
		spareValue = NaN
		return s
	}

	do {
		u = Math.random() * 2 - 1
		v = Math.random() * 2 - 1
		s = u * u + v * v
	} while (s === 0 || s >= 1)

	s = Math.sqrt(-2 * Math.log(s) / s)
	spareValue = u * s

	return v * s
}
