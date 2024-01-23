<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import QuestionnaireQuestionsPage from '$lib/components/QuestionnaireQuestionsPage.svelte';
	import QuestionnaireStartPage from '../../lib/components/QuestionnaireStartPage.svelte';
	import QuestionnaireResultsPage from '../../lib/components/QuestionnaireResultsPage.svelte';
	let questionAnswerTemplatesFromDB = [];
	let mentalProblemsFromDB = [];
	let questionsForQuestionnaireFromDB = [];
	let questionsForQuestionnaireFromDBWithExtraInformation = [];
	let correctAndPossibleAnswersForQuestions = [];
	let selectedAnswers = [];

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

	async function addExtraInformation(questions) {
		if (browser) {
			for (let i = 0; i < questions.length; i++) {
				const extraInformationForQuestion = await getApiData(
					`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi/extraInformation/${questions[i].data.extra_information_id}`
				);

				questions[i].data.extraInformation = extraInformationForQuestion;
			}
			
			const allQuestionsPromise = await Promise.all(questions);

			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi${link}`)
			// );

			return allQuestionsPromise;
		}
	}

	async function getQuestions() {
		let questionsFromDatabase = [];
		if (browser) {
			const questionLinksJSON = await getApiData(
				'https://aa-apigateway-sprint-3.onrender.com/questionnaireApi/questionnaires/1/questions'
			);

			const questionLinks = questionLinksJSON.data;

			for (let i = 0; i < questionLinks.length; i++) {
				const question = await getApiData(
					`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi${questionLinks[i]}`
				);

				questionsFromDatabase.push(question);
			}
			const allQuestionsPromise = await Promise.all(questionsFromDatabase);

			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi${link}`)
			// );

			return allQuestionsPromise;
		}
	}

	async function getRelevantQuestionAnwerTemplates(questions) {
		let relevantQuestionAnswerTemplateIDsFromDB = [];
		let relevantQuestionAnswerTemplatesFromDB = [];
		if (browser) {
			for (let i = 0; i < questions.length; i++) {
				if (relevantQuestionAnswerTemplateIDsFromDB.find(element => {
					return element == questions[i].data.question_answer_template_id
				}) == undefined) {
					relevantQuestionAnswerTemplateIDsFromDB.push(questions[i].data.question_answer_template_id);
				}
			}

			for (let i = 0; i < relevantQuestionAnswerTemplateIDsFromDB.length; i++) {
				const questionAnswerTemplate = await getApiData(
					`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi/questionAnswerTemplates/${relevantQuestionAnswerTemplateIDsFromDB[i]}`
				);

				relevantQuestionAnswerTemplatesFromDB.push(questionAnswerTemplate);
			}
			const relevantQuestionAnswerTemplatesPromise = await Promise.all(relevantQuestionAnswerTemplatesFromDB);

			return relevantQuestionAnswerTemplatesPromise;
		}
	}


	async function getMentalProblems() {
		let mentalProblemsFromDatabase = [];
		if (browser) {
			const mentalProblemLinksJSON = await getApiData(
				'https://aa-apigateway-sprint-3.onrender.com/questionnaireApi/mentalProblems'
			);

			const mentalProblemLinks = mentalProblemLinksJSON.data;

			for (let i = 0; i < mentalProblemLinks.length; i++) {
				const mentalProblem = await getApiData(
					`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi${mentalProblemLinks[i]}`
				);

				mentalProblemsFromDatabase.push(mentalProblem);
			}
			const allMentalProblemsPromise = await Promise.all(mentalProblemsFromDatabase);

			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi${link}`)
			// );

			return allMentalProblemsPromise;
		}
	}

	async function getCorrectAndPossibleAnswers(questions, mentalProblems) {
		let correctAnswersFromDatabase = [];
		if (browser) {
			for (let i = 0; i < questions.length; i++) {
				const correctAnswers = await getApiData(
					`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi/questions/${questions[i].data.id}/correctAnswers`
				);

				correctAnswersFromDatabase.push(correctAnswers);
			}

			const allCorrectAnswersPromise = await Promise.all(correctAnswersFromDatabase);

			const allCorrectAndPossibleAnswersToReturn = [];
			for (let i = 0; i < questions.length; i++) {
				allCorrectAndPossibleAnswersToReturn.push(
					{
						questionId: questions[i].data.id,
						mentalProblems: [],
						answers: []
					}
				);
				for (let j = 0; j < mentalProblems.length; j++) {
					allCorrectAndPossibleAnswersToReturn[i].mentalProblems.push(
						{
							mentalProblemId: mentalProblems[j].data.id,
							values: undefined,
							ranges: undefined
						}
					)
				}
				
			}
			for (let i = 0; i < allCorrectAnswersPromise.length; i++) {
				for (let j = 0; j < allCorrectAnswersPromise[i].data.length; j++) {
					allCorrectAndPossibleAnswersToReturn.find(element => {
						return element.questionId == allCorrectAnswersPromise[i].data[j].question_id
					}).mentalProblems.find(element => {
						return element.mentalProblemId == allCorrectAnswersPromise[i].data[j].mental_problem_id
					}).values = allCorrectAnswersPromise[i].data[j].values;

					allCorrectAndPossibleAnswersToReturn.find(element => {
						return element.questionId == allCorrectAnswersPromise[i].data[j].question_id
					}).mentalProblems.find(element => {
						return element.mentalProblemId == allCorrectAnswersPromise[i].data[j].mental_problem_id
					}).ranges = allCorrectAnswersPromise[i].data[j].ranges;
				}
			}

			for (let i = 0; i < questions.length; i++) {
				const possibleAnswerLinksJSON = await getApiData(
					`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi/questions/${questions[i].data.id}/possibleAnswers`
				);

				const possibleAnswerLinks = possibleAnswerLinksJSON.data;

				let possibleAnswersForQuestionPromises = [];
				for (let j = 0; j < possibleAnswerLinks.length; j++) {
					const possibleAnswer = await getApiData(
						`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi${possibleAnswerLinks[j]}`
					);
					possibleAnswersForQuestionPromises.push(possibleAnswer);
				}

				const possibleAnswersForQuestion = await Promise.all(possibleAnswersForQuestionPromises);

				for (let j = 0; j < possibleAnswersForQuestion.length; j++) {
					allCorrectAndPossibleAnswersToReturn.find(element => {
						return element.questionId == questions[i].data.id
					}).answers.push(
						{
							answerId: possibleAnswersForQuestion[j].data.id,
							questionAnswerTemplateId: possibleAnswersForQuestion[j].data.question_answer_template_id,
							value: possibleAnswersForQuestion[j].data.value,
							text: possibleAnswersForQuestion[j].data.text
						}
					)
				}
			}

			const allCorrectAndPossibleAnswersToReturnPromise = await Promise.all(allCorrectAndPossibleAnswersToReturn);

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
			//   ],
			//   answers: [
			//	  {
			//	   id: 1
			//	   question_answer_template_id: 1
			//     value: 1
			//     text: "Never"
			//    },
			//	  {
			//	   id: 2
			//	   question_answer_template_id: 1
			//     value: 2
			//     text: "Sometimes"   
			//    },
			//	  {
			//	   id: 3
			//	   question_answer_template_id: 1
			//     value: 3
			//     text: "Regularly"  
			//    },
			//	  {
			//	   id: 4
			//	   question_answer_template_id: 1
			//     value: 4
			//     text: "Very often"  
			//    },
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
			//   ],
			//   answers: [
			//	  {
			//	   id: 1
			//	   question_answer_template_id: 1
			//     value: 1
			//     text: "Never"
			//    },
			//	  {
			//	   id: 2
			//	   question_answer_template_id: 1
			//     value: 2
			//     text: "Sometimes"   
			//    },
			//	  {
			//	   id: 3
			//	   question_answer_template_id: 1
			//     value: 3
			//     text: "Regularly"  
			//    },
			//	  {
			//	   id: 4
			//	   question_answer_template_id: 1
			//     value: 4
			//     text: "Very often"  
			//    },
			//   ]
			//  }
			// ]

			// const questionPromises = questionLinks.map((link) =>
			// 	getApiData(`https://aa-apigateway-sprint-3.onrender.com/questionnaireApi${link}`)
			// );

			return allCorrectAndPossibleAnswersToReturnPromise;
		}
	}

	onMount(async () => {
		questionsForQuestionnaireFromDB = await getQuestions();
		questionsForQuestionnaireFromDBWithExtraInformation = await addExtraInformation(questionsForQuestionnaireFromDB);
		mentalProblemsFromDB = await getMentalProblems();
		correctAndPossibleAnswersForQuestions = await getCorrectAndPossibleAnswers(questionsForQuestionnaireFromDB, mentalProblemsFromDB);
		for (let i = 0; i < questionsForQuestionnaireFromDB.length; i++) {
			selectedAnswers.push({
				questionId: questionsForQuestionnaireFromDB[i].data.id,
				selectedAnswerId: undefined,
				selectedAnswerValue: undefined
			})
		}
		questionAnswerTemplatesFromDB = await getRelevantQuestionAnwerTemplates(questionsForQuestionnaireFromDB);
		// [
		//  {
		//   questionId: 1
		//   selectedAnswerId: 3
		//   selectedAnswerValue: 3
		//  },
		//  {
		//   questionId: 2
		//   selectedAnswerId: 4
		//   selectedAnswerValue: 4
		//  }
		// ]
	});

	let currentPageNumber = 1;
	let currentQuestionNumber = 1;
	
