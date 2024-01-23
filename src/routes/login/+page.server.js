// import { checkUserCredentials } from '../backend/accounts/code/controllers/accountsController.js';
import bcrypt from "bcrypt";
import { createSession } from "/src/lib/server/sessionStore";
import { fail, redirect } from "@sveltejs/kit";

function isLoggedIn(locals) {
	if (locals?.name) {
		throw redirect(307, "/dashboard");
	}
};
  
export const load = (({ locals }) => {
	isLoggedIn(locals);
});

/**
	 * Async function to get the data from the SWAPI api
	 * @returns - returns a promise
	 */
async function getApiData(url) {
	try {
		const response = await fetch(url);
		const returnedResponse = await response.json();
		return returnedResponse;
	} catch (err) {
		console.error("Error: ", err);
	}
}

async function checkUserCredentials(email, password) {
	const account = await getApiData(
		`https://aa-apigateway-sprint-3.onrender.com/accountsApi/accounts/email/${email}`
	);

	if (account && account.data !== undefined && account.data !== null) {
		return bcrypt.compare(password, account.data.password);
	} else {
		// spend some time to "waste" some time
		// this makes brute forcing harder
		// could also do a timeout here
		await bcrypt.hash(password, 12);
		return false;
	}
}

function performLogin(cookies, name, email) {
	const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
	const sid = createSession(name, email, maxAge);
	cookies.set("sid", sid, { maxAge });
}

async function loginErrorHandling(email, password) {
	let errorEncountered = false;

	let emailErrorEncountered = false;
	let passwordErrorEncountered = false;

	const emailErrorMessages = [];
	const passwordErrorMessages = [];

	const possibleAccount = await getApiData(
		`https://aa-apigateway-sprint-3.onrender.com/accountsApi/accounts/email/${email}`
	);

	if (email && password && await possibleAccount) {
		if (!(email == "")) {
			if (possibleAccount.data == undefined && possibleAccount.data == null) {
				emailErrorEncountered = true;
				emailErrorMessages.push("No account found for email");
			} else {
				if (!checkUserCredentials(email, password)) {
					passwordErrorEncountered = true;
					passwordErrorMessages.push("Password for account with this email is wrong");
				}
			}
			if (password == "") {
				passwordErrorEncountered = true;
				passwordErrorMessages.push("Password cannot be empty");
			}
		} else {
			emailErrorEncountered = true;
			emailErrorMessages.push("Email cannot be empty");
		}
	} else {
		if (!email) {
			emailErrorEncountered = true;
			emailErrorMessages.push("No email detected");
		}
		if (!password) {
			passwordErrorEncountered = true;
			passwordErrorMessages.push("No password detected");
		}
	}
    
	if (emailErrorEncountered || passwordErrorEncountered) {
		errorEncountered = true;
	}

	const JSONToReturn = {
		errorEncountered: errorEncountered,
		emailErrorEncountered: emailErrorEncountered,
		passwordErrorEncountered: passwordErrorEncountered,
		emailErrorMessages: emailErrorMessages,
		passwordErrorMessages: passwordErrorMessages,
	};

	return JSONToReturn;
}

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		const registerErrorHandlingResults = await loginErrorHandling(email, password);
		if (registerErrorHandlingResults.errorEncountered) {
			return fail(400, registerErrorHandlingResults);
		} else {
			const res = await checkUserCredentials(email, password);
			const account = await getApiData(
				`https://aa-apigateway-sprint-3.onrender.com/accountsApi/accounts/email/${email}`
			);

			if (!res) {
				if (await account.data == undefined && await account.data == null) {
					let errorAlreadyThere = false;
					for (let i = 0; i < registerErrorHandlingResults.emailErrorMessages.length; i++) {
						if (registerErrorHandlingResults.emailErrorMessages[i] == "No account found for email") {
							errorAlreadyThere = true;
						}
					}
					if (!errorAlreadyThere) {
						registerErrorHandlingResults.emailErrorEncountered = true;
						registerErrorHandlingResults.emailErrorMessages.push("No account found for email");
					}
				} else {
					let errorAlreadyThere = false;
					for (let i = 0; i < registerErrorHandlingResults.passwordErrorMessages.length; i++) {
						if (registerErrorHandlingResults.passwordErrorMessages[i] == "Password for account with this email is wrong") {
							errorAlreadyThere = true;
						}
					}
					if (!errorAlreadyThere) {
						registerErrorHandlingResults.passwordErrorEncountered = true;
						registerErrorHandlingResults.passwordErrorMessages.push("Password for account with this email is wrong");
					}
				}
				return fail(400, registerErrorHandlingResults);
			} else {
				performLogin(cookies, account.data.name, account.data.email);
    
				const originalUrl = cookies.get("originalUrl");
    
				if (!(originalUrl == undefined || originalUrl == null)) {
					// redirect to page you just tried to go to
					cookies.delete("originalUrl");
    
					throw redirect(303, originalUrl);
				} else {
					// redirect to home page
					throw redirect(303, "/");
				}
			}
		}
	},
};