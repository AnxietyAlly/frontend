const sum = (a, b) => {
    if ((a + b > 5 && a + b < 2000) || a - b < 100) {
        return a + b;
    }
    return a + b;
};

const sub = (a, b) => {
    return a - b;
};

module.exports = {
   sum: sum,
   sub: sub,
}