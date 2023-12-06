import { redirect } from '@sveltejs/kit';

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
    return response.json(); // parses JSON response into native JavaScript objects
}
  
  
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const sliderValue = formData.get('slider');
        const description = formData.get('description');

        const dataForPost = {
            user_id: 1, 
            date: "20231206000000", 
            result: sliderValue, 
            description: description
        }

        postData("http://127.0.0.1:3013/dailyCheckupResults", dataForPost).then((data) => {
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