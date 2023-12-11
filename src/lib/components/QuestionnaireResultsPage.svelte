<script>
	// export let questionAnswers;
    export let currentPageNumber;
    export let currentQuestionNumber;


    function restartQuestionnaire() {
        currentPageNumber = 1;
        currentQuestionNumber = 1;
    }
</script>

<div>
    <div>
        <h1>Results</h1>
        <p>It seems like you might have anxiety, and that's okay! It's 60% likely that you have anxiety</p>  
        <!-- {getScore()} -->
    </div>
    <div>
        <button>Show your answers</button>
    </div>
	<div class="hidden">
		<button>Hide</button>
		<ul>Questions</ul>
		<ul>Answers you gave</ul>
	</div>
    <div>
        <button class="btn bg-blue-600 border-2" on:click={() => restartQuestionnaire()}>Restart questionnaire</button>
        <a class="btn bg-blue-600 border-2" href="/dashboard">Continue</a>

    </div>
	
</div>
