// import { checkUserCredentials } from '../backend/accounts/code/controllers/accountsController.js';
import { createSession } from '../backend/accounts/code/lib/server/sessionStore';
import { fail, redirect } from '@sveltejs/kit';

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

        if (name && email && password) {
            postData("http://127.0.0.1:3011/accounts", dataForPost).then((data) => {
                console.log(data);
            });
            throw redirect(307, '/');
        } else {
            return fail(400, { errorMessage: 'Missing username or email or password' });
        }
    },
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (name && email && password) {
            const res = await checkUserCredentials(name, email, password);

            if (!res) {
                return fail(401, { errorMessage: 'Invalid username or email or password' });
            }

            performLogin(cookies, name);

            // redirect to home page
            throw redirect(303, '/');
        } else {
            return fail(400, { errorMessage: 'Missing username or email or password' });
        }
    },
};