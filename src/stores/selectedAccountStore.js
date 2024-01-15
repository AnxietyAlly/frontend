import { writable } from "svelte/store";

export const selectedAccount = writable({
	// eslint-disable-next-line id-length
	id: "id number of the account",
	name: "name of the user who made the account",
	email: "email linked to the account",
});

/**
 * update is a method that takes one argument which is a callback. 
 * The callback takes the existing store value as its argument 
 * and returns the new value to be set to the store.
 * @param {*} account - new value
 */
// export const setSelectedAccount = (account) => {
//     selectedAccount.update(() => ({...account}));
// }