import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '/src/lib/server/sessionStore';

function isLoggedIn(locals, cookies) {
  if (!locals?.name) {
      cookies.set('originalUrl', '/settings', {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24
      });
      throw redirect(307, '/login');
  }
};

export const load = (({ locals, cookies }) => {
  isLoggedIn(locals, cookies);
});

/**
	 * Async function to get the data from an API
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

function performLogin(cookies, name, email) {
    const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
    const sid = createSession(name, email, maxAge);
    cookies.set('sid', sid, { maxAge });
}

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

async function updateErrorHandling(name, email, oldEmail, password) {
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
              if (possibleAccount.data !== undefined && possibleAccount.data !== null && possibleAccount.data.email !== oldEmail) {
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
  updateAccount: async ({ request, cookies }) => {
      const formData = await request.formData();
      const name = formData.get('name')?.toString();
      const email = formData.get('email')?.toString();
      const oldEmail = formData.get('oldEmail')?.toString();
      const password = formData.get('password')?.toString();

      const dataForPost = {
          name: name,
          oldEmail: oldEmail,
          password: password,
          newEmail: email
      }

      const updateErrorHandlingResults = await updateErrorHandling(name, email, oldEmail, password);
      if (updateErrorHandlingResults.errorEncountered) {
          return fail(400, updateErrorHandlingResults);
      } else {
          postData("https://aa-apigateway-sprint-3.onrender.com/accountsApi/accounts/update", dataForPost).then((data) => {
              console.log(data);
          });
          performLogin(cookies, name, email);
          throw redirect(307, '/settings');
      }
  },
  removeAccount: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();

    const dataForPost = {
        email: email
    };

    postData("https://aa-apigateway-sprint-3.onrender.com/accountsApi/accounts/delete", dataForPost).then((data) => {
        console.log(data);
    });
    throw redirect(307, '/logout');
  },
};