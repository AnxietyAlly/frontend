<script>
	import { onMount } from 'svelte';

	export let currentPageNumber;
	export let correctAndPossibleAnswersForQuestions;
	export let questionAnswerTemplates;
	let amountOfLoops = 0;

	let startBtnLabel = undefined;

	onMount(() => {
		startBtnLabel = document.getElementById('startBtnLabel');
	});

	function startQuestionnaire() {
		if (startBtnLabel !== undefined) {
			if (
				!(correctAndPossibleAnswersForQuestions.length == 0) &&
				!(questionAnswerTemplates.length == 0)
			) {
				currentPageNumber = 2;
			} else if (amountOfLoops <= 400) {
				startBtnLabel.innerHTML = 'Loading...';
				startBtnLabel.classList = '';
				amountOfLoops += 1;
				setTimeout(() => {
					startQuestionnaire();
				}, 50);
			} else {
				startBtnLabel.innerHTML =
					'Loading failed, the server took too long to respond. Try reloading the page and waiting for 10 seconds before clicking the button';
				startBtnLabel.classList = 'bg-red-500';
			}
		}
	}
</script>

<div class="h-20 mt-4 space-y-6">
	<div class="flex justify-center">
		<div class="rounded-md w-3/4 md:w-1/2 lg:w-1/4 bg-white bg-opacity-50 p-4">
			<p class="text-l text-center text-stone-600 italic">
				This quiz does not serve as a diagnostic tool. Only qualified mental health professionals
				can diagnose mental health disorders. AnxietyAlly acknowledges that a quiz can represent an
				important initial step towards receiving treatment.
			</p>
		</div>
	</div>
</div>

<div class="h-30 mt-32 space-y-6">
    <div class="flex justify-center mt-48">
        <label for="startBtn" class="hidden" id="startBtnLabel"></label>
        <button
            name="startBtn"
            class="btn w-40 h-12 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
            on:click={() => startQuestionnaire()}
        >
            Start quiz
        </button>
    </div>
</div>
<!-- <button class="btn bg-blue-600 border-2" on:click={() => startQuestionnaire()}>Start quiz</button> -->
