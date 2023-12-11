<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import QuestionnaireQuestionsPage from '$lib/components/QuestionnaireQuestionsPage.svelte';
	import QuestionnaireStartPage from '../../lib/components/QuestionnaireStartPage.svelte';
	import QuestionnaireResultsPage from '../../lib/components/QuestionnaireResultsPage.svelte';
	let mentalProblemsFromDB = [];
	let questionsForQuestionnaireFromDB = [];
	let correctAnswersForQuestions = [];
	

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
				'http://localhost:3010/questionnaireApi/questionnaires/1/questions'
			);

			const questionLinks = questionLinksJSON.data;

			for (let i = 0; i < questionLinks.length; i++) {
				const question = await getApiData(
					`http://localhost:3010/questionnaireApi${questionLinks[i]}`
				);

				questionsFromDatabase.push(question);
			}
			const allQuestionsPromise = await Promise.all(questionsFromDatabase);

			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`http://localhost:3010/questionnaireApi${link}`)
			// );

			return allQuestionsPromise;
		}
	}

	async function getMentalProblems() {
		let mentalProblemsFromDatabase = [];
		if (browser) {
			const mentalProblemLinksJSON = await getApiData(
				'http://localhost:3010/questionnaireApi/mentalProblems'
			);

			const mentalProblemLinks = mentalProblemLinksJSON.data;

			for (let i = 0; i < mentalProblemLinks.length; i++) {
				const mentalProblem = await getApiData(
					`http://localhost:3010/questionnaireApi${mentalProblemLinks[i]}`
				);

				mentalProblemsFromDatabase.push(mentalProblem);
			}
			const allMentalProblemsPromise = await Promise.all(mentalProblemsFromDatabase);

			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`http://localhost:3010/questionnaireApi${link}`)
			// );

			return allMentalProblemsPromise;
		}
	}

	async function getCorrectAnswers(questions, mentalProblems) {
		let correctAnswersFromDatabase = [];
		if (browser) {
			for (let i = 0; i < questions.length; i++) {
				const correctAnswers = await getApiData(
					`http://localhost:3010/questionnaireApi/questions/${questions[i].data.id}/correctAnswers`
				);

				correctAnswersFromDatabase.push(correctAnswers);
			}

			const allCorrectAnswersPromise = await Promise.all(correctAnswersFromDatabase);

			const allCorrectAnswersToReturn = [];
			for (let i = 0; i < questions.length; i++) {
				allCorrectAnswersToReturn.push(
					{
						questionId: questions[i].data.id,
						mentalProblems: []
					}
				);
				for (let j = 0; j < mentalProblems.length; j++) {
					allCorrectAnswersToReturn[i].mentalProblems.push(
						{
							mentalProblemId: mentalProblems[j].data.id,
							values: undefined,
							ranges: undefined
						}
					)
				}
				
			}
			for (let j = 0; j < allCorrectAnswersPromise.length; j++) {
					for (let k = 0; k < allCorrectAnswersPromise[j].data.length; k++) {
						allCorrectAnswersToReturn.find(element => {
							return element.questionId == allCorrectAnswersPromise[j].data[k].question_id
						}).mentalProblems.find(element => {
							return element.mentalProblemId == allCorrectAnswersPromise[j].data[k].mental_problem_id
						}).values = allCorrectAnswersPromise[j].data[k].values;
						allCorrectAnswersToReturn.find(element => {
							return element.questionId == allCorrectAnswersPromise[j].data[k].question_id
						}).mentalProblems.find(element => {
							return element.mentalProblemId == allCorrectAnswersPromise[j].data[k].mental_problem_id
						}).ranges = allCorrectAnswersPromise[j].data[k].ranges;
					}
				}
			console.log(allCorrectAnswersToReturn);

			// [
			//  {
			//   questionId: 1
			//   mentalProblems: [
			//    {
			//     mentalProblemId: 1
			//     values: 4
			//     ranges: 1,0
			//    },
			//    {
			//     mentalProblemId: 2
			//     values: 4
			//     ranges: 2,0
			//    }
			//   ]
			//  }
			//  {
			//   questionId: 2
			//   mentalProblems: [
			//    {
			//     mentalProblemId: 1
			//     values: 2|4
			//     ranges: 0,1|0,0
			//    },
			//    {
			//     mentalProblemId: 2
			//     values: undefined
			//     ranges: undefined
			//    }
			//   ]
			//  }
			// ]
			//
			//
			//
			//

			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`http://localhost:3010/questionnaireApi${link}`)
			// );

			return allCorrectAnswersPromise;
		}
	}

	onMount(async () => {
		questionsForQuestionnaireFromDB = await getQuestions();
		mentalProblemsFromDB = await getMentalProblems();
		correctAnswersForQuestions = await getCorrectAnswers(questionsForQuestionnaireFromDB, mentalProblemsFromDB);
		let answers = new Array(questionsForQuestionnaireFromDB.length);
	});

	let currentPageNumber = 1;
	let currentQuestionNumber = 1;
</script>

<div class="min-h-screen bg-sky flex flex-col items-center">
	<img class="w-40 h-100 z-10" src=".//anxietyAllyLogo.png" alt="Anxiety Ally Logo" />

	{#key currentPageNumber}
		{#if currentPageNumber == 1}
			<QuestionnaireStartPage bind:currentPageNumber />
		{:else if currentPageNumber == 2}
			{#key currentQuestionNumber}
				<QuestionnaireQuestionsPage
					bind:currentPageNumber
					bind:currentQuestionNumber
					allQuestions={questionsForQuestionnaireFromDB}
				/>
			{/key}
		{:else if currentPageNumber == 3}
			<QuestionnaireResultsPage bind:currentPageNumber bind:currentQuestionNumber />
		{:else}
			<QuestionnaireStartPage />
		{/if}
	{/key}
	<!-- {#each questionsForQuestionnaireFromDB as question}
			<p>{question.data.question}</p>
		{/each} -->
</div>

<style>
	.bg-sky {
		background-image: url('.//background-sky.png');
		background-position: center;
	}

	/* .app .quiz-screen .footer > div {
		margin:0px 10px;
	} */
</style>
