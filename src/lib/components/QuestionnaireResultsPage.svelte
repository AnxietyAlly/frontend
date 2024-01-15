<script>
	import { onMount } from 'svelte';

	// export let questionAnswers;
	export let currentPageNumber;
	export let currentQuestionNumber;
	export let selectedAnswers;
	export let mentalProblemsFromDB;
	export let allQuestions;
	export let correctAndPossibleAnswersForQuestions;

	let mentalProblems = [];

	//[
	//	 {
	//		mentalProblemId: 1
	//		name: test1
	//		numberOfCorrectAnswers: 2			// 0 at the beginning
	//		totalNumberOfPossibleQuestions: 6   // 0 at the beginning
	//	 }
	//	 {
	//		mentalProblemId: 2
	//		name: test2
	//		numberOfCorrectAnswers: 4			// 0 at the beginning
	//		totalNumberOfPossibleQuestions: 5	// 0 at the beginning
	//	 }
	//   {
	//		mentalProblemId: 3
	//		name: test3
	//		numberOfCorrectAnswers: 0			// 0 at the beginning
	//		totalNumberOfPossibleQuestions: 0	// 0 at the beginning
	//	 }
	//]

	function restartQuestionnaire() {
		currentPageNumber = 1;
		currentQuestionNumber = 1;
	}

	onMount(async () => {
		mentalProblemsFromDB.forEach(mentalProblem => {
			mentalProblems.push({
				mentalProblemId: mentalProblem.data.id,
				name: mentalProblem.data.name,
				numberOfCorrectAnswers: 0,
				totalNumberOfPossibleQuestions: 0
			});
		});

		correctAndPossibleAnswersForQuestions.forEach(correctAndPossibleAnswersForQuestion => {
			let questionId = correctAndPossibleAnswersForQuestion.questionId;
			let selectedAnswer = selectedAnswers.find((answer) => {
				return answer.questionId == questionId
			});
			correctAndPossibleAnswersForQuestion.mentalProblems.forEach(correctAnswer => {
				let mentalProblem = mentalProblems.find((element) => {
					return element.mentalProblemId == correctAnswer.mentalProblemId
				});

				mentalProblem.totalNumberOfPossibleQuestions += 1;

				const correctAnswerValues = correctAnswer.values.split("|");
				for (let i = 0; i < correctAnswerValues.length; i++) {
					correctAnswerValues[i] = Number(correctAnswerValues[i]);
				}

				const correctAnswerRanges = correctAnswer.ranges.split("|");
				for (let i = 0; i < correctAnswerRanges.length; i++) {
					const splitRange = correctAnswerRanges[i].split(",");
					correctAnswerRanges[i] = splitRange;
				}
				correctAnswerRanges.forEach(splitRange => {
					splitRange[0] = Number(splitRange[0]);
					splitRange[1] = Number(splitRange[1]);
				});

				const possibleCorrectAnswers = [];
				for (let i = 0; i < correctAnswerValues.length; i++) {
					for (let j = correctAnswerRanges[i][0]; j > 0; j--) {
						possibleCorrectAnswers.push(correctAnswerValues[i] - j);
					}
					for (let j = 0; j <= correctAnswerRanges[i][1]; j++) {
						possibleCorrectAnswers.push(correctAnswerValues[i] + j);
					}
				}

				if (possibleCorrectAnswers.includes(selectedAnswer.selectedAnswerValue)) {
					mentalProblem.numberOfCorrectAnswers += 1;
				}
			});
		});
		mentalProblems.forEach(mentalProblem => {
			if (mentalProblem.totalNumberOfPossibleQuestions > 0) {
				const paragraph = document.createElement("p");
				paragraph.innerHTML = `${mentalProblem.name}: ${mentalProblem.numberOfCorrectAnswers}/${mentalProblem.totalNumberOfPossibleQuestions} answers you gave suggest you have this`;
				document.getElementById("results").append(paragraph);
			}
		});

		document.getElementById("showAnswersBtn").addEventListener("click", () => {
			document.getElementById("questionsAndAnswers").classList.remove("hidden");
			document.getElementById("questionsAndAnswers").classList.add("grid");
			document.getElementById("answerBtnsDiv").classList.remove("lg:mb-7");
			document.getElementById("hideAnswersBtn").classList.remove("hidden");
			document.getElementById("showAnswersBtn").classList.add("hidden");
		});
		document.getElementById("hideAnswersBtn").addEventListener("click", () => {
			document.getElementById("questionsAndAnswers").classList.add("hidden");
			document.getElementById("questionsAndAnswers").classList.remove("grid");
			document.getElementById("answerBtnsDiv").classList.add("lg:mb-7");
			document.getElementById("hideAnswersBtn").classList.add("hidden");
			document.getElementById("showAnswersBtn").classList.remove("hidden");
		});
		console.log(correctAndPossibleAnswersForQuestions);
		console.log(selectedAnswers);

		let allQuestionElements = [];
		allQuestions.forEach(question => {
			const questionElement = document.createElement("p");
			questionElement.innerHTML = `${question.data.question}`;
			allQuestionElements.push(questionElement);
			// document.getElementById("questionsAndAnswers").append(questionElement);
		});

		let allSelectedAnswerElements = [];
		selectedAnswers.forEach(answer => {
			let question = correctAndPossibleAnswersForQuestions.find((element) => {
				return element.questionId == answer.questionId;
			});

			let selectedAnswer = question.answers.find((element) => {
				return element.answerId == answer.selectedAnswerId;
			});

			const selectedAnswerElement = document.createElement("p");
			selectedAnswerElement.innerHTML = `${selectedAnswer.text}`;
			allSelectedAnswerElements.push(selectedAnswerElement);
			// document.getElementById("questionsAndAnswers").append(selectedAnswerElement);
		});

		let amountOfQuestionsPosted = 0;
		let postQuestion = true;
		for (let i = 0; i < allQuestionElements.length + allSelectedAnswerElements.length; i++) {
			if (postQuestion) {
				document.getElementById("questionsAndAnswers").append(allQuestionElements[i - amountOfQuestionsPosted]);
				postQuestion = false;
				amountOfQuestionsPosted += 1;
			} else {
				document.getElementById("questionsAndAnswers").append(allSelectedAnswerElements[i - amountOfQuestionsPosted]);
				postQuestion = true;
			}
		}
	});
