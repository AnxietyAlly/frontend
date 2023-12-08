<script>

    export let currentPageNumber;

    function startQuestionnaire() {
        currentPageNumber = 2;
    }
</script>

<div>
	<div class="bg-blue-400 text-black rounded-lg w-20">
		Begin your journey to anxiety management and inner peace by answering questions in our
		questionnaire. Identify your anxiety, vent to our AI doctor, and connect with local
		psychologists. Take the first steps toward a calmer, more serene you
	</div>

    <button on:click={() => startQuestionnaire()}>Start quiz</button>

</div>
