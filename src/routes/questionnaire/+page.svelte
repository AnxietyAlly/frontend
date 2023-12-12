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

<div class="flex flex-col items-center">
	<img class="w-40 h-100 mt-4" src=".//anxietyally.png" alt="Anxiety Ally Logo" />
</div>

{#key currentPageNumber}
	{#if currentPageNumber == 1}
		<QuestionnaireStartPage bind:currentPageNumber />
	{:else if currentPageNumber == 2}
		{#key currentQuestionNumber}
			<QuestionnaireQuestionsPage
				bind:currentPageNumber
				bind:currentQuestionNumber
				allQuestions={allQuestionsFromDB}
			/>
		{/key}
	{:else if currentPageNumber == 3}
		<QuestionnaireResultsPage bind:currentPageNumber bind:currentQuestionNumber />
	{:else}
		<QuestionnaireStartPage />
	{/if}
{/key}

<!-- {#each allQuestionsFromDB as question}
			<p>{question.data.question}</p>
		{/each} -->

