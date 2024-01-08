import { writable } from 'svelte/store';

export const roboDocChatHistory = writable([
    {
        text: 'What would you like to vent about?',
        sender: 'robodoc'
    }
]);

export const roboDocAvailableMessagesBadDay = writable([
    {
        text: 'I\'m sorry to hear that you had a rough day. If you feel comfortable sharing, is there something specific that happened that made your day challenging?',
        sender: 'robodoc'
    },
    {
        text: 'It\'s okay to feel this way. Is there something specific about being around many people that bothers you?',
        sender: 'robodoc'
    },
    {
        text: 'It\'s totally okay to feel anxious in group settings. Many people experience similar feelings of discomfort or unease in larger gatherings.',
        sender: 'robodoc'
    },
]);

export const roboDocAvailableMessagesGoodDay = writable([
    {
        text: 'I\'m so happy for you, what made your day so great?',
        sender: 'robodoc'
    },
    {
        text: 'That\'s amazing! How did you meet your new friend?',
        sender: 'robodoc'
    },
    {
        text: 'Meeting people at school is great! What did you both bond over?',
        sender: 'robodoc'
    },
    {
        text: 'That\'s awesome! Finding someone who shares an interest in programming can be really exciting.',
        sender: 'robodoc'
    },
]);

/**
 * update is a method that takes one argument which is a callback.
 * The callback takes the existing store value as its argument
 * and returns the new value to be set to the store.
 * @param {*} account - new value
 */
// export const setSelectedAccount = (account) => {
//     selectedAccount.update(() => ({...account}));
// }