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
		<h1>{allQuestions[currentQuestionNumber - 1].data.question}</h1>
		<p>More information on this topic?</p>
		<div class="grid grid-rows-2 gap-4">
			<ul class="grid w-full gap-6 grid-cols-2">
				<li>
					<input type="radio" id="answer1" name="answers" value="answer1" class="hidden peer" required>
					<label
						for="answer1"
						class="bg-green-400 inline-flex items-center justify-between cursor-pointer border peer-checked:border-red-700"
					>
						<div class="block">
							<div class="w-full">Answer 1</div>
						</div>
					</label>
				</li>
				<li>
                    <input type="radio" id="answer2" name="answers" value="answer2" class="hidden peer">
					<label
						for="answer2"
						class="bg-green-400 inline-flex items-center justify-between cursor-pointer border peer-checked:border-red-700"
					>
						<div class="block">
							<div class="w-full">Answer 2</div>
						</div>
					</label>
				</li>
				<li>
                    <input type="radio" id="answer3" name="answers" value="answer3" class="hidden peer" required>
					<label
						for="answer3"
						class="bg-green-400 inline-flex items-center justify-between cursor-pointer border peer-checked:border-red-700"
					>
						<div class="block">
							<div class="w-full">Answer 3</div>
						</div>
					</label>
				</li>
				<li>
                    <input type="radio" id="answer4" name="answers" value="answer4" class="hidden peer" required>
					<label
						for="answer4"
						class="bg-green-400 inline-flex items-center justify-between cursor-pointer border peer-checked:border-red-700"
					>
						<div class="block">
							<div class="w-full">Answer 4</div>
						</div>
					</label>
				</li>
			</ul>
		</div>
	</div>
	<div>
		{#if currentQuestionNumber > 1}
			<button on:click={() => goToPreviousQuestion()}>Previous</button>
		{/if}
		<button on:click={() => goToNextQuestion()}>Next</button>
	</div>
</div>
