function sum(a, b) {
	return a + b;
}

test('1 plus 2', () => {
	expect(sum(1, 2)).toBe(3);
});