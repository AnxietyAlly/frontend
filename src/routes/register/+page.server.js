// import { checkUserCredentials } from '../backend/accounts/code/controllers/accountsController.js';
import { createSession } from '/src/lib/server/sessionStore';
import { fail, redirect } from '@sveltejs/kit';

function isLoggedIn(locals) {
    if (locals?.name) {
        throw redirect(307, '/dashboard');
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
        let response = await fetch(url);
        let returnedResponse = await response.json();
        return returnedResponse;
    } catch (err) {
        console.error('Error: ', err);
    }
}

function performLogin(cookies, name) {
    const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
    const sid = createSession(name, maxAge);
    cookies.set('sid', sid, { maxAge });
}

// Example POST method implementation:
async function postData(url, data) {

    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "manual", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: new URLSearchParams(data)
    });

    return response.text(); // parses JSON response into native JavaScript objects
}

async function registerErrorHandling(name, email, password) {
    let errorEncountered = false;

    let nameErrorEncountered = false;
    let emailErrorEncountered = false;
    let passwordErrorEncountered = false;

    let nameErrorMessages = [];
    let emailErrorMessages = [];
    let passwordErrorMessages = [];

    const possibleAccount = await getApiData(
        `https://aa-apigateway-sprint-3.onrender.com/accountsApi/accounts/email/${email}`
    );

    if (name && email && password && await possibleAccount) {
        if (!(name == "")) {
            if (!(email == "")) {
                if ((! /[@]/.test(email))) {
                    emailErrorEncountered = true;
                    emailErrorMessages.push("Email must contain an '@'");
                }
                if (possibleAccount.data !== undefined && possibleAccount.data !== null) {
                    emailErrorEncountered = true;
                    emailErrorMessages.push("Email has already been used for an account");
                }
                if (!(password == "")) {
                    if (password.length < 8 ) {
                        passwordErrorEncountered = true;
                        passwordErrorMessages.push("Password must be at least 8 characters long");
                    }
                    if ((! /[abcdefghijklmnopqrstuvwxyz]/.test(password))) {
                        passwordErrorEncountered = true;
                        passwordErrorMessages.push("Password must contain at least 1 lowercase letter");
                    }
                    if ((! /[ABCDEFGHIJKLMNOPQRSTUVWXYX]/.test(password))) {
                        passwordErrorEncountered = true;
                        passwordErrorMessages.push("Password must contain at least 1 uppercase letter");
                    }
                    if ((! /[0123456789]/.test(password))) {
                        passwordErrorEncountered = true;
                        passwordErrorMessages.push("Password must contain at least 1 number");
                    }
                    if ((! /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))) {
                        passwordErrorEncountered = true;
                        passwordErrorMessages.push("Password must contain at least 1 symbol");
                    }
                } else {
                    passwordErrorEncountered = true;
                    passwordErrorMessages.push("Password cannot be empty");
                }
            } else {
                emailErrorEncountered = true;
                emailErrorMessages.push("Email cannot be empty");
            }
        } else {
            nameErrorEncountered = true;
            nameErrorMessages.push("Name cannot be empty");
        }
    } else {
        if(!name) {
            nameErrorEncountered = true;
            nameErrorMessages.push("No name detected");
        }
        if (!email) {
            emailErrorEncountered = true;
            emailErrorMessages.push("No email detected");
        }
        if (!password) {
            passwordErrorEncountered = true;
            passwordErrorMessages.push("No password detected");
        }
    }
    if (nameErrorEncountered || emailErrorEncountered || passwordErrorEncountered) {
        errorEncountered = true;
    }

    const JSONToReturn = {
        errorEncountered: errorEncountered,
        nameErrorEncountered: nameErrorEncountered,
        emailErrorEncountered: emailErrorEncountered,
        passwordErrorEncountered: passwordErrorEncountered,
        nameErrorMessages: nameErrorMessages,
        emailErrorMessages: emailErrorMessages,
        passwordErrorMessages: passwordErrorMessages,
    }

    return JSONToReturn;
}

export const actions = {
    register: async ({ request, cookies }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        const dataForPost = {
            name: name,
            email: email,
            password: password
        }

        const registerErrorHandlingResults = await registerErrorHandling(name, email, password);
        if (registerErrorHandlingResults.errorEncountered) {
            return fail(400, registerErrorHandlingResults);
        } else {
            postData("https://aa-apigateway-sprint-3.onrender.com/accountsApi/accounts", dataForPost).then((data) => {
                console.log(data);
            });
            performLogin(cookies, name);
            throw redirect(307, '/');
        }
    },
};

// test