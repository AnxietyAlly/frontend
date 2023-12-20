// import { checkUserCredentials } from '../backend/accounts/code/controllers/accountsController.js';
import bcrypt from "bcrypt";
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

function performLogin(cookies, name) {
    const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
    const sid = createSession(name, maxAge);
    cookies.set('sid', sid, { maxAge });
}

// async function registerErrorHandling(name, email, password) {
//     let errorEncountered = false;

//     let nameErrorEncountered = false;
//     let emailErrorEncountered = false;
//     let passwordErrorEncountered = false;

//     let nameErrorMessages = [];
//     let emailErrorMessages = [];
//     let passwordErrorMessages = [];

//     const possibleAccount = await getApiData(
//         `https://aa-apigateway-sprint-3.onrender.com/accountsApi/accounts/email/${email}`
//     );

//     if (name && email && password && await possibleAccount) {
//         if (!(name == "")) {
//             if (!(email == "")) {
//                 if ((! /[@]/.test(email))) {
//                     emailErrorEncountered = true;
//                     emailErrorMessages.push("Email must contain an '@'");
//                 }
//                 if (possibleAccount.data !== undefined && possibleAccount.data !== null) {
//                     emailErrorEncountered = true;
//                     emailErrorMessages.push("Email has already been used for an account");
//                 }
//                 if (!(password == "")) {
//                     if (password.length < 8 ) {
//                         passwordErrorEncountered = true;
//                         passwordErrorMessages.push("Password must be at least 8 characters long");
//                     }
//                     if ((! /[abcdefghijklmnopqrstuvwxyz]/.test(password))) {
//                         passwordErrorEncountered = true;
//                         passwordErrorMessages.push("Password must contain at least 1 lowercase letter");
//                     }
//                     if ((! /[ABCDEFGHIJKLMNOPQRSTUVWXYX]/.test(password))) {
//                         passwordErrorEncountered = true;
//                         passwordErrorMessages.push("Password must contain at least 1 uppercase letter");
//                     }
//                     if ((! /[0123456789]/.test(password))) {
//                         passwordErrorEncountered = true;
//                         passwordErrorMessages.push("Password must contain at least 1 number");
//                     }
//                     if ((! /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))) {
//                         passwordErrorEncountered = true;
//                         passwordErrorMessages.push("Password must contain at least 1 symbol");
//                     }
//                 } else {
//                     passwordErrorEncountered = true;
//                     passwordErrorMessages.push("Password cannot be empty");
//                 }
//             } else {
//                 emailErrorEncountered = true;
//                 emailErrorMessages.push("Email cannot be empty");
//             }
//         } else {
//             nameErrorEncountered = true;
//             nameErrorMessages.push("Name cannot be empty");
//         }
//     } else {
//         if(!name) {
//             nameErrorEncountered = true;
//             nameErrorMessages.push("No name detected");
//         }
//         if (!email) {
//             emailErrorEncountered = true;
//             emailErrorMessages.push("No email detected");
//         }
//         if (!password) {
//             passwordErrorEncountered = true;
//             passwordErrorMessages.push("No password detected");
//         }
//     }
//     if (nameErrorEncountered || emailErrorEncountered || passwordErrorEncountered) {
//         errorEncountered = true;
//     }

//     const JSONToReturn = {
//         errorEncountered: errorEncountered,
//         nameErrorEncountered: nameErrorEncountered,
//         emailErrorEncountered: emailErrorEncountered,
//         passwordErrorEncountered: passwordErrorEncountered,
//         nameErrorMessages: nameErrorMessages,
//         emailErrorMessages: emailErrorMessages,
//         passwordErrorMessages: passwordErrorMessages,
//     }

//     return JSONToReturn;
// }

export const actions = {
    login: async ({ request, cookies }) => {
        console.log("test");
        const formData = await request.formData();
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (email && password) {
            const res = await checkUserCredentials(email, password);

            if (!res) {
                return fail(401, { errorMessage: 'Invalid email or password' });
            }

            const account = await getApiData(
                `https://aa-apigateway-sprint-3.onrender.com/accountsApi/accounts/email/${email}`
            );

            if (await account) {
                performLogin(cookies, account.data.name);

                const originalUrl = cookies.get('originalUrl');

                if (!(originalUrl == undefined || originalUrl == null)) {
                    // redirect to page you just tried to go to
                    cookies.delete('originalUrl');

                    throw redirect(303, originalUrl);
                } else {
                    // redirect to home page
                    throw redirect(303, '/');
                }
            }
        } else {
            return fail(400, { errorMessage: 'Missing email or password' });
        }
    },
};