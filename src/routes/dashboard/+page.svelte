<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let data;

	async function getApiData(url) {
		try {
			let response = await fetch(url);
			let returnedResponse = await response.json();
			return returnedResponse;
		} catch (err) {
			console.error('Error: ', err);
		}
	}

	async function getQuotes() {
		let quotesFromDatabase = [];
		if (browser) {
			const quoteResponse = await getApiData(
				"https://aa-apigateway-sprint-3.onrender.com/quotesApi/quotes"
			);

			const quoteLinks = quoteResponse.data;

			for (let i = 0; i < quoteLinks.length; i++) {
				const quote = await getApiData(
					`https://aa-apigateway-sprint-3.onrender.com/quotesApi${quoteLinks[i]}`
				);

				quotesFromDatabase.push(quote);
			}
			const allQuotesPromise = await Promise.all(quotesFromDatabase);

			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi${link}`)
			// );

			return allQuotesPromise;
		}
	}

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	async function getRandomQuote() {
		let quotesFromDatabase = [];
		if (browser) {
			const quoteResponse = await getApiData(
				"https://aa-apigateway-sprint-3.onrender.com/quotesApi/quotes"
			);

			const quoteLinks = quoteResponse.data;

			const randomQuoteLink = quoteLinks[getRandomInt(0, quoteLinks.length - 1)]


			const quote = await getApiData(
				`https://aa-apigateway-sprint-3.onrender.com/quotesApi${randomQuoteLink}`
			);

			quotesFromDatabase.push(quote);

			const allQuotesPromise = await Promise.all(quotesFromDatabase);

			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi${link}`)
			// );

			return allQuotesPromise[0];
		}
	}

	onMount(async () => {
		const randomQuote = await getRandomQuote();

		const quoteParagraph = document.getElementById("quote");
		quoteParagraph.innerHTML = `${randomQuote.data.quoteName}`
	});	
</script>

<div class="flex flex-col items-center mt-4">
	<img
		class="w-40 h-40 md:w-60 md:h-60 lg:w-52 lg:h-48 mt-4"
		src="/anxietyally.png"
		alt="Anxiety Ally Logo"
	/>
</div>

<div class="h-4 mt-2 space-y-6">
	<div class="flex justify-center lg:h-12">
		<div class="w-2/3 md:w-1/2 lg:w-1/4">
			<p class="text-xs text-center text-stone-600 italic lg:text-lg" id="quote">
				
			</p>
		</div>
	</div>
</div>
<div class="h-10 mt-2 flex justify-center lg:mt-7">
	<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-red-400 text-opacity-90">
		Welcome {data.name}
	</h1>
</div>

<div>
	<div
		class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-1 justify-center lg:flex lg:items-center lg:justify-center"
	>
		<a
			href="/dailycheckup"
			class="rounded-xl bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-1 lg:bg-gray-300 p-4 lg:w-1/2"
		>
			<h2
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Daily Checkup
			</h2>
		</a>
	</div>
	<div
		class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-1 lg:flex lg:items-center lg:justify-center"
	>
		<a
			href="/progress"
			class="rounded-xl bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-1 lg:bg-gray-300 p-4 lg:w-1/2"
		>
			<h2
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Progress
			</h2>
		</a>
	</div>
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-1 justify-center lg:flex lg:items-center lg:justify-center"
	>
		<a
			href="/articles"
			class="rounded-xl bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-1 lg:bg-gray-300 p-4 lg:w-1/2"
		>
			<h2
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Articles
			</h2>
		</a>
	</div>
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-1 justify-center lg:flex lg:items-center lg:justify-center"
	>
		<a
			href="/robodoc"
			class="rounded-xl bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-1 lg:bg-gray-300 p-4 lg:w-1/2"
		>
			<h2
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Robodoc
			</h2>
		</a>
	</div>

	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-1 justify-center lg:flex lg:items-center lg:justify-center"
	>
		<a
			href="/forums"
			class="rounded-xl bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-1 lg:bg-gray-300 p-4 lg:w-1/2"
		>
			<h2
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Forums
			</h2>
		</a>
	</div>
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-1 justify-center lg:flex lg:items-center lg:justify-center"
	>
		<a
			href="/logout"
			class="rounded-xl bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-1 lg:bg-gray-300 p-4 lg:w-1/2"
			data-sveltekit-preload-data="off"
			data-sveltekit-reload
		>
			<h2
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Log out
			</h2>
		</a>
	</div>
</div>
