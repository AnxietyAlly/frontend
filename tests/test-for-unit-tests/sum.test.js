const sumJavascript = require('./sum');
const sum = sumJavascript.sum;
const sub = sumJavascript.sub;



const a = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
const b = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;

test('1 plus 2', () => {
    expect(sum(1, 2)).toBe(3);
});

test(a + ' plus ' + b, () => {
    expect(sum(a, b)).toBe(a + b);
});

test('lines of code of sum should be less than or equal to 50', () => {
    expect(sum.toString().split(/\r\n|\r|\n/).length).toBeLessThanOrEqual(50);
});

test('complexity of sum should be less than or equal to 20', () => {
    var count = 1;
    count += (sum.toString().match(/ if/g) || []).length;
    count += (sum.toString().match(/&&/g) || []).length;
    count += sum.toString().split("||").length - 1;
    count += (sum.toString().match(/!/g) || []).length;
    expect(count).toBeLessThanOrEqual(20);
});

test (a + ' minus ' + b, () => {
    expect(sub(a, b)).toBe(a - b);
});

test('lines of code of sub should be less than or equal to 50', () => {
    expect(sub.toString().split(/\r\n|\r|\n/).length).toBeLessThanOrEqual(50);
});

test('complexity of sub should be less than or equal to 20', () => {
    var count = 1;
    count += (sum.toString().match(/ if/g) || []).length;
    count += (sum.toString().match(/&&/g) || []).length;
    count += sum.toString().split("||").length - 1;
    count += (sum.toString().match(/!/g) || []).length;
    expect(count).toBeLessThanOrEqual(20);
});