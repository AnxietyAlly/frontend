<script>
	// export let questionAnswers;
	export let currentPageNumber;
	export let currentQuestionNumber;

	function restartQuestionnaire() {
		currentPageNumber = 1;
		currentQuestionNumber = 1;
	}
</script>

<div class="h-10 mt-2 flex justify-center">
	<h1 class="text-3xl font-bold text-red-400 text-opacity-90">Quiz complete</h1>
</div>

<div>
	<div class="flex justify-center">
		<div
			class="rounded-md m-4 grid grid-rows-2 gap-4 w-3/4 md:w-1/2 lg:w-1/4 bg-white bg-opacity-50 p-6"
		>
			<h1 class="text-2xl font-semibold text-stone-600">Results</h1>
			<p>
				It seems like you might have anxiety, and that's okay! It's 60% likely that you have
				anxiety.
			</p>
			<!-- {getScore()} -->
		</div>
	</div>
	<div class="flex justify-center lg:mb-7">
		<button>Show your answers</button>
	</div>
	<div class="hidden">
		<button>Hide</button>
		<ul>Questions</ul>
		<ul>Answers you gave</ul>
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
