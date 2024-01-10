<script>
	import { onMount } from 'svelte';

	export let currentQuestionNumber;
	export let selectedAnswers;
	export let allQuestions;
	export let correctAndPossibleAnswersForQuestions;
	export let questionAnswerTemplates;
	let questionAmount = allQuestions.length;

	export let currentPageNumber;

	function alreadySelectedAnswer() {
		const selectedAnswer = selectedAnswers.find((element) => {
			return element.questionId == allQuestions[currentQuestionNumber - 1].data.id;
		})
		
		if (selectedAnswer.selectedAnswerId !== undefined) {
			document.getElementById(selectedAnswer.selectedAnswerId).click();
		}
	}

	function goToNextQuestion() {
		if (currentQuestionNumber < questionAmount) {
			currentQuestionNumber++;
		} else {
			currentPageNumber = 3;
		}
	}

	function goToPreviousQuestion() {
		if (currentQuestionNumber > 1) {
			currentQuestionNumber--;
		}
	}

	function selectAnswer(answerId) {
		const selectedAnswer = selectedAnswers.find((element) => {
			return element.questionId == allQuestions[currentQuestionNumber - 1].data.id;
		})

		selectedAnswer.selectedAnswerId = answerId;
		selectedAnswer.selectedAnswerValue = Number(document.getElementById(answerId).value);
	}

	onMount(async () => {
		alreadySelectedAnswer();
	});
</script>

<div>
	<div>
		<h1 class="text-stone-600 font-bold text-xl mt-10 text-center">
			{allQuestions[currentQuestionNumber - 1].data.question}
		</h1>

		{#if questionAnswerTemplates.find((element) => {
			return element.data.id == allQuestions[currentQuestionNumber - 1].data.question_answer_template_id;
		}).data.question_type_id == 1}
			<div class="grid grid-rows-2 gap-4 mt-2 lg:justify-center">
				<ul class="grid w-full gap-6 grid-cols-2 lg:w-96 lg:mt-5">
					{#each correctAndPossibleAnswersForQuestions.find((element) => {
						return element.questionId == allQuestions[currentQuestionNumber - 1].data.id;
					}).answers as answer, i}
						<li class="answer-label">
							<input
								type="radio"
								id={answer.answerId}
								name="answers"
								value={answer.value}
								class="hidden peer"
								required
								on:click={() => selectAnswer(answer.answerId)}
							/>
							<label
								id={"labelFor" + answer.answerId}
								for={answer.answerId}
								class="bg-red-300 inline-flex items-center w-full p-3 mr-1 justify-center text-white cursor-pointer border-2 rounded-lg peer-checked:border-red-700 lg:w-48 lg:h-20"
							>
								<div class="block">
									<div class="w-full">{answer.text}</div>
								</div>
							</label>
						</li>
					{/each}
				</ul>
				<details>
					<summary class="text-white font-bold">More information on this topic?</summary>
					<div class="rounded-md w-3/4 md:w-1/2 lg:w-1/4 bg-white bg-opacity-50 p-4">
						<div class="text-l text-stone-600">{allQuestions[currentQuestionNumber - 1].data.extraInformation.data.text}</div>
						{#if 
							!(allQuestions[currentQuestionNumber - 1].data.extraInformation.data.linkDescription == null || 
							allQuestions[currentQuestionNumber - 1].data.extraInformation.data.linkDescription == undefined || 
							allQuestions[currentQuestionNumber - 1].data.extraInformation.data.linkDescription == "")
						}
							<br>
							<div class="text-l text-stone-600">Link: </div><a href="{allQuestions[currentQuestionNumber - 1].data.extraInformation.data.linkHref}">{allQuestions[currentQuestionNumber - 1].data.extraInformation.data.linkDescription}</a>
						{/if}
					</div>
					
				</details>
			</div>
		{/if}
	</div>
	<div>
		<div class="h-20 mt-4 space-y-6">
			<div class="flex justify-center lg:mb-16">
				{#if currentQuestionNumber > 1}
					<button
						class="btn w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white mr-3 md:py-4 md:text-lg md:px-10"
						on:click={() => goToPreviousQuestion()}>Back</button
					>
				{/if}
				<button
					class="btn w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
					on:click={() => goToNextQuestion()}>Next</button
				>
			</div>
		</div>
	</div>
</div>