</script>

<div class="h-10 mt-2 flex justify-center">
	<h1 class="text-3xl font-bold text-red-400 text-opacity-90">Quiz complete</h1>
</div>

<div>
	<div class="flex justify-center">
		<div
			id="results"
			class="rounded-md m-4 grid grid-rows-1 gap-4 w-3/4 md:w-1/2 lg:w-1/2 bg-white bg-opacity-50 p-6"
		>
			<h1 class="text-2xl font-semibold text-stone-600">Results</h1>
			<!-- {getScore()} -->
		</div>
	</div>
	<div id="answerBtnsDiv" class="flex justify-center lg:mb-7">
		<button id="showAnswersBtn">Show your answers</button>
		<button id="hideAnswersBtn" class="hidden">Hide your answers</button>
	</div>
	<div class="flex justify-center lg:mb-7">
		<div id="questionsAndAnswers" class="hidden rounded-md m-4 grid-rows-1 grid-cols-2 gap-4 w-3/4 md:w-1/2 lg:w-1/2 bg-white bg-opacity-50 p-6">
			<h1 class="text-2xl font-semibold text-stone-600 h-1/4">Questions</h1>
			<h1 class="text-2xl font-semibold text-stone-600 h-1/4">Answers you gave</h1>
		</div>
	</div>
	<div>
		<div class="h-20 mt-4 space-y-6">
			<div class="flex justify-center">
				<button
					class="btn w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-3xl mr-3 shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
					on:click={() => restartQuestionnaire()}>Restart</button
				>
				<a
					class="btn w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
					href="/dashboard">Continue</a
				>
			</div>
		</div>
	</div>
</div>
