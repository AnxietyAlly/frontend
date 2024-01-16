<script>
	import {
		roboDocChatHistory,
		roboDocAvailableMessagesBadDay,
		roboDocAvailableMessagesGoodDay
	} from '../../stores/roboDocChatMessagesStore.js';

	import { afterUpdate } from 'svelte';

	let newText = '';
	

	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	let chatbox;

	async function sendNextRoboDocMessage(chatIndex, isBadDay) {
		let newMessage = {};
		if (isBadDay) {
			newMessage = {
				text: $roboDocAvailableMessagesBadDay[chatIndex].text,
				sender: 'robodoc'
			};
		} else {
			newMessage = {
				text: $roboDocAvailableMessagesGoodDay[chatIndex].text,
				sender: 'robodoc'
			};
		}

		const isTypingGif = document.createElement('img');
		isTypingGif.src = 'istyping.gif';
		isTypingGif.classList.add('w-16');
		isTypingGif.classList.add('m-2');

		setTimeout(() => {
			chatbox.appendChild(isTypingGif);
		}, 200);

		setTimeout(() => {
			chatbox.removeChild(isTypingGif);
			$roboDocChatHistory = [...$roboDocChatHistory, newMessage];
		}, 2500);

		newText = '';
	}

	let i = 0;

	const sendMessage = () => {
		const newMessage = {
			text: newText,
			sender: 'user'
		};

		$roboDocChatHistory = [...$roboDocChatHistory, newMessage];

		newText = '';
		if (
			newMessage.text.includes('bad') ||
			newMessage.text.includes('overwhelmed') ||
			newMessage.text.includes('anxious')
		) {
			sendNextRoboDocMessage(i, true);
		} else {
			sendNextRoboDocMessage(i, false);
		}
		i++;
	};

	afterUpdate(() => {
		scrollToBottom(chatbox);
	});

</script>

<div class="flex flex-col items-center mt-4">
	<img class="w-40 h-100" src="/anxietyally.png" alt="Anxiety Ally Logo" />
	<a href="/dashboard">
		<img class="w-10 h-10 mt-2 ml-7 fixed top-5 left-0" src="/back.png" alt="back button" />
	</a>
	<div class="h-10 mt-2 flex justify-center">
		<h1 class="text-3xl font-bold text-red-400 text-opacity-90 mb-4">Chat with RoboDoc!</h1>
	</div>
</div>

<div class="flex justify-center">
	<div
		bind:this={chatbox}
		class="flex flex-col w-11/12 h-96 rounded-md shadow bg-white bg-opacity-50 my-4 overflow-auto lg:w-5/12"
	>
		{#each $roboDocChatHistory as message}
			{#if message.sender == 'robodoc'}
				<div class="flex items-start gap-2.5 m-3">
					<img src="robodoc.png" alt="robo doc" class="h-14 rounded-full" />
					<div
						class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-white bg-red-400 bg-opacity-40 rounded-es-xl rounded-e-xl"
					>
						<div class="flex items-center space-x-2 rtl:space-x-reverse">
							<span class="text-sm font-semibold text-gray-900">RoboDoc</span>
						</div>
						<p class="text-sm font-normal py-2.5 text-gray-900">{message.text}</p>
					</div>
				</div>
			{:else}
				<div class="flex items-start gap-2.5 m-3">
					<div
						class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-white bg-white rounded-ee-xl rounded-s-xl"
					>
						<div class="flex items-center space-x-2 rtl:space-x-reverse">
							<span class="text-sm font-semibold text-gray-900">User</span>
						</div>
						<p class="text-sm font-normal py-2.5 text-gray-900">{message.text}</p>
					</div>
					<img src="userrobodoc.png" alt="robo doc" class="h-14 rounded-full" />
				</div>
			{/if}
		{/each}
	</div>
</div>

<form on:submit|preventDefault={sendMessage}>
	<label for="chat" class="sr-only">Your message</label>
	<div class="flex items-center px-3 py-2 rounded-lg lg:justify-center">
		<input
			type="text"
			id="chat"
			bind:value={newText}
			rows="1"
			class="mx-4 w-5/6 lg:w-96 rounded-3xl border-transparent shadow bg-white bg-opacity-50 lg:mr-56"
			placeholder="Your message..."
		/>
		<button
			type="submit"
			class="inline-flex justify-center p-2 text-red-400 text-opacity-90 rounded-full cursor-pointer"
		>
			<svg
				class="w-5 h-5 rotate-90 rtl:-rotate-90"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 18 20"
			>
				<path
					d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
				/>
			</svg>
			<span class="sr-only">Send message</span>
		</button>
	</div>
</form>
