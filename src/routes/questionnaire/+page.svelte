<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import QuestionnaireQuestionsPage from '$lib/components/QuestionnaireQuestionsPage.svelte';
	import QuestionnaireStartPage from '../../lib/components/QuestionnaireStartPage.svelte';
	import QuestionnaireResultsPage from '../../lib/components/QuestionnaireResultsPage.svelte';
	let allQuestionsFromDB = [];

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
	async function getQuestions() {
		let questionsFromDatabase = [];
		if (browser) {
			const questionLinksJSON = await getApiData(
				'http://localhost:3010/questionnaireApi/questionnaire/questions'
			);

			const questionLinks = questionLinksJSON.data;

			for (let i = 0; i < questionLinks.length; i++) {
				const question = await getApiData(
					`http://localhost:3010/questionnaireApi${questionLinks[i]}`
				);

				questionsFromDatabase.push(question);
			}
			const allQuestionsPromise = await Promise.all(questionsFromDatabase);
			console.log(allQuestionsPromise);
			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`http://localhost:3010/questionnaireApi${link}`)
			// );
			return allQuestionsPromise;
		}
	}
	// const questionTest = getQuestions();
	// console.log(questionTest);

	// async function getQuestionData() {
	// 	const allQuestions = await getQuestions();
	// 	// for(let i = 0; i < allQuestions.length; i++) {
	// 	// 	console.log(allQuestions[i]);
	// 	// }
	// 	console.log(allQuestions);
	// 	return allQuestions;
	// }

	onMount(async () => {
		allQuestionsFromDB = await getQuestions();
		console.log(allQuestionsFromDB);
		let answers = new Array(allQuestionsFromDB.length);
		console.log(answers);
	});

	let currentPageNumber = 1;
	let currentQuestionNumber = 1;
</script>

<div class="min-h-screen bg-sky flex flex-col items-center">
	<img class="w-40 h-100 z-10" src=".//anxietyAllyLogo.png" alt="Anxiety Ally Logo" />
	<!--This is the start screen, probably not going to use it-->
	<div class="app top-0">
		{#key currentPageNumber}
			{#if (currentPageNumber == 1)}
				{console.log(currentPageNumber)}
				<QuestionnaireStartPage bind:currentPageNumber />

			{:else if (currentPageNumber == 2)}
				{#key currentQuestionNumber}
					<QuestionnaireQuestionsPage bind:currentPageNumber bind:currentQuestionNumber allQuestions={allQuestionsFromDB} />


				{/key}

			{:else if (currentPageNumber == 3)}
				<QuestionnaireResultsPage bind:currentPageNumber bind:currentQuestionNumber />
			{:else}
				<QuestionnaireStartPage />
			{/if}
		{/key}
		<!-- {#each allQuestionsFromDB as question}
			<p>{question.data.question}</p>
		{/each} -->
		<!-- <button
				class="bg-blue-500 text-white rounded-full focus:outline-none w-45 border-radius-20 ml-36 h-14 w-24 mt-36"
				on:click={() => {
					questionPointer = 0;
				}}
			>
				Start Quiz
			</button> -->

		<!-- <div
				class="quiz-screen p-50 bg-sky flex-wrap w-45 border-radius-20 my-10 bg-blue-400 text-black fixed bottom-0 left-0 w-full flex justify-between items-center w-150 h-10 rounded-10 overflow-hidden"
			>
				<div
					class="main p-4 flex justify-between flex-wrap mx-auto rounded-lg mt-12 bg-blue-400 text-black h-56 absolute"
				>
					<h2> -->
		<!-- {questions[questionPointer].question} -->
		<!-- </h2>
					<div
						class="options flex justify-between flex-wrap w-45 border-radius-20 my-10 bg-blue-400 text-black"
					> -->
		<!-- {#each questions[questionPointer].options as option, i} -->
		<!-- <button
								class="{answers[questionPointer] == i
									? 'selected'
									: ''} px-10 py-2 bg-blue-500 text-black rounded-full focus:outline-none w-45 border-radius-20 my-10"
								on:click={() => {
									answers[questionPointer] = i;
								}}
							>
								{option}
							</button> -->
		<!-- {/each} -->
		<!-- </div>
					
				</div> -->
		<!--this is the footer with back and forward button-->
		<!-- <button
							class="px-10 py-2 bg-blue-500 text-white rounded-full focus:outline-none w-45 border-radius-20 my-10"
							disabled={questionPointer == 0}
							on:click={() => {
								questionPointer--;
							}}
						>
							&lt;
						</button>
						<button
							class="px-10 py-2 bg-blue-500 text-white rounded-full focus:outline-none w-45 border-radius-20 my-10"
							on:click={() => {
								questionPointer++;
							}}
						>
							&gt;
						</button>
				</div>
			</div> -->
		<!-- this is the score page -->
	</div>
</div>

<style>
	.bg-sky {
		background-image: url('.//background-sky.png');
		background-position: center;
	}

	.app > div {
		width: 100%;
		height: 100%;
	}

	button.selected {
		background: aliceblue;
		color: black;
	}

	/* .app .quiz-screen .footer > div {
		margin:0px 10px;
	} */
</style>
