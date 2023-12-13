import { checkUserCredentials, createUser } from '../backend/accounts/code/lib/server/db';
import { createSession } from '../backend/accounts/code/lib/server/sessionStore';
import { fail, redirect } from '@sveltejs/kit';

function performLogin(cookies, name) {
    const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
    const sid = createSession(name, maxAge);
    cookies.set('sid', sid, { maxAge });
}

export const actions = {
    register: async ({ request, cookies }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (name && email && password) {
            try {
                
                createUser(name, email, password);
            } catch (err) {
                return fail(400, { errorMessage: 'Internal Server Error' });
            }
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