<script>
	export let currentQuestionNumber;
	export let allQuestions;
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
</script>

<div>
	<div>
		<div class="flex justify-center">
			<div class="m-4 grid grid-rows-2 gap-4 w-3/4 md:w-1/2 lg:w-1/4 bg-white bg-opacity-50 p-6">
				<p class="text-l font-semibold text-stone-600">
					{allQuestions[currentQuestionNumber - 1].data.question}
				</p>
				<ul class="grid w-full gap-6 grid-cols-2">
					<li>
						<input
							type="radio"
							id="answer1"
							name="answers"
							value="answer1"
							class="hidden peer"
							required
						/>
						<label
							for="answer1"
							class="bg-red-300 inline-flex items-center w-full p-3 mr-1 justify-center text-white cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
						>
							<div class="block">
								<div class="w-full">Answer 1</div>
							</div>
						</label>
					</li>
					<li>
						<input type="radio" id="answer2" name="answers" value="answer2" class="hidden peer" />
						<label
							for="answer2"
							class="bg-red-300 inline-flex justify-center w-full p-3 mr-1 text-white cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
						>
							<div class="block">
								<div class="w-full">Answer 2</div>
							</div>
						</label>
					</li>
					<li>
						<input
							type="radio"
							id="answer3"
							name="answers"
							value="answer3"
							class="hidden peer"
							required
						/>
						<label
							for="answer3"
							class="bg-red-300 inline-flex justify-center w-full p-3 mr-1 text-white cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
						>
							<div class="block">
								<div class="w-full">Answer 3</div>
							</div>
						</label>
					</li>
					<li>
						<input
							type="radio"
							id="answer4"
							name="answers"
							value="answer4"
							class="hidden peer"
							required
						/>
						<label
							for="answer4"
							class="bg-red-300 inline-flex justify-center w-full p-3 mr-1 text-white cursor-pointer border-2 rounded-lg peer-checked:border-red-700"
						>
							<div class="block">
								<div class="w-full">Answer 4</div>
							</div>
						</label>
					</li>
				</ul>
				<div class="flex justify-center">
					<p class="text-xs">More information on this topic?</p> 
				</div>
			</div>
		</div>

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