</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<div class="flex flex-col items-center">
	<img class="w-40 h-100 mt-4" src="/anxietyally.png" alt="Anxiety Ally Logo" />
</div>

	{#key currentPageNumber}
		{#if currentPageNumber == 1}
			<QuestionnaireStartPage bind:currentPageNumber correctAndPossibleAnswersForQuestions={correctAndPossibleAnswersForQuestions} questionAnswerTemplates={questionAnswerTemplatesFromDB} />
		{:else if currentPageNumber == 2}
			{#key currentQuestionNumber}
				<QuestionnaireQuestionsPage
					bind:currentPageNumber
					bind:currentQuestionNumber
					bind:selectedAnswers
					allQuestions={questionsForQuestionnaireFromDBWithExtraInformation}
					correctAndPossibleAnswersForQuestions={correctAndPossibleAnswersForQuestions}
					questionAnswerTemplates={questionAnswerTemplatesFromDB}
				/>
			{/key}
		{:else if currentPageNumber == 3}
			<QuestionnaireResultsPage 
				bind:currentPageNumber
				bind:currentQuestionNumber
				bind:selectedAnswers
				bind:mentalProblemsFromDB
				allQuestions={questionsForQuestionnaireFromDBWithExtraInformation}
				correctAndPossibleAnswersForQuestions={correctAndPossibleAnswersForQuestions}
			/>
		{:else}
			<QuestionnaireStartPage correctAndPossibleAnswersForQuestions={correctAndPossibleAnswersForQuestions} questionAnswerTemplates={questionAnswerTemplatesFromDB} />
		{/if}
	{/key}

	<!-- {#each questionsForQuestionnaireFromDBWithExtraInformation as question}
			<p>{question.data.question}</p>
		{/each} -->

