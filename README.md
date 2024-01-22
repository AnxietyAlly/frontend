# Frontend Repository README

This repository primarily focuses on the frontend of our application. For this project, an application has been developed with the theme of anxiety at it's core. The purpose of this application is to determine whether the user experiences any form of anxiety. This is achieved through a quiz with questions regarding symptoms of anxiety. The user logs in, takes the quiz and receives a result. Additionally, the application includes features such as venting to an AI robot called RoboDoc, participating in forum chats, reading articles about various forms of anxiety and completing a daily checkup. The user can fill out this daily checkup to assess their well-being on a day-to-day basis. These data are stored privately and securely for the user's access to review.

This repository is also connected to other repositories. For instance, there is a backend repository responsible for the backend of this application. You can find these applications within this project.

Sprint 1
In the first sprint, there were a few microservices that we wanted to release for the first release. This includes the microservices Questionnaire and Apigateway. The Questionnaire microservice is the most important microservice that we wanted to release. This is because our application is about the user findig out if he or she has a form of anxiety and might need to look for help like a psychologist. 

Sprint 2
For the second sprint we worked on the microservices Accounts, Daily-Checkup and Articles. The user needed to log in first before it's possible to acces the rest of the application. After the quiz, the user can continue their journey with monitoring their moods with the microservice Daily-Checkup. To let the user find out more about the different kinds anxiety has and young adults' experiences, we added the Articles microservice. 

Sprint 3
The last sprint was in the light of the eye catching microservice RoboDoc and the chat microservice Forums. Not only can the user write down their feelings, they can but release the feelings in the form of venting. The user is able to vent with both RoboDoc and Forums.

Looking forward, the development team will continue to iterate on the application, addressing user feedback and introduce new features to further enhance the platform's effectiveness in promoting mental health awareness and support for young adults.

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).


## Developing

To start this project you wil need to run the following command:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of this application:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

