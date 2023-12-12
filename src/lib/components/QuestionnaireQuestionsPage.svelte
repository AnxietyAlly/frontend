<script>
	export let currentQuestionNumber;
	export let selectedAnswers;
	export let allQuestions;
	export let correctAndPossibleAnswersForQuestions;
	export let questionAnswerTemplates;
	let questionAmount = allQuestions.length;
	console.log(questionAnswerTemplates);
	console.log(allQuestions);

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
		console.log('test');
	}
</script>

<div>
	<div>
		<h1>{allQuestions[currentQuestionNumber - 1].data.question}</h1>
		<p>More information on this topic?</p>

		{#if questionAnswerTemplates.find(element => {
			return element.data.id == allQuestions[currentQuestionNumber - 1].data.question_answer_template_id
		}).data.question_type_id == 1}
			<div class="grid grid-rows-2 gap-4">
				<ul class="grid w-full gap-6 grid-cols-2">
					{#each correctAndPossibleAnswersForQuestions.find(element => {
						return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
					}).answers as answer, i}
						<li>
							<input 
								type="radio" 
								id="{answer.answerId}"
								name="answers" 
								value="{answer.value}" 
								class="hidden peer" 
								required 
								on:click={() => selectAnswer(answer.answerId)}
							>
							<label
								for="{answer.answerId}"
								class="bg-blue-600 inline-flex items-center w-full p-2 m-2 justify-between cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
							>
								<div class="block">
									<div class="w-full">{answer.text}</div>
								</div>
							</label>
						</li>
					{/each}
					<li>
						<input 
							type="radio" 
							id="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[0].answerId}"
							name="answers" 
							value="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[0].value}" 
							class="hidden peer" 
							required 
							on:click={() => selectAnswer(correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[0].answerId)}
						>
						<label
							for="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[0].answerId}"
							class="bg-blue-600 inline-flex items-center w-full p-2 m-2 justify-between cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
						>
							<div class="block">
								<div class="w-full">{correctAndPossibleAnswersForQuestions.find(element => {
									return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
								}).answers[0].text}</div>
							</div>
						</label>
					</li>
					<li>
						<input 
							type="radio" 
							id="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[1].answerId}"
							name="answers" 
							value="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[1].value}" 
							class="hidden peer" 
							required 
							on:click={() => selectAnswer(correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[1].answerId)}
						>
						<label
							for="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[1].answerId}"
							class="bg-blue-600 inline-flex items-center w-full p-2 m-2 justify-between cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
						>
							<div class="block">
								<div class="w-full">{correctAndPossibleAnswersForQuestions.find(element => {
									return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
								}).answers[1].text}</div>
							</div>
						</label>
					</li>
					<li>
						<input 
							type="radio" 
							id="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[2].answerId}"
							name="answers" 
							value="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[2].value}" 
							class="hidden peer" 
							required 
							on:click={() => selectAnswer(correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[2].answerId)}
						>
						<label
							for="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[2].answerId}"
							class="bg-blue-600 inline-flex items-center w-full p-2 m-2 justify-between cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
						>
							<div class="block">
								<div class="w-full">{correctAndPossibleAnswersForQuestions.find(element => {
									return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
								}).answers[2].text}</div>
							</div>
						</label>
					</li>
					<li>
						<input 
							id="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[3].answerId}"
							name="answers" 
							value="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[3].value}" 
							class="hidden peer" 
							required 
							on:click={() => selectAnswer(correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[3].answerId)}
						>
						<label
							for="{correctAndPossibleAnswersForQuestions.find(element => {
								return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
							}).answers[3].answerId}"
							class="bg-blue-600 inline-flex items-center w-full p-2 m-2 justify-between cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
						>
							<div class="block">
								<div class="w-full">{correctAndPossibleAnswersForQuestions.find(element => {
									return element.questionId == allQuestions[currentQuestionNumber - 1].data.id
								}).answers[3].text}</div>
							</div>
						</label>
					</li>
				</ul>
			</div>
		{/if}
	</div>
	<div>
		{#if currentQuestionNumber > 1}
			<button class="btn bg-blue-600 order-2" on:click={() => goToPreviousQuestion()}>Previous</button>
		{/if}
		<button class="btn bg-blue-600 border-2" on:click={() => goToNextQuestion()}>Next</button>
	</div>
</div>
