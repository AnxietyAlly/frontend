import { expect, test } from "vitest";
import { sum, sub } from "./sum";

const numA = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
const numB = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;

test("1 plus 2", () => {
	expect(sum(1, 2)).toBe(3);
});

test(numA + " plus " + numB, () => {
	expect(sum(numA, numB)).toBe(numA + numB);
});

test("lines of code of sum should be less than or equal to 50", () => {
	expect(sum.toString().split(/\r\n|\r|\n/).length).toBeLessThanOrEqual(50);
});

test("complexity of sum should be less than or equal to 20", () => {
	let count = 1;
	count += (sum.toString().match(/ if/g) || []).length;
	count += (sum.toString().match(/&&/g) || []).length;
	count += sum.toString().split("||").length - 1;
	count += (sum.toString().match(/!/g) || []).length;
	expect(count).toBeLessThanOrEqual(20);
});

test (numA + " minus " + numB, () => {
	expect(sub(numA, numB)).toBe(numA - numB);
});

test("lines of code of sub should be less than or equal to 50", () => {
	expect(sub.toString().split(/\r\n|\r|\n/).length).toBeLessThanOrEqual(50);
});

test("complexity of sub should be less than or equal to 20", () => {
	let count = 1;
	count += (sum.toString().match(/ if/g) || []).length;
	count += (sum.toString().match(/&&/g) || []).length;
	count += sum.toString().split("||").length - 1;
	count += (sum.toString().match(/!/g) || []).length;
	expect(count).toBeLessThanOrEqual(20);
});