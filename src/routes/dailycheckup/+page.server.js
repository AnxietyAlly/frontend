import { redirect } from '@sveltejs/kit';

function IsLoggedIn(locals, cookies) {
    if (!locals?.name) {
        cookies.set('originalUrl', '/dailycheckup', {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        });
        throw redirect(307, '/login');
    }
};
  
export const load = (({ locals, cookies }) => {
    IsLoggedIn(locals, cookies);
});

function now() {
    const date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(seconds < 10) {
        seconds = `0${seconds}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(hours < 10) {
        hours = `0${hours}`;
    }
    if(day < 10) {
        day = `0${day}`;
    }
    if(month < 10) {
        month = `0${month}`;
    }
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}${month}${day}${hours}${minutes}${seconds}`; // 20231206125300
    return currentDate;
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
    default: async ({ request }) => {
        const formData = await request.formData();
        const sliderValue = formData.get('slider');
        const description = formData.get('description');

        const dataForPost = {
            user_id: 1, 
            date: now(), 
            result: sliderValue, 
            description: description
        }

        postData("https://aa-apigateway-sprint-3.onrender.com/progressApi/dailyCheckupResults", dataForPost).then((data) => {
            console.log(data);
        });

        // Process the form data and perform actions
        if (sliderValue > 50) {
            throw redirect(307, '/dailycheckup-positive');
        } else {
            throw redirect(307, '/dailycheckup-negative');
        }
    },
  };