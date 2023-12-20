<script>
	export let currentQuestionNumber;
	export let selectedAnswers;
	export let allQuestions;
	export let correctAndPossibleAnswersForQuestions;
	export let questionAnswerTemplates;
	let questionAmount = allQuestions.length;

	export let currentPageNumber;

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
		selectedAnswers.find((element) => {
			return element.questionId == allQuestions[currentQuestionNumber - 1].data.id;
		}).selectedAnswerValue = Number(document.getElementById(answerId).value);
	}
</script>

<div>
	<div>
		<h1 class="text-stone-600 font-bold text-xl mt-10 text-center">
			{allQuestions[currentQuestionNumber - 1].data.question}
		</h1>

		{#if questionAnswerTemplates.find((element) => {
			return element.data.id == allQuestions[currentQuestionNumber - 1].data.question_answer_template_id;
		}).data.question_type_id == 1}
			<div class="grid grid-rows-2 gap-4 mt-2">
				<ul class="grid w-full gap-6 grid-cols-2">
					{#each correctAndPossibleAnswersForQuestions.find((element) => {
						return element.questionId == allQuestions[currentQuestionNumber - 1].data.id;
					}).answers as answer, i}
						<li>
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
								for={answer.answerId}
								class="bg-red-300 inline-flex items-center w-full p-3 mr-1 justify-center text-white cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
							>
								<div class="block">
									<div class="w-full">{answer.text}</div>
								</div>
							</label>
						</li>
					{/each}
				</ul>
				<p class="text-white font-bold">More information on this topic?</p>
			</div>
		{/if}
	</div>
	<div>
		<div class="h-20 mt-4 space-y-6">
			<div class="flex justify-center">
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
