import { expect, test } from 'vitest';

import { createSession, deleteSession, getSession } from '../../src/lib/server/sessionStore/index';

const maxAge1 = 180;
const testSession1 = createSession("testSession1", "test", maxAge1);
const invalidAt = Date.now() + maxAge1;

const maxAge2 = 180;
const testSession2 = createSession("sessionToBeDeleted", "test", maxAge2);

test("createSession has made a session", () => {
    expect(testSession1).toBeDefined();
});

test("createSession's sid is 64 characters long", () => {
    expect(testSession1).toHaveLength(64);
});

test("getSession returns a name", () => {
    expect(getSession(testSession1).name).toBeDefined();
});

test("getSession returns the maxAge", () => {
    expect(getSession(testSession1).invalidAt).toBeDefined();
});

test("createSession's name is correct", () => {
    expect(getSession(testSession1).name).toBe("testSession1");
});

test("createSession's maxAge is correct", () => {
    expect(getSession(testSession1).invalidAt - invalidAt).toBeLessThanOrEqual(5);
});

deleteSession(testSession2);
test("deleteSession deleted the session", () => {
    expect(getSession(testSession2)).toBeUndefined();
});

// import Account from '../../src/lib/components/Account.svelte';
// import { render, screen } from '@testing-library/svelte';

// test("says '...waiting'", () => {
// 	render(Account);
// 	const node = screen.queryByText("...waiting");
// 	expect(node).not.toBeNull();
// });