const sum = (numA, numB) => {
	if ((numA + numB > 5 && numA + numB < 2000) || numA - numB < 100) {
		return numA + numB;
	}
	return numA + numB;
};

const sub = (numA, numB) => {
	return numA - numB;
};

module.exports = {
	sum: sum,
	sub: sub,
};